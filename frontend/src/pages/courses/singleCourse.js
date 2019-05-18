import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_ALL_USERS } from '../../queries';
import CourseDetail from './courseDetail';


class SingleCourse extends Component {
    r = <CourseDetail {...this.props}/>
    render() {
        console.log(this.props)
        const { _id, name, userName, description } = this.props.tutorial;
        
        return (
            <div className="col-md-4 col-sm-6 col-xs-6" >
                <div className="welcome-box">
                    
                    <div className="welcome-title">
                        <h3>{name}</h3>
                    </div>
                    <div className="welcome-content">
                        <Query
                            query={GET_ALL_USERS}
                        >
                            {({ loading, error, data }) => {
                                if (loading) return <div>fetching</div>
                                if (error) return <div>{error}</div>
                                const users = data.getAllUsers
                                const user = () => {
                                    return users.map(user => {
                                        if (user.userName === userName) {
                                            return (<span key={user._id}>{user.firstName} {user.lastName}</span>)
                                        }
                                        return null
                                    })
                                }
                                return (<span>{user()}</span>)
                            }}
                        </Query>
                        <p>{description}</p>
                        <ul className="course-detail">
                            <li><i className="fa fa-calendar" aria-hidden="true"></i>Course duration : <span>3 Yr</span></li>
                            <li><i className="fa fa-graduation-cap" aria-hidden="true"></i>Degree Level : <span>Master’s Degree</span></li>
                        </ul>
                        <Link to={`/course/${_id}`}>Apply now</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleCourse;