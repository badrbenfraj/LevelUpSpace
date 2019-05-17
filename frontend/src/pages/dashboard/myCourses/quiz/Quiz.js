import React from 'react';
import Question from './Question';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';

function Quiz(props) {

  function renderAnswerOptions(key, index) {
    console.log(key)
    return (
      <AnswerOption
        index={index}
        key={index}
        answerContent={key}
        answer={props.answer}
        questionId={props.questionId}
        selectedAnswer={props.selectedAnswer}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  console.log(props)
  return (
    <div key={props.questionId} className="quiz-story">
      <QuestionCount
        counter={props.counter}
        viewreults={props.viewreults}
        total={props.questionTotal}
        selectedAnswer={props.selectedAnswer}
      />
      <Question content={props.question} />
      <ul className="answerOptions">
        {props.answerOptions.map(renderAnswerOptions)}
      </ul>
      <div className="bottom-footer" >
        {props.counter > 0 ? (<button className="Previous-btn" onClick={props.setPreviousQuestion} >Previous</button>) : (<div></div>)}

        {props.counter < props.questionTotal - 1 && props.selectedAnswer ? (<button className="next-btn" onClick={props.setNextQuestion} >Next</button>) : (<div></div>)}

      </div>
    </div>
  );
}


export default Quiz;
