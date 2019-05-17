import React from 'react';

class Result extends React.Component {
  renderQuestins() {
    return this.props.quizResult.map((_data, index) => {
      console.log(_data.correctAnswer)
      return (
        <div key={index} className="list-grp">{_data.question} <br />
          correct answer is: {this.props.quizResult[index].correctAnswer}, you have selcted {this.props.answers[index]} 
          {((this.props.answers[index] ) === _data.correctAnswer) ? (<span className="status"> Correct Answer!</span>) : (<span className="Wrongstatus"> Wrong Answer!</span>)}
        </div>)
    })
  }
  render() {
    console.log(this.props)
    return (
      <div className="quiz-story">
        <div>
          <strong>Lets see your results</strong>!
        <div>{this.renderQuestins()}</div>
        </div>
      </div>
    )
  }
}

export default Result;
