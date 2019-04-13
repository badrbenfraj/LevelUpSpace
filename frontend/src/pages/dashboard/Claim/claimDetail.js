import React, { Component } from 'react';

class ClaimDetail extends Component {
    render() {
        const {firstName, lastName, email, subject, description}= this.props.claim
        return (
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{subject}</td>
                <td>{description}</td>
            </tr>
        );
    }
}

export default ClaimDetail;