import React, { Component } from 'react';
import withAuth from '../../HOC/withAuth';
import { withRouter } from 'react-router-dom';
import Admin from './admin/admin';
import NotFound from '../error_404';
import Teacher from './teacher';
import Mentor from './mentor';
import User from './user';



class Dashboard extends Component {
    userRole = ()=>{
        if(this.props.session.getCurrentUser.isAdmin){
            return <Admin />;
        }else if(this.props.session.getCurrentUser.isUser){
            return <User />
        }else if(this.props.session.getCurrentUser.isTeacher){
            return <Teacher />
        }else if(this.props.session.getCurrentUser.isMentor){
            return <Mentor />
        }else{
            return <NotFound />
        }
    }

    render() {
        return (
            <div>
                {this.userRole()}
            </div>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Dashboard));