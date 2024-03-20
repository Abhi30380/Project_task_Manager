const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware

app.use(express.static('./public'));   //allows to use static files like html css directly without routing them separately
app.use(express.json());  // allows express to automatically parse json data sent in req body and make it availaible in req.body

// routes

app.use('/api/v1/tasks', tasks);   //is setting up a route for handling requests related to tasks.

app.use(notFound);   //tells Express to use the notFound middleware for handling 404 Not Found errors
app.use(errorHandlerMiddleware);   //middleware for error handling
const port = 5100;



// function database start krne ke liye
const start = async () => {
  try {
    await connectDB("mongodb://0.0.0.0:27017");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();