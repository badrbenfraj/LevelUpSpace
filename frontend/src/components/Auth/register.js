import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries/index'

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
};

class Register extends Component {
    state = {
        ...initialState
    };

    clearState = ()=>{
        this.setState({...initialState});
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(data=>{
            console.log(data);
            this.clearState();
        });
    }

    validateForm = () => {
        const { username, email, password, passwordConfirmation } = this.state;
        const isInvalid = !username || !email || !password || !passwordConfirmation || password !== passwordConfirmation;
        return isInvalid;
    }

    render() {
        const { username, email, password, passwordConfirmation } = this.state;
        return (
            <div>
                <div className="breadcrumbs">
                    <div className="container">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Register
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <div className="login-form">
                    <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
                        {(signupUser, { data, loading, error }) => {
                            return (
                                <form onSubmit={event => this.handleSubmit(event, signupUser)}>
                                    <h2 className="text-center">Register</h2>
                                    <div className="form-group">
                                        <input type="text" className="form-control" onChange={this.handleChange} value={username} name="username" placeholder="Full Name" required="required" />
                                    </div>
                                    {/* <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <input type="text" className="form-control" placeholder="First Name" required="required" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input type="text" className="form-control" placeholder="Last Name" required="required" />
                                        </div>
                                    </div> */}
                                    <div className="form-group">
                                        <input type="email" className="form-control" onChange={this.handleChange} value={email} name="email" placeholder="Email" required="required" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <input type="password" className="form-control" onChange={this.handleChange} value={password} name="password" placeholder="Password" required="required" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input type="password" className="form-control" onChange={this.handleChange} value={passwordConfirmation} name="passwordConfirmation" placeholder="Confirm password" required="required" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button disabled={loading || this.validateForm()} type="submit" className="btn btn-block">Register</button>
                                    </div>
                                    {error && <p className="text-center pt-4 font-weight-bold">{error.message}</p>}
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </div>
        );
    }
}

export default Register;