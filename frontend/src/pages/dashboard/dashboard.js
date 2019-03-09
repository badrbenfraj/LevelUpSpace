import React, { Component } from 'react';
import withAuth from '../../HOC/withAuth';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        return (
            <div>
                welcome to dashboard       
            </div>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Dashboard));