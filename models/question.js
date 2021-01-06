const Joi = require('joi');
const mongoose = require('mongoose');

const Question = mongoose.model('Questions', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  option1: {
    type: String,
    required: true,
    trim: true, 
    minlength: 1,
    maxlength: 255
  },
  option2: {
    type: String,
    required: true,
    trim: true, 
    minlength: 1,
    maxlength: 255
  },
  option3: {
    type: String,
    required: true,
    trim: true, 
    minlength: 1,
    maxlength: 255
  },
  
}));

function validateQuestion(question) {
  const schema = {
    title: Joi.string().min(5).max(2000).required(),
    option1: Joi.string().min(1).max(2000).required(),
    option2: Joi.string().min(1).max(2000).required(),
    option3: Joi.string().min(1).max(2000).required(),

  };

  return Joi.validate(question, schema);
}

exports.Question = Question; 
exports.validate = validateQuestion;