import React from 'react';

function AnswerOption(props) {
console.log(props)
  return (
    <li className="answerOption">
      <button
        type="button"
        id={props.answerType}
        value={props.answerContent}
        className={(props.selectedAnswer === props.answerContent) ? 'selected-btn' : '' }
        onClick={props.onAnswerSelected}
      >{props.answerContent}</button>
    </li>
  );

}

export default AnswerOption;
