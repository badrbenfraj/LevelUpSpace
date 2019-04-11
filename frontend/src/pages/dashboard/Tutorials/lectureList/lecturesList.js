import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_LECTURES } from '../../../../queries';
import LectureDetail from './lectureDetail';

class LecturesList extends Component {
    state = {
        ID: this.props.lecture.section.id
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Query
                    query={GET_LECTURES}
                    pollInterval={500}
                >
                    {({ data, loading, error }) => {
                        if (loading) return <div>fetching</div>
                        if (error) return <div>{error}</div>
                        const AllTutSectionsLectures = data.getLectures;
                        console.log(AllTutSectionsLectures)
                        const AllLectures = () => {
                            if (AllTutSectionsLectures !== null) {
                                return AllTutSectionsLectures.map(
                                    (lecture) => {
                                        if (lecture.SectionID === this.state.ID) {
                                            return <LectureDetail key={lecture._id} lecture={lecture} />
                                        }
                                        return null
                                    }
                                )
                            } else {
                                return 'No data found'
                            }
                        }
                        return (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Tutorial Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllLectures()}
                                </tbody>
                            </table>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default LecturesList;