import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

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
                <div className="col-md-4 col-sm-6 col-xs-6" >
                        <div className="welcome-box">
                            <img src="images/welcome1.jpg" alt="welcome1" width="370" height="440" />
                            <div>
                                <h3>test</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-6" >
                        <div className="welcome-box">
                            <img src="images/welcome1.jpg" alt="welcome1" width="370" height="440" />
                            <div>
                                <h3>test</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-6" >
                        <div className="welcome-box">
                            <img src="images/welcome1.jpg" alt="welcome1" width="370" height="440" />
                            <div>
                                <h3>test</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-6" >
                        <div className="welcome-box">
                            <img src="images/welcome1.jpg" alt="welcome1" width="370" height="440" />
                            <div>
                                <h3>test</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-6" >
                        <div className="welcome-box">
                            <img src="images/welcome1.jpg" alt="welcome1" width="370" height="440" />
                            <div>
                                <h3>test</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-6" >
                        <div className="welcome-box">
                            <img src="images/welcome1.jpg" alt="welcome1" width="370" height="440" />
                            <div>
                                <h3>test</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-6" >
                        <div className="welcome-box">
                            <img src="images/welcome1.jpg" alt="welcome1" width="370" height="440" />
                            <div>
                                <h3>test</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-6" >
                        <div className="welcome-box">
                            <img src="images/welcome1.jpg" alt="welcome1" width="370" height="440" />
                            <div>
                                <h3>test</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyCoursesList;