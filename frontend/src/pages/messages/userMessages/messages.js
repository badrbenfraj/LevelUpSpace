import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SidePanel from '../sidePanel/sidePanel';
import withAuth from '../../../HOC/withAuth';

class Messages extends Component {
    render() {
        return (
            <div>
                <SidePanel />
            </div>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Messages));