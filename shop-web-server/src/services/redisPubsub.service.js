const Redis = require('redis');

class RedisPubSubService {
    constructor() {
        this.subscriber = Redis.createClient();
        this.publisher = Redis.createClient();
    }

    publish(channel, message) {
        return new Promise((resolve, reject) => {
            this.publisher.publish(channel, message, (error, reply) => {
                if (error) {
                    reject(error);
                }

                resolve(reply);
            });
        });
    }

    subscribe(channel, callback) {
        this.subscriber.subscribe(channel);
        this.subscriber.on('message', (subChannel, message) => {
            if (channel === subChannel) {
                callback(message);
            }
        });
    }
}

module.exports = new RedisPubSubService();