const dev = {
    app: {
        port: process.env.DEV_APP_PORT
    },
    db: {
        mongodb: {
            host: process.env.DEV_DB_HOST,
            name: process.env.DEV_DB_NAME,
        }
    }
}

const prod = {
    app: {
        port: process.env.PROD_APP_PORT
    },
    db: {
        mongodb: {
            host: process.env.PROD_DB_HOST,
            name: process.env.PROD_DB_NAME
        }
    }
}

const config = { dev, prod }
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]