import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GET_SECTIONS } from '../../queries';
import { Query } from 'react-apollo';

class CourseDetail extends Component {
    state = {
        cart: JSON.parse(localStorage.getItem('cart') || "[]"), 
        ID: this.props.match.params.id,
        isAdded: false
    }


    addToCart = () => {
        let id=this.state.ID;
        this.setState(state => {
            const cart = [...state.cart, id];
            localStorage.setItem('cart', JSON.stringify(cart));
            return {
                cart,
                isAdded: true,
            };
        });
    }

    render() {
        console.log(this.props.match)
        console.log(this.state.cart)
        const { ID } = this.state;
        return (
            <div className="container coursesdetail-section">
                <div className="section-padding"></div>
                <div className="row">
                    <div className="col-md-9 col-sm-8 event-contentarea">
                        <div className="coursesdetail-block">
                            <img src={window.location.origin + "/images/event-coursesdetail.jpg"} alt="event-coursesdetail" width="825" height="500" />
                            <div className="course-description">
                                <h3 className="course-title">Courses Description</h3>
                                <p>Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit.Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti.Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit.</p>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga.</p>
                            </div>
                            <div className="courses-summary">
                                <h3 className="course-title">Courses summary</h3>
                                <ul>
                                    <li><Link to="#" title="Over 94 lectures and 6 hours">Over 94 lectures and 6 hours</Link></li>
                                    <li><Link to="#" title="Educated Staff">Educated Staff</Link></li>
                                    <li><Link to="#" title="To teach real programming skills">To teach real programming skills</Link></li>
                                    <li><Link to="#" title="Timesheets">Timesheets</Link></li>
                                    <li><Link to="#" title="Build a solid understanding">Build a solid understanding</Link></li>
                                    <li><Link to="#" title="Video Lessons">Video Lessons</Link></li>
                                </ul>
                            </div>
                            <div className="courses-curriculum">
                                <h3 className="course-title">Courses curriculum</h3>
                                <Query
                                    query={GET_SECTIONS}
                                    pollInterval={500}
                                >
                                    {({ data, loading, error }) => {
                                        if (loading) return <div>fetching</div>
                                        if (error) return <div>{error}</div>
                                        const AllSections = data.getSections;
                                        console.log(AllSections)
                                        const AllTutorials = () => {
                                            if (AllSections !== null) {
                                                return AllSections.map((section, i) => {
                                                    if (ID === section.TutorialID) {
                                                        return (
                                                            <div className="courses-sections-block" key={section._id}>
                                                                <h3>Section {i}: <span>{section.name}</span></h3>
                                                                <div className="courses-lecture-box">
                                                                    <i className="far fa-file"></i>
                                                                    <span className="lecture-no">Lecture 2.1</span>
                                                                    <span className="lecture-title">Advanced Database Development</span>
                                                                    <span className="lecture-time">00:40:00</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                })
                                            } else {
                                                return 'No data found'
                                            }
                                        }
                                        return AllTutorials()
                                    }}
                                </Query>
                            </div>
                            <div className="courses-review">
                                <h3 className="course-title">Courses Review</h3>
                                <div className="reviewbox">
                                    <h3>Average Rating</h3>
                                    <div className="average-review">
                                        <h2>4.8</h2>
                                        <ul>
                                            <li><Link to="#" title="1 Star"><i className="fa fa-star-o" aria-hidden="true"></i></Link></li>
                                            <li><Link to="#" title="2 Star"><i className="fa fa-star-o" aria-hidden="true"></i></Link></li>
                                            <li><Link to="#" title="3 Star"><i className="fa fa-star-o" aria-hidden="true"></i></Link></li>
                                            <li><Link to="#" title="4 Star"><i className="fa fa-star-o" aria-hidden="true"></i></Link></li>
                                            <li><Link to="#" title="5 Star"><i className="fa fa-star-o" aria-hidden="true"></i></Link></li>
                                        </ul>
                                        <span>5 Rating</span>
                                    </div>
                                </div>
                                <div className="reviewbox">
                                    <h3>Detailed Rating</h3>
                                    <div className="detail-review">
                                        <ul>
                                            <li><Link to="#" title="5 stars">5 stars</Link><span>5</span></li>
                                            <li><Link to="#" title="4 stars">4 stars</Link><span>0</span></li>
                                            <li><Link to="#" title="3 stars">3 stars</Link><span>0</span></li>
                                            <li><Link to="#" title="2 stars">2 stars</Link><span>0</span></li>
                                            <li><Link to="#" title="1 stars">1 stars</Link><span>0</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav className="ow-pagination">
                            <ul className="pagination">
                                <li><span className="arrow_left" aria-hidden="true"></span><Link to="#" title="Political Science">Political Science</Link></li>
                                <li><Link to="#" title="Micro Biology">Micro Biology</Link><span className="arrow_right" aria-hidden="true"></span></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-3 col-sm-4 event-sidebar">
                        <div className="courses-features">
                            <h3>Improve Your CSS Workflow with SASS</h3>
                            <ul>
                                <li><Link to="#" title="1 Star"><i className="far fa-star"></i></Link></li>
                                <li><Link to="#" title="2 Star"><i className="far fa-star"></i></Link></li>
                                <li><Link to="#" title="3 Star"><i className="far fa-star"></i></Link></li>
                                <li><Link to="#" title="4 Star"><i className="far fa-star"></i></Link></li>
                                <li><Link to="#" title="5 Star"><i className="far fa-star"></i></Link></li>
                            </ul>
                            <span>( 0  Review )</span>
                            <div className="featuresbox text-center">
                                <button className="btn btn-round btn-sm "
                                    onClick={this.addToCart}
                                    disabled={this.state.cart.includes(ID)}
                                >
                                    {!this.state.isAdded && !this.state.cart.includes(ID)? "ADD TO CART" : "✔ ADDED"}
                                    
                                </button></div>
                            <div className="featuresbox"><img src={window.location.origin + "/images/dolar-ic.png"} alt="dolar-ic" width="27" height="27" /><h3>Price : </h3><span> Free</span></div>
                            <div className="featuresbox"><img src={window.location.origin + "/images/clock-ic.png"} alt="clock-ic" width="24" height="24" /><h3>Duration : </h3><span> 30 days</span></div>
                            <div className="featuresbox"><img src={window.location.origin + "/images/cup-ic.png"} alt="cup-ic" width="24" height="23" /><h3>Lectures : </h3><span> 10</span></div>
                            <div className="featuresbox"><img src={window.location.origin + "/images/user-ic.png"} alt="user-ic" width="22" height="22" /><h3>Students : </h3><span> 50</span></div>
                            <div className="featuresbox"><img src={window.location.origin + "/images/cap-ic.png"} alt="cap-ic" width="24" height="20" /><h3>Certificate of Completion</h3></div>
                        </div>
                        <div className="courses-staff">
                            <img src={window.location.origin + "/images/staff.jpg"} alt="staff" width="275" height="288" />
                            <h3>Charlie Brown</h3>
                            <span>Web Designer</span>
                            <p>My name is Ruth. I grew up and studied in…</p>
                        </div>
                    </div>
                </div>
                <div className="section-padding"></div>
            </div>
        );
    }
}

export default CourseDetail;