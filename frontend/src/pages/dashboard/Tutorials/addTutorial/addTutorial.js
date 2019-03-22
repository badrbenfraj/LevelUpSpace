import React, { Component } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { message } from 'antd';
import { ADD_TUTORIAL, GET_CURRENT_USER } from '../../../../queries';
import { Mutation, Query } from 'react-apollo'

const initialState = {
    name: '',
    description: '',
    userName: '',
    error: ''
}



class AddTutorial extends Component {

    state = {
        ...initialState
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

    handleSubmit(event, addTutorial) {
        event.preventDefault();
        addTutorial().then(async ({ data }) => {
            message.success('Section added successfuly')
            this.clearState();

        }).catch(error => {
            this.setState({
                error: "couldn't add tutorial"
            })
        });

    }

    validateForm() {
        const { name, description, userName } = this.state;
        const isInvalid = !name || !description || userName;
        return isInvalid;
    }

    head() {
        return (
            <Helmet bodyAttributes={{ class: "addMentor" }}>
                <title>Add Tutorial - Level Up Space</title>
            </Helmet>
        );
    }



    render() {
        const { name, description } = this.state;

        return (
            <div className="text-center border border-light p-5">

                <p className="h4 mb-4">Add New Tutorial</p>

                {/* <!--Card content--> */}
                <div className="card-body px-lg-5 pt-0">
                    <Query query={GET_CURRENT_USER}>
                        {({ data }) => {
                            const userName = data.getCurrentUser.userName;
                            return (


                                <Mutation
                                    mutation={ADD_TUTORIAL}
                                    variables={{ name, description, userName }}
                                >

                                    {(addTutorial, { data, loading, error }) => {

                                        return (
                                            < form className="text-center" onSubmit={event => this.handleSubmit(event, addTutorial)}>
                                                <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                                    {this.state.error}
                                                </div>
                                                <div className="form-row mb-4">
                                                    <div className="col">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            placeholder="Tutorial name"
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

                                                <input hidden="hidden" name="userName" value={userName} readOnly />
                                                {userName}
                                                <button
                                                    className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                                    type="submit">
                                                    Add Tutorial
                                                </button>
                                            </form>
                                        );

                                    }}
                                </Mutation>
                            )
                        }}
                    </Query>
                </div>

            </div>
        )
    }
};

export default AddTutorial;