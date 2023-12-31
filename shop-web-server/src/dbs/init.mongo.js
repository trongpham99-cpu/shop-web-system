const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check.connect')
const { db: { mongodb: { host, name } } } = require('../configs/config.mongodb')

const CONNECTION_STRING = `mongodb+srv://admin:admin@clusterductrong.9p6xigl.mongodb.net/shop-app`
console.log(CONNECTION_STRING)

class Database {
    constructor() {
        this.connect()
    }

    //connect
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug')
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(CONNECTION_STRING, {
            maxPoolSize: 50
        }).then(_ => {
            // countConnect()
            console.log(`Connected Mongodb\n${CONNECTION_STRING}`)
        })
            .catch(err => console.log(`Error connect!`))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb