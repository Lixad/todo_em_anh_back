const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoDB = process.env.MONGO_DB_CONNECT;
mongoose.connect(mongoDB, {useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
