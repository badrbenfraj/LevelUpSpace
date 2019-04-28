import React, { Component } from 'react';
import io from 'socket.io-client'
import { Mutation, Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import withAuth from '../../HOC/withAuth'
import { SEND_MESSAGE, GET_ALL_MESSAGES } from '../../queries';

const socketUrl = "http://localhost:3001";


class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.session.getCurrentUser.userName,
            message: '',
            messages: []
        };

        this.socket = io(socketUrl);

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

        this.sendMessage = (ev, addMessages) => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.userName,
                message: this.state.message
            })

            addMessages().then(async () => {
                this.setState({ message: '' });
            })

        }
    }
    render() {
        const { userName, message } = this.state;
        return (
            <div className="container">
                <Helmet bodyAttributes={{ class: "logInPage" }}>
                    <title>Messages - Level Up Space</title>
                </Helmet>
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr />
                                <div className="messages">
                                    <Query
                                        query={GET_ALL_MESSAGES}
                                        pollInterval={500}
                                    >
                                        {({ loading, error, data }) => {
                                            if (loading) return <div>fetching</div>
                                            if (error) return <div>{error}</div>
                                            const messagesList = () => {
                                                const allMsg = data.getMessages;
                                                return (allMsg.map(message => {
                                                    return (
                                                        <div key={message._id}>{message.userName}: {message.message}</div>
                                                    )
                                                }))
                                            }
                                            console.log(data.getMessages)
                                            return (
                                                <div>{messagesList()}</div>
                                            )
                                        }}
                                    </Query>
                                </div>
                            </div>
                            <Mutation
                                mutation={SEND_MESSAGE}
                                variables={{ message, userName }}
                            >
                                {(addMessages) => {
                                    return (
                                        <div className="card-footer">
                                            <form onSubmit={event => this.sendMessage(event, addMessages)}>
                                                <input type="hidden" placeholder="Username" value={userName} readOnly />
                                                <br />
                                                <input type="text" placeholder="Message" className="form-control" value={message} onChange={ev => this.setState({ message: ev.target.value })} />
                                                <br />
                                                <button className="btn btn-primary form-control">Send</button>
                                            </form>
                                        </div>
                                    )
                                }}
                            </Mutation>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Messages));