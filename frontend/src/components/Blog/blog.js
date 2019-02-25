import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';

class Blog extends Component {
    render() {
        return (
			<div>
				<div className="breadcrumbs">
                    <div className="container">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                            <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                            Blog
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
				<div id="blog" className="section">
					{/* <!-- container --> */}
					<div className="container">

						{/* <!-- row --> */}
						<div className="row">

							{/* <!-- main blog --> */}
							<div id="main" className="col-md-9">

								{/* <!-- row --> */}
								<div className="row">

									{/* <!-- single blog --> */}
									<div className="col-md-6">
										<div className="single-blog">
											<div className="blog-img">
												<Link to="blog-post.html">
													<img src="./img/blog01.jpg" alt=""/>
												</Link>
											</div>
											<h4><Link to="blog-post.html">Pro eu error molestie deserunt. At per viderer bonorum persecuti.</Link></h4>
											<div className="blog-meta">
												<span className="blog-meta-author">By: <Link to="#">John Doe</Link></span>
												<div className="pull-right">
													<span>18 Oct, 2017</span>
													<span className="blog-meta-comments"><Link to="#"><i className="fa fa-comments"></i> 35</Link></span>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- /single blog --> */}

									{/* <!-- single blog --> */}
									<div className="col-md-6">
										<div className="single-blog">
											<div className="blog-img">
												<Link to="blog-post.html">
													<img src="./img/blog02.jpg" alt=""/>
												</Link>
											</div>
											<h4><Link to="blog-post.html">Pro eu error molestie deserunt. At per viderer bonorum persecuti.</Link></h4>
											<div className="blog-meta">
												<span className="blog-meta-author">By: <Link to="#">John Doe</Link></span>
												<div className="pull-right">
													<span>18 Oct, 2017</span>
													<span className="blog-meta-comments"><Link to="#"><i className="fa fa-comments"></i> 35</Link></span>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- /single blog --> */}

									{/* <!-- single blog --> */}
									<div className="col-md-6">
										<div className="single-blog">
											<div className="blog-img">
												<Link to="blog-post.html">
													<img src="./img/blog03.jpg" alt=""/>
												</Link>
											</div>
											<h4><Link to="blog-post.html">Pro eu error molestie deserunt. At per viderer bonorum persecuti.</Link></h4>
											<div className="blog-meta">
												<span className="blog-meta-author">By: <Link to="#">John Doe</Link></span>
												<div className="pull-right">
													<span>18 Oct, 2017</span>
													<span className="blog-meta-comments"><Link to="#"><i className="fa fa-comments"></i> 35</Link></span>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- /single blog --> */}

									{/* <!-- single blog --> */}
									<div className="col-md-6">
										<div className="single-blog">
											<div className="blog-img">
												<Link to="blog-post.html">
													<img src="./img/blog04.jpg" alt=""/>
												</Link>
											</div>
											<h4><Link to="blog-post.html">Pro eu error molestie deserunt. At per viderer bonorum persecuti.</Link></h4>
											<div className="blog-meta">
												<span className="blog-meta-author">By: <Link to="#">John Doe</Link></span>
												<div className="pull-right">
													<span>18 Oct, 2017</span>
													<span className="blog-meta-comments"><Link to="#"><i className="fa fa-comments"></i> 35</Link></span>
												</div>
											</div>
										</div>
									</div>
									{/* <!-- /single blog --> */}

								</div>
								{/* <!-- /row --> */}

								{/* <!-- row --> */}
								<div className="row">

									{/* <!-- pagination --> */}
									<div className="col-md-12">
										<div className="post-pagination">
											<Link to="#" className="pagination-back pull-left">Back</Link>
											<ul className="pages">
												<li className="active">1</li>
												<li><Link to="#">2</Link></li>
												<li><Link to="#">3</Link></li>
												<li><Link to="#">4</Link></li>
											</ul>
											<Link to="#" className="pagination-next pull-right">Next</Link>
										</div>
									</div>
									{/* <!-- pagination --> */}

								</div>
								{/* <!-- /row --> */}
							</div>
							{/* <!-- /main blog --> */}

							{/* <!-- aside blog --> */}
							<div id="aside" className="col-md-3">

								{/* <!-- search widget --> */}
								<div className="widget search-widget">
									<form>
										<input className="input" type="text" name="search"/>
										<button><i className="fa fa-search"></i></button>
									</form>
								</div>
								{/* <!-- /search widget --> */}

								{/* <!-- category widget --> */}
								<div className="widget category-widget">
									<h3>Categories</h3>
									<Link className="category" to="#">Web <span>12</span></Link>
									<Link className="category" to="#">Css <span>5</span></Link>
									<Link className="category" to="#">Wordpress <span>24</span></Link>
									<Link className="category" to="#">Html <span>78</span></Link>
									<Link className="category" to="#">Business <span>36</span></Link>
								</div>
								{/* <!-- /category widget --> */}

								{/* <!-- posts widget --> */}
								<div className="widget posts-widget">
									<h3>Recents Posts</h3>

									{/* <!-- single posts --> */}
									<div className="single-post">
										<Link className="single-post-img" to="blog-post.html">
											<img src="./img/post01.jpg" alt=""/>
										</Link>
										<Link to="blog-post.html">Pro eu error molestie deserunt.</Link>
										<p><small>By : John Doe .18 Oct, 2017</small></p>
									</div>
									{/* <!-- /single posts --> */}

									{/* <!-- single posts --> */}
									<div className="single-post">
										<Link className="single-post-img" to="blog-post.html">
											<img src="./img/post02.jpg" alt=""/>
										</Link>
										<Link to="blog-post.html">Pro eu error molestie deserunt.</Link>
										<p><small>By : John Doe .18 Oct, 2017</small></p>
									</div>
									{/* <!-- /single posts --> */}

									{/* <!-- single posts --> */}
									<div className="single-post">
										<Link className="single-post-img" to="blog-post.html">
											<img src="./img/post03.jpg" alt=""/>
										</Link>
										<Link to="blog-post.html">Pro eu error molestie deserunt.</Link>
										<p><small>By : John Doe .18 Oct, 2017</small></p>
									</div>
									{/* <!-- /single posts --> */}

								</div>
								{/* <!-- /posts widget --> */}

								{/* <!-- tags widget --> */}
								<div className="widget tags-widget">
									<h3>Tags</h3>
									<Link className="tag" to="#">Web</Link>
									<Link className="tag" to="#">Photography</Link>
									<Link className="tag" to="#">Css</Link>
									<Link className="tag" to="#">Responsive</Link>
									<Link className="tag" to="#">Wordpress</Link>
									<Link className="tag" to="#">Html</Link>
									<Link className="tag" to="#">Website</Link>
									<Link className="tag" to="#">Business</Link>
								</div>
								{/* <!-- /tags widget --> */}

							</div>
							{/* <!-- /aside blog --> */}

						</div>
						{/* <!-- row --> */}

					</div>
					{/* <!-- container --> */}

				</div>
			</div>
        );
    }
}

export default Blog;