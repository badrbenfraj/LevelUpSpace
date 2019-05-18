import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import withAuth from '../../../../HOC/withAuth';
import { EDIT_QUIZ } from '../../../../queries';
import {
    Layout, Menu, Icon,
} from 'antd';


const { Content, Sider } = Layout;

class EditQuiz extends Component {
    state = {
        id: this.props.match.params.id,
        QuizQuestion: this.props.location.state.QuizQuestion,
        QuizName: this.props.location.state.QuizName,
        option1: this.props.location.state.option1,
        option2: this.props.location.state.option2,
        option3: this.props.location.state.option3,
        correctAnswer: this.props.location.state.correctAnswer,
        collapsed: false,
        current: 'EditQuiz',
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    handleChange(event) {
        const QuizName = event.target.QuizName;
        const value = event.target.value;
        this.setState({
            [QuizName]: value
        });
    }

    handleSubmit(event, EDIT_QUIZ) {
        event.preventDefault();
        EDIT_QUIZ(this.state.id).then(async ({ data }) => {
            message.success("update was sucess");
            console.log(data)
        }).catch(error => {
            this.setState({
                error: "couldn't update tutorial"
            })
        });
    }

    layoutContent = () => {
        if (this.state.current === "EditQuiz") {
            const QuizName = this.props.location.state.lectureName.QuizName
            return (
                <Content style={{ padding: '20px 50px', minHeight: 280 }}>
                    <h2 className="text-center">Edit {QuizName} Section</h2>
                    <Mutation
                        mutation={EDIT_QUIZ}
                        variables={{ _id: this.state.id, newQuizQuestion: this.state.QuizQuestion, newOption1: this.state.option1, newQuizName: this.state.QuizName, newOption2: this.state.option2, newOption3: this.state.option3, newCorrectAnswer: this.state.correctAnswer}}
                        pollInterval={500}
                    >
                        {(EDIT_QUIZ) => {
                            return (
                                <form className="text-center mt-5" onSubmit={event => this.handleSubmit(event, EDIT_QUIZ)}>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Quiz name"
                                                value={this.state.QuizName}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="Question"
                                                rows="10"
                                                cols="50"
                                                placeholder="Questions"
                                                value={this.state.newQuizQuestion}
                                                onChange={this.handleChange.bind(this)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="Option1"
                                                rows="10"
                                                cols="50"
                                                placeholder="Option 1"
                                                value={this.state.option1}
                                                onChange={this.handleChange.bind(this)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="Option2"
                                                rows="10"
                                                cols="50"
                                                placeholder="Option 2"
                                                value={this.state.option2}
                                                onChange={this.handleChange.bind(this)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="Option3"
                                                rows="10"
                                                cols="50"
                                                placeholder="Option 3"
                                                value={this.state.option3}
                                                onChange={this.handleChange.bind(this)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="Answer"
                                                rows="10"
                                                cols="50"
                                                placeholder="Correct Answer"
                                                value={this.state.correctAnswer}
                                                onChange={this.handleChange.bind(this)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                        type="submit">
                                        Save Changes</button>
                                </form>
                            )
                        }}
                    </Mutation>
                </Content>
            )
        }
    }

    render() {
        console.log(this.props)
        console.log(this.props.location.state.lectureName.name)
        console.log(this.state.name)
        console.log(this.state.description)
        return (

            <Layout>
                <Content>
                    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                selectedKeys={[this.state.current]}
                                onClick={this.handleClick}
                                style={{ height: '100%' }}
                            >
                                <Menu.Item key="EditLecture">
                                    <Icon type="plus" />
                                    <span>Edit Lecture</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        {this.layoutContent()}
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(EditQuiz));