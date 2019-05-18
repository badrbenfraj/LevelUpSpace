import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class BlogPost extends Component {
    render() {
        return (
            <div className="container blog blogpost">
                <div className="section-padding"></div>
                <div className="row">
                    <div className="col-md-9 col-sm-8 content-area">
                        <article className="type-post">
                            <div className="entry-cover">
                                <img width="860" height="470" alt="blogpost" src={window.location.origin + "/images/blogpost.jpg"} />
                            </div>
                            <div className="entry-block">
                                <div className="entry-contentblock">
                                    <div className="entry-meta">
                                        <span className="postby">By : <Link to="#" title="Andreanne Turcotte"> Andreanne Turcotte</Link></span>
                                        <span className="postcatgory">Category : <Link to="#" title="News Posted"> News Posted</Link></span>
                                        <span className="postdate">Date : <Link to="#" title="25th May 2016"> 25th May 2016</Link></span>
                                    </div>
                                    <div className="entry-block">
                                        <div className="entry-title">
                                            <h3>Along Communicate Directly With Experienced Teachers</h3>
                                        </div>
                                        <div className="entry-content">
                                            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magniolrs eos qui rate voluptatem sequi nesciunt  Neque porro quisquam est qui dolorem ipsum quia dolore sit amet con sectetur adipisci quia suthagara lukuthea satham</p>
                                            <p>Enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magniol res eos qui rate voluptatem sequi nesciunt  Neque porro quisquam est qui dolorem ipsum quia dolore sit amet conlites sectetur adipisci quia suthagara lukuthea satham non numquam eius modi tempra. incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,</p>
                                            <blockquote>
                                                <p>"Completely synergize resource taxing relationships via premier niche markets. Profess tionally cultivate one-to-one customer service with robust ideas"</p>
                                            </blockquote>
                                            <p>Enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magniol res eos qui rate voluptatem sequi nesciunt  Neque porro quisquam est qui dolorem ipsum quia dolore sit amet conlites sectetur adipisci quia suthagara lukuthea satham non numquam eius modi tempra. incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,</p>
                                        </div>
                                    </div>
                                    <ul>
                                        <li><Link title="Facebook" to="#"><i className="fa fa-facebook"></i></Link></li>
                                        <li><Link title="Twitter" to="#"><i className="fa fa-twitter"></i></Link></li>
                                        <li><Link title="Google Plus" to="#"><i className="fa fa-google-plus"></i></Link></li>
                                        <li><Link title="Behance" to="#"><i className="fa fa-behance"></i></Link></li>
                                        <li><Link title="Dribbble" to="#"><i className="fa fa-dribbble"></i></Link></li>
                                    </ul>
                                </div>
                                <div className="post-ic"><span className="icon icon-Pencil"></span></div>
                            </div>
                        </article>
                        <div className="post-comments">
                            <h3 className="block-title">3 Comments</h3>
                            <div className="media">
                                <div className="media-left">
                                    <Link title="Martin Guptil" to="#">
                                        <img width="112" height="112" className="media-object" src="images/comment1.jpg" alt="Martin Guptil" />
                                    </Link>
                                </div>
                                <div className="media-body">
                                    <div className="media-content">
                                        <h4 className="media-heading">
                                            Martin Guptil<span>Sep 23, 2015</span>
                                        </h4>
                                        <p>You bet your life Speed Racer he will see it through. Its mission explore  to strange news worlds seek out new life and new civilizations gone before.</p>
                                        <Link to="#" title="Reply">Reply</Link>
                                    </div>
                                    <div className="media">
                                        <div className="media-left">
                                            <Link title="Lierd Yuis" to="#">
                                                <img width="112" height="112" className="media-object" src="images/comment2.jpg" alt="Alfred Marshal" />
                                            </Link>
                                        </div>
                                        <div className="media-body">
                                            <div className="media-content">
                                                <h4 className="media-heading">
                                                    Lierd Yuis<span>Sep 23, 2015</span>
                                                </h4>
                                                <p>You bet your life Speed Racer he will see it through. Its mission explore  to strange news worlds seek out new life and new civilizations gone before.</p>
                                                <Link to="#" title="Reply">Reply</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-left">
                                    <Link title="Micheal Jicob" to="#">
                                        <img width="112" height="112" className="media-object" src="images/comment3.jpg" alt="Stephen Hawk" />
                                    </Link>
                                </div>
                                <div className="media-body">
                                    <div className="media-content last">
                                        <h4 className="media-heading">
                                            Micheal Jicob<span>Sep 23, 2015</span>
                                        </h4>
                                        <p>You bet your life Speed Racer he will see it through. Its mission explore  to strange news worlds seek out new life and new civilizations gone before.</p>
                                        <Link to="#" title="Reply">Reply</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form className="comment-form">
                            <h3 className="block-title">Post a Comment</h3>
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <textarea className="form-control msg" rows="5" placeholder="Write your comment here..."></textarea>
                                </div>
                                <div className="form-group col-md-12">
                                    <input type="submit" title="Submit" name="Submit" value="Submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-3 col-sm-4 widget-area">
                        <aside className="widget widget_categories">
                            <h3 className="widget-title">Categories</h3>
                            <ul>
                                <li><Link title="Language Science" to="#">Language Science</Link><span>(10)</span></li>
                                <li><Link title="Student Guidance" to="#">Student Guidance</Link><span>(12)</span></li>
                                <li><Link title="School Psychology" to="#">School Psychology</Link><span>(08)</span></li>
                                <li><Link title="Vocational Counselling" to="#">Vocational Counselling	</Link><span>(18)</span></li>
                                <li><Link title="Uncategorized" to="#">Uncategorized</Link><span>(11)</span></li>
                                <li><Link title="Youth Science" to="#">Youth Science</Link><span>(10)</span></li>
                            </ul>
                        </aside>
                        <aside className="widget widget_latestnews">
                            <h3 className="widget-title">Latest News</h3>
                            <div className="latestnews-box">
                                <Link to="blogpost-page.html" title="Along Communicate Directly With Experienced Teachers">Along Communicate Directly With Experienced Teachers</Link>
                                <span>25th May 2016</span>
                            </div>
                            <div className="latestnews-box">
                                <Link to="blogpost-page.html" title="Given The Tips To Students Succed In An Online Courses ">Given The Tips To Students Succed In An Online Courses </Link>
                                <span>25th May 2016</span>
                            </div>
                            <div className="latestnews-box">
                                <Link to="blogpost-page.html" title="Why Should Read Every Day">Why Should Read Every Day</Link>
                                <span>25th May 2016</span>
                            </div>
                        </aside>
                        <aside className="widget courses-staff">
                            <img src="images/staff.jpg" alt="staff" width="275" height="288" />
                            <h3>Charlie Brown</h3>
                            <span>Web Designer</span>
                            <p>My name is Ruth. I grew up and studied in...</p>
                        </aside>
                    </div>
                </div>
                <div className="section-padding"></div>
            </div>
        );
    }
}

export default BlogPost;