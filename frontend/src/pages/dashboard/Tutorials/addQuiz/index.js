import React, { Component } from 'react';
import AddQuiz from './addQuiz';
import QuizzesList from '../QuizList/QuizList';

class Quiz extends Component {
    state = { visible: false }

    showAddQuiz = () => {
        this.setState({
            visible: true
        });
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Quizzes <b>List</b></h2></div>
                        <div className="col-sm-4 text-right">
                            <button type="button" onClick={this.showAddQuiz} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                        </div>
                    </div>
                    {this.state.visible ? <AddQuiz section={this.props} /> : null}
                </div>
                <QuizzesList section={this.props} />
            </div>
        );
    }
}

export default Quiz;