import React, { Component } from 'react';
import BlogsList from './BlogList/index';
import Editor from './AddBlog/addBlogs';
import { GET_BLOGS } from '../../../queries'


const styles = {
    centerh1: {
      textAlign: 'center',
      padding: '30px'
    },
    checkoutBtn: {
      textAlign: 'right'
    },
    containerPadding: {
      paddingTop: '70px',
      paddingBottom: '150px'
    }
  }
  
class Blogss extends Component {
    state = {
        blogItems: JSON.parse(localStorage.getItem('addBlog')) || [],
        redirect: false
    }
    blogTable = () => {
        return this.state.blogItems.map(item => {
            return (
                <Query
                    key={item}
                    query={GET_BLOGS}
                    pollInterval={500}
                >
                    {({ data, loading, error }) => {
                        const AllBlg = data.getBlogs;
                        const cartBlogs = () => {
                            if (AllBlg !== undefined) {
                                return (
                                    AllBlg.map(blog => {
                                        if (blog._id === item) {
                                            return (<BlogsList key={blog._id} blog={blog} deleteitem={() => this.handleDeleteBlogItem(blog._id)} />)
                                        }
                                        return null
                                    })
                                )
                            }
                        }
                        return (

                            <tbody>
                                {cartBlogs()}
                            </tbody>
                        )
                    }}
                    }}
              </Query>
            )
        })
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    handleCheckout = () => {
        if (JSON.parse(localStorage.getItem('Blog'))) {
            if (this.state.redirect) {
                localStorage.removeItem('Blog');
                return this.state.blogItems.map(item => {
                    const BlogID = item;
                    return (
                        <Query
                            key={item}
                            query={GET_CURRENT_USER}
                        >
                            {(data, loading, error) => {
                                const userName = data.data.getCurrentUser.userName;
                                const handleSubmit = (addBlog) => {
                                    if (this.state.redirect) {
                                        addBlog();
                                    }
                                }
                                return (
                                    <Mutation
                                        mutation={addBlog}
                                        variables={{ BlogID, userName }}
                                    >
                                        {(addBlog) => {
                                            return (
                                                <div>
                                                    {handleSubmit(addBlog)}
                                                    <Redirect to="/Blog" />
                                                </div>
                                            )
                                        }}
                                    </Mutation >
                                )

                            }}
                        </Query>
                    )
                })
                // return <Redirect to="/my-courses" />
            }
        }
    }
    handleDeleteBlogItem = (itemId) => {
        const blogIDs = JSON.parse(localStorage["Blog"]);
        const updatedcartIds = cartIDs.filter(id => id !== itemId);
        this.setState(prevState => ({ ...prevState, blogIDs: updatedcartIds }), () => {
            localStorage.setItem('cart', JSON.stringify(updatedcartIds));
        });
    }

    render() {
        const { centerh1, checkoutBtn, containerPadding } = styles
        console.log(this.state.BlogItems)
        return (
            <header>
                <div style={containerPadding}>
                    <Helmet bodyAttributes={{ class: "logInPage" }}>
                        <title>Blog - Level Up Space</title>
                    </Helmet>
                    <Container>
                        <h1 style={centerh1}>Cart</h1>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {this.blogTable()}
                        </Table>
                        <div style={checkoutBtn}>
                            <Button onClick={this.setRedirect}>Check out</Button>
                            {this.handleCheckout()}
                        </div>
                    </Container>
                </div>
                <div>
                    <Editor />
                    <BlogsList />
                </div>
            </header>
        );
    }
}
export default Blogss;