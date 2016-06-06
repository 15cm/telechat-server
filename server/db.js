import mongoose from 'mongoose'
export default function(callback) {
	// connect to a database if needed
    mongoose.connect("mongodb://localhost/telechat")
	callback();
}
export { mongoose }
