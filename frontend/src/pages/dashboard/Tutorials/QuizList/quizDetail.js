import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { DELETE_QUIZ } from '../../../../queries';

class QuizDetail extends Component {
    render() {
        const { _id, QuizName, QuizQuestion, option1, option2, option3, correctAnswer  } = this.props.quiz;
        const handleDelete = deleteQuiz => {
            const confirmDelete = window.confirm(
                _id.toString()
            );
            if (confirmDelete) {
                deleteQuiz(_id.toString()).then(({ data }) => {
                    console.log(_id.toString());
                    message.success(`Quiz ${QuizName} was deleted`);
                });
            }
        };
        return (
            <tr>
                <td>{QuizName}</td>
                <td>{QuizQuestion}</td>
                <Mutation
                    mutation={DELETE_QUIZ}
                    variables={{_id}}
                >
                    {(deleteQuiz, attrs)=>{
                        return (
                            <td>
                                <Link className="editBtn" to={{
                                    pathname: `/edit-quiz/${_id}/`,
                                    state: {
                                        QuizName,
                                        QuizQuestion,
                                        option1, 
                                        option2, 
                                        option3, 
                                        correctAnswer 
                                    }
                                }}><i className="fas fa-edit" />Edit</Link>
                                <span>|</span>
                                {attrs.loading ? "deleting..." : <i className="fas fa-trash-alt" onClick={() => handleDelete(deleteQuiz)} > Delete </i>}
                            </td>
                        )
                    }}
                </Mutation>
            </tr>
        );
    }
}

export default QuizDetail;