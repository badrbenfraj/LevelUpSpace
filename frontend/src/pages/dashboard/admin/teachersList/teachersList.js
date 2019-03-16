import React, { Component } from 'react';
import { GET_ALL_TEACHERS } from './../../../../queries';
import { Query } from 'react-apollo';
import TeacherDetail from './teacherDetail';

class TeachersList extends Component {
    render() {
        return (
            <div>
                <Query
                    query={GET_ALL_TEACHERS}
                    pollInterval={500}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>fetching</div>
                        if (error) return <div>{error}</div>
                        const allTeach = data.getAllTeachers
                        const TeachersTable = () => {
                            if (allTeach !== null) {
                                return allTeach.map((teacher) => <TeacherDetail key={teacher._id} teacher={teacher} />)
                            } else {
                                return 'No data found'
                            }
                        }
                        return (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Username</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(data.getAllTeachers)}
                                        {TeachersTable()}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default TeachersList;



