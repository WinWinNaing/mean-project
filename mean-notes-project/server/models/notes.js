const mongoose = require('mongoose');

var Notes = mongoose.model('Notes',{
  title: {type: String},
  body: {type: String}
})

module.exports = { Notes };