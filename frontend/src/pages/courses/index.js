import React, { Component } from 'react';
import SearchBox from './searchBox';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { GET_ALL_TUTORIALS } from '../../queries';
import SingleCourse from './singleCourse';
import { Icon, Spin } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 44 }} />;

class Courses extends Component {
    state = {
        term: ""
    }

    handleSearch = (event) => {
        this.setState({ term: event.target.value });
    }
    render() {
        let term = this.state.term;
        function searchingFor(term) {
            return function (x) {
                return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
            };
        }
        console.log(JSON.parse(localStorage.getItem('cart')))
        return (
            <div className="container welcome-section welcome2">
                <Helmet bodyAttributes={{ class: "logInPage" }}>
                    <title>COURSES - Level Up Space</title>
                </Helmet>
                <div className="section-padding"></div>
                <SearchBox
                    handleSearch={this.handleSearch}
                />
                <div className="row">
                    <Query
                        query={GET_ALL_TUTORIALS}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <Spin indicator={antIcon} className="text-center" />
                            if (error) return <div>{error}</div>
                            console.log(loading)
                            const allTutorials = data.getAllTutorials
                            console.log(data.getAllTutorials)
                            return allTutorials.filter(searchingFor(term)).map(tutorial => <SingleCourse key={tutorial._id} tutorial={tutorial} />)
                        }}

                    </Query>
                </div>
                <div className="section-padding"></div>
            </div>
        );
    }
}

export default Courses;