const mongoose = require('mongoose');
const config = require('config');
const database = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MONGODB CONNECTED...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;