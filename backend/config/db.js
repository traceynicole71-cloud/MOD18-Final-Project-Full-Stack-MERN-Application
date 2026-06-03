const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI);
		console.log(`[DATABASE]: MongoDB connected - ${connection.connection.host}`);
	} catch (error) {
		console.error(`[DATABASE ERROR]: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
