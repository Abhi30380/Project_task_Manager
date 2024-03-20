const mongoose = require('mongoose')

//The connectDB function you provided is a utility function for connecting to a MongoDB database using Mongoose. 
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB