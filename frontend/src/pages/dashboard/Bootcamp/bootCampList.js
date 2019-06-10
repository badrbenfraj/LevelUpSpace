import React, { Component } from 'react';
import { Query } from 'react-apollo';
import moment from "moment";
import { GET_CAMPS } from '../../../queries';

class BootCampList extends Component {
    render() {
        return (
            <div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Session Name</th>
                                <th scope="col">Session URL</th>
                                <th scope="col">Mentor Username</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Query
                                query={GET_CAMPS}
                                pollInterval={500}
                            >
                                {({ loading, error, data }) => {
                                    const allcamps = data.getCamps
                                    if (allcamps) {
                                        console.log(allcamps)
                                        return allcamps.map((camp) => {
                                            let dateComponent = moment(camp.DateAndTime).utc().format('YYYY-MM-DD');
                                            return (
                                                <tr key={camp._id}>
                                                    <td>{camp.CampName}</td>
                                                    <td>{camp.url}</td>
                                                    <td>{camp.Mentor.userName}</td>
                                                    <td>{dateComponent}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    return null
                                }}
                            </Query>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default BootCampList;