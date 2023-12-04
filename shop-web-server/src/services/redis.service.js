const redis = require('redis');
const { promisify } = require('util');
const { reservationInventory } = require('../models/repository/inventory.repo');
const redisClient = redis.createClient()

// const pexpire = promisify(redisClient.pexpire).bind(redisClient);
// const setnxAsync = promisify(redisClient.setnx).bind(redisClient);

const acquireLock = async (productId, quantity, cartId) => {
    const key = `lock_v2023_${productId}`;
    const retryTimes = 10;
    const expireTime = 3000;

    for (let i = 0; i < retryTimes; i++) {
        const result = await setnxAsync(key, expireTime);
        console.log(`result: `, result)
        if (result === 1) {
            const isReseversation = await reservationInventory({
                productId,
                quantity,
                cartId
            });

            if (isReseversation.modifiedCount) {
                await pexpire(key, expireTime);
                return key;
            }

            return null;
        } else {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}

const releaseLock = async keyLock => {
    const delAsync = promisify(redisClient.del).bind(redisClient);
    return await delAsync(keyLock);
}

module.exports = {
    acquireLock,
    releaseLock
}