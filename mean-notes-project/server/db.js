const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/MeanNotes', (err) => {
  if(!err)
    console.log('MongoDB connection success.');
  else
    console.log('Error in db connection '+ JSON.stringify(err, undefined, 2));
})

module.exports = mongoose;