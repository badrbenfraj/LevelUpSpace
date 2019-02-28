import React, { Component } from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import '../css/style.css';


class Home extends Component {
    render() {
        return (
            <div>
                <Carousel autoplay >
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
                <div id="courses" className="section">
                    {/* <!-- container --> */}
                    <div className="container">

                        {/* <!-- row --> */}
                        <div className="row">
                            <div className="section-header text-center">
                                <h2>Explore Courses</h2>
                                <p className="lead">Libris vivendo eloquentiam ex ius, nec id splendide abhorreant.</p>
                            </div>
                        </div>
                        {/* <!-- /row --> */}

                        {/* <!-- courses --> */}
                        <div id="courses-wrapper">

                            {/* <!-- row --> */}
                            <div className="row">

                                {/* <!-- single course --> */}
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="course">
                                        <Link to="#" className="course-img">
                                            <img src="./img/course01.jpg" alt="" />
                                            <i className="course-link-icon fa fa-link"></i>
                                        </Link>
                                        <Link className="course-title" to="#">Beginner to Pro in Excel: Financial Modeling and Valuation</Link>
                                        <div className="course-details">
                                            <span className="course-category">Business</span>
                                            <span className="course-price course-free">Free</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /single course --> */}

                                {/* <!-- single course --> */}
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="course">
                                        <Link to="#" className="course-img">
                                            <img src="./img/course02.jpg" alt="" />
                                            <i className="course-link-icon fa fa-link"></i>
                                        </Link>
                                        <Link className="course-title" to="#">Introduction to CSS </Link>
                                        <div className="course-details">
                                            <span className="course-category">Web Design</span>
                                            <span className="course-price course-premium">Premium</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /single course --> */}

                                {/* <!-- single course --> */}
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="course">
                                        <Link to="#" className="course-img">
                                            <img src="./img/course03.jpg" alt="" />
                                            <i className="course-link-icon fa fa-link"></i>
                                        </Link>
                                        <Link className="course-title" to="#">The Ultimate Drawing Course | From Beginner To Advanced</Link>
                                        <div className="course-details">
                                            <span className="course-category">Drawing</span>
                                            <span className="course-price course-premium">Premium</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /single course --> */}

                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="course">
                                        <Link to="#" className="course-img">
                                            <img src="./img/course04.jpg" alt="" />
                                            <i className="course-link-icon fa fa-link"></i>
                                        </Link>
                                        <Link className="course-title" to="#">The Complete Web Development Course</Link>
                                        <div className="course-details">
                                            <span className="course-category">Web Development</span>
                                            <span className="course-price course-free">Free</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /single course --> */}

                            </div>
                            {/* <!-- /row --> */}

                            {/* <!-- row --> */}
                            <div className="row">

                                {/* <!-- single course --> */}
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="course">
                                        <Link to="#" className="course-img">
                                            <img src="./img/course05.jpg" alt="" />
                                            <i className="course-link-icon fa fa-link"></i>
                                        </Link>
                                        <Link className="course-title" to="#">PHP Tips, Tricks, and Techniques</Link>
                                        <div className="course-details">
                                            <span className="course-category">Web Development</span>
                                            <span className="course-price course-free">Free</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /single course --> */}

                                {/* <!-- single course --> */}
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="course">
                                        <Link to="#" className="course-img">
                                            <img src="./img/course06.jpg" alt="" />
                                            <i className="course-link-icon fa fa-link"></i>
                                        </Link>
                                        <Link className="course-title" to="#">All You Need To Know About Web Design</Link>
                                        <div className="course-details">
                                            <span className="course-category">Web Design</span>
                                            <span className="course-price course-free">Free</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /single course --> */}

                                {/* <!-- single course --> */}
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="course">
                                        <Link to="#" className="course-img">
                                            <img src="./img/course07.jpg" alt="" />
                                            <i className="course-link-icon fa fa-link"></i>
                                        </Link>
                                        <Link className="course-title" to="#">How to Get Started in Photography</Link>
                                        <div className="course-details">
                                            <span className="course-category">Photography</span>
                                            <span className="course-price course-free">Free</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /single course --> */}


                                {/* <!-- single course --> */}
                                <div className="col-md-3 col-sm-6 col-xs-6">
                                    <div className="course">
                                        <Link to="#" className="course-img">
                                            <img src="./img/course08.jpg" alt="" />
                                            <i className="course-link-icon fa fa-link"></i>
                                        </Link>
                                        <Link className="course-title" to="#">Typography From A to Z</Link>
                                        <div className="course-details">
                                            <span className="course-category">Typography</span>
                                            <span className="course-price course-free">Free</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /single course --> */}

                            </div>
                            {/* <!-- /row --> */}

                        </div>
                        {/* <!-- /courses --> */}
                        <div className="row">
                            <div className="center-btn">
                                <Link className="main-button icon-button" to="#">More Courses</Link>
                            </div>
                        </div>

                    </div>
                    {/* <!-- container --> */}

                </div>
            </div>
        );
    }
}

export default Home;