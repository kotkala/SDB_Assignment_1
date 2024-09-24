const mongoose = require('mongoose');
const Question = require('./question');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

quizSchema.methods.addQuestion = async function(questionData) {
  const question = new Question(questionData);
  await question.save();
  this.questions.push(question._id);
  await this.save();
  return question;
};

quizSchema.methods.addQuestions = async function(questionsData) {
  const questions = await Promise.all(questionsData.map(async (data) => {
    const question = new Question(data);
    await question.save();
    this.questions.push(question._id);
    return question;
  }));
  await this.save();
  return questions;
};

module.exports = mongoose.model('Quiz', quizSchema);