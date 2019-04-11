import React from 'react';
import { message } from 'antd';
import { Mutation } from 'react-apollo';
import { ADD_CLAIM } from '../../../queries';

class Claims extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      firstName: this.props.session.getCurrentUser.firstName,
      lastName: this.props.session.getCurrentUser.lastName,
      email: this.props.session.getCurrentUser.email,
      subject: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  ClearState() {
    this.setState({
      subject: '',
      description: ''
    })
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event, AddClaim) {
    
    event.preventDefault();
    AddClaim().then(async () => {
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
        {(AddClaim) => {
          return (
            <form onSubmit={event => this.handleSubmit(event, AddClaim)}>
              <label>
                Fisrt name:
                    <input type="text" name="firstName" value={firstName} onChange={this.handleChange} disabled />
              </label><br />
              <label>
                Last name:
                    <input type="text" name="lastName" value={lastName} onChange={this.handleChange} disabled />
              </label><br />
              <label>
                Email:
                    <input type="text" name="email" value={email} onChange={this.handleChange} disabled />
              </label><br />
              <label>
                Subject:
                    <input type="text" name="subject" value={subject} onChange={this.handleChange} />
              </label><br />
              <label>
                Description:
                    <input type="text" name="description" value={description} onChange={this.handleChange} />
              </label><br />
              
              <button type="submit" >send</button>
              
            </form>
          )
        }}

      </Mutation>


    );
  }
}
export default Claims;