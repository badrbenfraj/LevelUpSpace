import React, { Component } from 'react';

import { Query } from 'react-apollo';
import { GET_ALL_TUTORIALS, GET_CURRENT_USER } from '../../../../queries';
import TutorialDetail from './tutorialDetail';

class TutorialsList extends Component {
    render() {
        return (
            <div>
                <Query
                    query={GET_CURRENT_USER}
                >
                    {(data, loading, error) => {
                        console.log(data)
                        const CAdmin = data.data.getCurrentUser.isAdmin;
                        const CuserName = data.data.getCurrentUser.userName;
                        return (
                            <Query
                                query={GET_ALL_TUTORIALS}
                            >
                                {({ data, loading, error }) => {
                                    if (loading) return <div>fetching</div>
                                    const AllTut = data.getAllTutorials;
                                    console.log(AllTut)
                                    const AllTutorials = () => {
                                        if (AllTut !== null) {
                                            return AllTut.map((tutorial) => {
                                                const verif = ()=>{
                                                    if(CAdmin){
                                                        return <TutorialDetail key={tutorial._id} tutorial={tutorial} />
                                                    }else{
                                                        if(CuserName === tutorial.userName){
                                                            return <TutorialDetail key={tutorial._id} tutorial={tutorial} />
                                                        }
                                                    }
                                                }
                                                return verif()
                                            })
                                        }
                                    }
                                    return (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Tutorial Name</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {AllTutorials()}
                                            </tbody>
                                        </table>
                                    )
                                }}
                            </Query>
                        )

                    }}
                </Query>
            </div>
        );
    }
}

export default TutorialsList;