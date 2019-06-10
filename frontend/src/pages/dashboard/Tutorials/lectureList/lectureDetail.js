import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { DELETE_LECTURE } from '../../../../queries';

class LectureDetail extends Component {
    render() {
        const { _id, name, description, SectionID } = this.props.lecture;
        const handleDelete = deleteLecture => {
            const confirmDelete = window.confirm(
                _id.toString()
            );
            if (confirmDelete) {
                deleteLecture(_id.toString()).then(({ data }) => {
                    console.log(_id.toString());
                    message.success(`Lecture ${name} was deleted`);
                });
            }
        };
        return (
            <tr>
                <td>{name}</td>
                <td style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'hidden', whiteSpace: 'nowrap' }}>{description}</td>
                <Mutation
                    mutation={DELETE_LECTURE}
                    variables={{_id}}
                >
                    {(deleteLecture, attrs)=>{
                        return (
                            <td>
                                <Link className="editBtn" to={{
                                    pathname: `/edit-section/${SectionID}/edit-lecture/${_id}`,
                                    state: {
                                        lectureName: { name },
                                        lectureDescription: { description }
                                    }
                                }}><i className="fas fa-edit" />Edit</Link>
                                <span>|</span>
                                {attrs.loading ? "deleting..." : <i className="fas fa-trash-alt" onClick={() => handleDelete(deleteLecture)} > Delete </i>}
                            </td>
                        )
                    }}
                </Mutation>
            </tr>
        );
    }
}

export default LectureDetail;