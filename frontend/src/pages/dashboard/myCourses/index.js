import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import withAuth from '../../../HOC/withAuth'
import { GET_ALL_ORDERS, GET_CURRENT_USER } from '../../../queries';

const styles = {
    centerh1: {
        textAlign: 'center',
        padding: '50px'
    },
    checkoutBtn: {
        textAlign: 'right'
    },
    containerPadding: {
        paddingTop: '40px',
        paddingBottom: '150px'
    }
}
class MyCoursesList extends Component {
    render() {
        const { centerh1, containerPadding } = styles
        return (
            <div style={containerPadding} className="container">
                <Helmet bodyAttributes={{ class: "logInPage" }}>
                    <title>MY COURSES - Level Up Space</title>
                </Helmet>
                <h1 style={centerh1}>MY COURSES</h1>
                <div className="row">
                    <Query
                        query={GET_CURRENT_USER}
                    >
                        {(data, loading, error) => {
                            const userName = data.data.getCurrentUser.userName;
                            return (
                                <Query
                                    query={GET_ALL_ORDERS}
                                    pollInterval={500}
                                >
                                    {({ data, loading, error }) => {
                                        if (loading) return <div>fetching</div>
                                        if (error) return <div>{error}</div>
                                        return data.getOrders.map(order => {
                                            if (userName === order.userName) {
                                                const id = order.TutorialID;
                                                return (
                                                    <div className="col-md-4 col-sm-6 col-xs-6" key={order._id}>
                                                        <div className="welcome-box">
                                                            <Link to={`/my-courses/${id}`}><img src="images/welcome1.jpg" alt="welcome1" width="370" height="440" /></Link>
                                                            <div>
                                                                <h3>{order.TutorialID}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return null
                                        })
                                    }}
                                </Query>
                            )

                        }}
                    </Query>
                </div>
            </div>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(MyCoursesList));