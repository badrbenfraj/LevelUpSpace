
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quiz = new Schema({
    QuizQuestion: {
        type: String,
        required: true
    },
    LectureID: {
        type: String,
        required: true
    },
    QuizName: {
        type: String,
        required: true
    },
    answers: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Quizzes', Quiz)