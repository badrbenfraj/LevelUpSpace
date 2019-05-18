import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_BLOGS } from '../../../../queries';
import { Link } from 'react-router-dom';
import { message } from 'antd';

class BlogDelete extends Component {

    render() {
        const { _id, title, content, category, subject, userName } = this.props.blog;
        const handleDelete = deleteBlogs => {
            const confirmDelete = window.confirm(
                _id.toString()
            );
            if (confirmDelete) {
                deleteBlogs(_id.toString()).then(({ data }) => {
                    console.log(_id.toString());
                    message.success(`Blog ${title} was deleted`)
                });
            }
        };
        console.log(this.props.blog)
        return (
            <tr>
                <td>{title}</td>
                <td>{category}</td>
                <td style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'hidden', whiteSpace: 'nowrap' }}>{content}</td>
                <td>{userName}</td>
                <Mutation
                    mutation={DELETE_BLOGS}
                    variables={{ _id }}
                    pollInterval={500}
                >

                    {(deleteBlogs, attrs) => (
                        <td>
                            <Link className="editBtn" to={{
                                pathname: `/edit-blogs/${_id}`,
                                state: {
                                    title,
                                    category,
                                    subject,
                                    content,
                                    userName 
                                }
                            }}><i className="fas fa-edit" />Edit</Link>
                            <span>|</span>
                            {attrs.loading ? "deleting..." : <i className="fas fa-trash-alt" onClick={() => handleDelete(deleteBlogs)} > Delete </i>}
                        </td>
                    )}

                </Mutation>
            </tr>
        );
    }
}

export default BlogDelete;