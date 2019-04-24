import React, { Component } from 'react';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import { ADD_LECTURE } from '../../../../queries';
import { message } from 'antd';

const initialState = {
    name: '',
    description: '',
    error: ''
}

class AddLecture extends Component {
    state = {
        ...initialState,
        ID: this.props.lecture.section.id
    }


    clearState() {
        this.setState({ ...initialState })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event, addLecture) {
        event.preventDefault();
        addLecture().then(async ({ data }) => {
            message.success('Lecture added successfuly')
            this.clearState();

        }).catch(error => {
            this.setState({
                error: "couldn't add lecture"
            })
        });

    }

    render() {
        const { name, description, ID } = this.state;
        console.log(this.props.lecture.section.id)
        return (
            <div className="text-center border border-light p-5">
                <p className="h4 mb-4">Add New Lecture</p>
                {this.props.lecture.section.id}
                {/* <!--Card content--> */}
                <div className="card-body px-lg-5 pt-0">
                    <Mutation
                        mutation={ADD_LECTURE}
                        variables={{ name, description, ID }}
                    >
                        {(addLecture) => {
                            return (
                                <form className="text-center" onSubmit={event => this.handleSubmit(event, addLecture)}>
                                    <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                        {this.state.error}
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Lecture name"
                                                value={name}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                rows="4"
                                                cols="50"
                                                placeholder="Short description"
                                                value={description}
                                                onChange={this.handleChange.bind(this)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                        type="submit"
                                    >
                                        Add Lecture
                                    </button>
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </div>
        );
    }
}

export default AddLecture;