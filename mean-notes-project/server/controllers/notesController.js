const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Notes } = require('../models/notes');

// localhost:3000/notes
router.get('/', (req,res)=>{
  console.log('call get');
  Notes.find((error, docs)=>{
    if (!error) { res.send(docs); }
    else { console.log('Error in Retrieving Notes '+ JSON.stringify(error, undefined, 2)); }
  })
})

router.get('/:id', (req,res)=>{
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  Notes.findById(req.params.id, (error, docs)=>{
    if (!error) { res.send(docs); }
    else { console.log('Error in Retrieving Notes by Id '+ JSON.stringify(error, undefined, 2)); }
  })
})

router.post('/', (req,res)=>{
  var note = new Notes({
    title: req.body.title,
    body: req.body.body
  })
  note.save((error, doc)=>{
    if (!error) { res.send(doc); }
    else { console.log('Error in Saving Notes '+ JSON.stringify(error, undefined, 2)); }
  })
})

router.put('/:id', (req,res)=>{
  console.log('call put ', req.params.id);
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  var note = {
    title: req.body.title,
    body: req.body.body
  }

  console.log('from server',note);

  Notes.findByIdAndUpdate(req.params.id, { $set: note }, { new: true }, (error, docs)=>{
    console.log(error);
    console.log(docs);
    if (!error) { res.send(docs); }
    else { console.log('Error in Updating Notes by Id '+ JSON.stringify(error, undefined, 2)); }
  })
})

router.delete('/:id', (req,res)=>{
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  Notes.findByIdAndRemove(req.params.id, (error, docs)=>{
    if (!error) { res.send(docs); }
    else { console.log('Error in Removing Notes by Id '+ JSON.stringify(error, undefined, 2)); }
  })
})

module.exports = router;