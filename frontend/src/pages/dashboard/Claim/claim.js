import React from 'react';
import { message } from 'antd';
import { Mutation } from 'react-apollo';
import { ADD_CLAIM } from '../../../queries';

class Claims extends React.Component {
  state = {
    value: '',
    firstName: this.props.session.getCurrentUser.firstName,
    lastName: this.props.session.getCurrentUser.lastName,
    email: this.props.session.getCurrentUser.email,
    subject: '',
    description: ''
  }

  clearState() {
    this.setState({
      subject: '',
      description: ''
    })
  }
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event, addClaim) {
    event.preventDefault();
    addClaim().then(async () => {
      this.clearState();
      message.success(`Your claim was send`);
    })
  }

  render() {
    const { firstName, lastName, email, subject, description } = this.state
    console.log(this.props.session.getCurrentUser.firstName)

    return (
      <Mutation
        mutation={ADD_CLAIM}
        variables={{ firstName, lastName, email, subject, description }} >
        {(addClaim) => {
          return (
            <form onSubmit={event => this.handleSubmit(event, addClaim)}>
              <input type="hidden" name="firstName" value={firstName} onChange={this.handleChange} disabled />
              <input type="hidden" name="lastName" value={lastName} onChange={this.handleChange} disabled />
              <input type="hidden" name="email" value={email} onChange={this.handleChange} disabled />
              <label>
                Subject:
                    <input type="text" name="subject" value={subject} onChange={this.handleChange} />
              </label><br />
              <label>
                Description:
                    <input type="text" name="description" value={description} onChange={this.handleChange} />
              </label><br />
              <button type="submit">send</button>
            </form>
          )
        }}
      </Mutation>


    );
  }
}
export default Claims;