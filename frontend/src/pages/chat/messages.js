import React, { Component } from 'react';
import io from 'socket.io-client'
import { Mutation, Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import withAuth from '../../HOC/withAuth'
import { SEND_MESSAGE, GET_ALL_MESSAGES } from '../../queries';
import { Link } from 'react-router-dom';
import moment from 'moment';

const socketUrl = "http://localhost:3001";


class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: this.props.session.getCurrentUser._id,
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
                author: this.state.userID,
                message: this.state.message
            })

            addMessages().then(async () => {
                this.setState({ message: '' });
            })

        }
    }

    render() {
        const { userID, message } = this.state;
        console.log(this.props)
        return (
            <div className="container" style={{ position: 'fixed', bottom: '0px', MarginLeft: "10%" }}>
                <Helmet bodyAttributes={{ class: "logInPage" }}>
                    <title>Messages - Level Up Space</title>
                </Helmet>
                <div className="row" style={{ paddingTop: '40px'}}>
                    <div className="col-md-12">
                        <div className="panel panel-info">
                            <div className="panel-heading mb-3">
                                RECENT CHAT HISTORY
                        </div>
                            <div className="panel-body">
                                <ul className="media-list">
                                        <li className="media">
                                            <div className="media-body">
                                                <Query
                                                    query={GET_ALL_MESSAGES}
                                                    pollInterval={1000}
                                                >
                                                    {({ loading, error, data }) => {
                                                        if (loading) return <div>fetching</div>
                                                        const messagesList = () => {
                                                            const allMsg = data.getMessages;
                                                            return (allMsg.map(message => {
                                                                let dateComponent = moment(message.createdDate).utc().format('YYYY-MM-DD');
                                                                let timeComponent = moment(message.createdDate).utc().format('hh:mm A');
                                                                return (
                                                                    <div className="media" key={message._id}>
                                                                        <Link className="pull-left" to="#">
                                                                            <img className="rounded-circle mr-3" alt="messageImage" src={message.User.profileImage} width="50px" height="50px" />
                                                                        </Link>
                                                                        <div className="media-body">
                                                                            {message.message}
                                                                            <br />
                                                                            <small className="text-muted">{message.User.userName} | {dateComponent} at {timeComponent}</small>
                                                                            <hr />
                                                                        </div>
                                                                    </div>
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
                                        </li>
                                </ul>
                            </div>
                            <Mutation
                                mutation={SEND_MESSAGE}
                                variables={{ message, _id: userID }}
                            >
                                {(addMessages) => {
                                    console.log(userID)
                                    return (
                                        <div className="panel-footer">
                                            <form onSubmit={event => this.sendMessage(event, addMessages)}>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Message"
                                                        value={message}
                                                        onChange={event => this.setState({ message: event.target.value })}
                                                    />
                                                    <span className="input-group-btn">
                                                        <button className="btn btn-info">SEND</button>
                                                    </span>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                }}
                            </Mutation>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Messages));