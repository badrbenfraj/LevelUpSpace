import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GET_SECTIONS, ADD_COMMENT, GET_CURRENT_USER, GET_COMMENTS, GET_LECTURES, GET_SPECIFIC_ORDER } from '../../queries';
import { Query, Mutation } from 'react-apollo';
import moment from "moment";
import StarRatingComponent from 'react-star-rating-component';

class CourseDetail extends Component {
    state = {
        cart: JSON.parse(localStorage.getItem('cart') || "[]"),
        cartp: localStorage.getItem('cart'),
        ID: this.props.match.params.id,
        CourseName: this.props.location.state.name,
        TeacherName: this.props.location.state.userName,
        picture: this.props.location.state.image,
        isAdded: false,
        commentarea: '',
        rating: 0
    }

    addToCart = () => {
        let id = this.state.ID;
        this.setState(state => {
            const cart = [...state.cart, id];
            localStorage.setItem('cart', JSON.stringify(cart));
            return {
                cart,
                isAdded: true,
            };
        });
    }

    clearState() {
        this.setState({
            commentarea: ''
        })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event, AddComment) {
        event.preventDefault();
        AddComment().then(async () => {
            this.clearState();
        })
    }

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    }

    render() {
        console.log(this.props.match)
        console.log(this.state.cart)
        console.log(this.props.location.state)
        const { ID, commentarea, CourseName, rating, TeacherName, picture } = this.state;
        console.log(rating)
        return (
            <div className="container coursesdetail-section">
                <div className="section-padding"></div>
                <div className="row">
                    <div className="col-md-9 col-sm-8 event-contentarea">
                        <div className="coursesdetail-block">
                            {picture && <img src={picture} alt={CourseName} width="825" height="500" />}
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
                                    variables={{ TutorialID: ID }}
                                    pollInterval={500}
                                >
                                    {({ data, loading, error }) => {
                                        if (loading) return <div>fetching</div>
                                        if (error) return <div>{error}</div>
                                        const AllSections = data.getSections;
                                        console.log(AllSections)
                                        if (AllSections !== null) {
                                            return AllSections.map((section, i) => {
                                                let c = i + 1;
                                                if (ID === section.TutorialID) {
                                                    return (
                                                        <div className="courses-sections-block" key={section._id}>
                                                            <h3>Section {c}: <span>{section.name}</span></h3>
                                                            <Query
                                                                key={i}
                                                                query={GET_LECTURES}
                                                                variables={{ SectionID: section._id }}
                                                                pollInterval={500}
                                                            >
                                                                {({ data }) => {
                                                                    const lectures = data.getLectures;
                                                                    console.log(data)
                                                                    if (lectures) {
                                                                        return lectures.map((lecture, i) => {
                                                                            return (
                                                                                <div className="courses-lecture-box" key={i}>
                                                                                    <i className="far fa-file"></i>
                                                                                    <span className="lecture-no">Lecture {c}.{i + 1}</span>
                                                                                    <span className="lecture-title">{lecture.name}</span>
                                                                                    <span className="lecture-time">00:40:00</span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    return null
                                                                }}
                                                            </Query>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            })
                                        }
                                        return null
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
                            <Query
                                query={GET_CURRENT_USER}
                            >
                                {(data, loading, error) => {

                                    if (!data.data.getCurrentUser) {
                                        return (
                                            <div className="text-center">
                                                <h3>{CourseName}</h3>
                                                <StarRatingComponent
                                                    name="rate1"
                                                    starCount={5}
                                                    value={rating}
                                                    editing={false}
                                                />
                                                <div>
                                                    <span style={{ marginBottom: '18px' }}>( 0  Review )</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return <div className="text-center">
                                        <h3>{CourseName}</h3>
                                        <StarRatingComponent
                                            name="rate1"
                                            starCount={5}
                                            value={rating}
                                            onStarClick={this.onStarClick}
                                        />
                                        <div>
                                            <span style={{ marginBottom: '18px' }}>( 0  Review )</span>
                                        </div>
                                    </div>
                                }}
                            </Query>

                            <Query
                                query={GET_CURRENT_USER}
                            >
                                {(data, loading, error) => {

                                    if (data.data.getCurrentUser) {
                                        const userName = data.data.getCurrentUser.userName;
                                        console.log(ID)
                                        console.log(userName)
                                        return (
                                            <Query
                                                query={GET_SPECIFIC_ORDER}
                                                pollInterval={500}
                                                variables={{ TutorialID: ID, userName }}
                                            >
                                                {(data) => {
                                                    const allOrders = data.data.getSpecificOrder;
                                                    console.log(data)
                                                    if (allOrders) {
                                                        return (
                                                            <div>
                                                                {allOrders.length !== 0 ? (allOrders.map((order) => {
                                                                    console.log(order)
                                                                    return (
                                                                        <div className="featuresbox text-center" key={order._id}>
                                                                            <button className="btn btn-round btn-sm">
                                                                                <Link to={`/my-courses/${ID}`}><strong>START</strong></Link>
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                })) : (
                                                                        <div className="featuresbox text-center">
                                                                            <button className="btn btn-round btn-sm "
                                                                                onClick={this.addToCart}
                                                                                disabled={this.state.cart.includes(ID)}
                                                                            >
                                                                                {!this.state.isAdded && !this.state.cart.includes(ID) ? "ADD TO CART" : "✔ ADDED"}
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                }}
                                            </Query>
                                        )
                                    }
                                    return (
                                        <div className="featuresbox text-center">
                                            Signin Or Signup
                                            <button className="btn btn-round btn-sm "
                                                onClick={this.addToCart}
                                                disabled={true}
                                            >
                                                {!this.state.isAdded && !this.state.cart.includes(ID) ? "ADD TO CART" : "✔ ADDED"}
                                            </button>
                                        </div>
                                    )
                                }}
                            </Query>

                            <div className="featuresbox"><img src={window.location.origin + "/images/dolar-ic.png"} alt="dolar-ic" width="27" height="27" /><h3>Price : </h3><span> Free</span></div>
                            <div className="featuresbox"><img src={window.location.origin + "/images/clock-ic.png"} alt="clock-ic" width="24" height="24" /><h3>Duration : </h3><span> 30 days</span></div>
                            <div className="featuresbox"><img src={window.location.origin + "/images/cup-ic.png"} alt="cup-ic" width="24" height="23" /><h3>Lectures : </h3><span> 10</span></div>
                            <div className="featuresbox"><img src={window.location.origin + "/images/user-ic.png"} alt="user-ic" width="22" height="22" /><h3>Students : </h3><span> 50</span></div>
                            <div className="featuresbox"><img src={window.location.origin + "/images/cap-ic.png"} alt="cap-ic" width="24" height="20" /><h3>Certificate of Completion</h3></div>
                        </div>
                        <div className="courses-staff">
                            <img src={window.location.origin + "/images/staff.jpg"} alt="staff" width="275" height="288" />
                            <h3>{TeacherName}</h3>
                        </div>
                    </div>
                </div>
                <Query
                    query={GET_CURRENT_USER}
                >
                    {(data, loading, error) => {

                        if (data.data.getCurrentUser) {
                            const userName = data.data.getCurrentUser.userName;
                            return (
                                <Mutation
                                    mutation={ADD_COMMENT}
                                    variables={{ comment: commentarea, TutorialID: ID, userName }}
                                >
                                    {(AddComment) => {
                                        return (
                                            <form className="comment-form" onSubmit={event => this.handleSubmit(event, AddComment)}>
                                                <h3 className="block-title">Post a Comment</h3>
                                                <div className="row">
                                                    <div className="form-group col-md-12">
                                                        <textarea className="form-control msg"
                                                            rows="5"
                                                            placeholder="Write your comment here..."
                                                            name="commentarea"
                                                            value={commentarea} onChange={this.handleChange}
                                                        ></textarea>
                                                    </div>
                                                    <div className="form-group col-md-12">
                                                        <input type="submit" title="Submit" name="Submit" value="Submit" />
                                                    </div>
                                                </div>
                                            </form>
                                        )
                                    }}
                                </Mutation>
                            )
                        }
                        return null
                    }}
                </Query>
                <div className="post-comments">
                    <Query
                        query={GET_COMMENTS}
                        pollInterval={500}
                        variables={{ TutorialID: ID }}
                    >
                        {({ data }) => {
                            if (data.getComments) {
                                return <h3 className="block-title">{data.getComments.length} Comments</h3>
                            }
                            return <h3 className="block-title">0 Comments</h3>
                        }}
                    </Query>
                    <Query
                        query={GET_COMMENTS}
                        pollInterval={500}
                        variables={{ TutorialID: ID }}
                    >
                        {({ data }) => {
                            console.log(data)
                            if (data.getComments) {
                                return data.getComments.map((comment, i) => {
                                    let dateComponent = moment(comment.createdDate).utc().format('YYYY-MM-DD');
                                    let timeComponent = moment(comment.createdDate).utc().format('HH:mm');
                                    return (
                                        <div className="media" key={comment._id}>
                                            <div className="media-left">
                                                <Link title="Martin Guptil" to="#">
                                                    <img width="112" height="112" className="media-object" src={window.location.origin + "/images/user.png"} alt="Martin Guptil" />
                                                </Link>
                                            </div>
                                            <div className="media-body">
                                                <div className="media-content">
                                                    <h4 className="media-heading">
                                                        {comment.userName}<span> {dateComponent} {timeComponent}</span>
                                                    </h4>
                                                    <p> {comment.comment} </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            return null
                        }}
                    </Query>
                </div>
                <div className="section-padding"></div>
            </div>
        );
    }
}

export default CourseDetail;