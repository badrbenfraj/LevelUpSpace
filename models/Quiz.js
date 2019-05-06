
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quiz = new Schema({
    QuizQuestion: {
        type: String,
        required: true
    },
    SectionID: {
        type: String,
        required: true
    },
    QuizName: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Quizzes', Quiz)