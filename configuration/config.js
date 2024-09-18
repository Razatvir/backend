
import dotenv from 'dotenv'
dotenv.config();

function isDevelopment() {
    if (process.env.ENVIRONMENT == 'dev') return true
    else return false;
}

function isProduction() {
    if (process.env.ENVIRONMENT == 'prod') return true
    else return false;
}

function getMongoConfiguration() {
    return process.env.MONGO_URI;
}


export { isDevelopment, isProduction, getMongoConfiguration }
