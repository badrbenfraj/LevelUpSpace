import React, { Component } from 'react';
import SearchBox from './searchBox';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { GET_ALL_TUTORIALS } from '../../queries';
import SingleCourse from './singleCourse';

class Courses extends Component {
    state= {
        term: ""
    }

    // handleAddToCart = () => {
    //     let x = {
    //         id:this.state.ID
    //     }
    //     this.setState(state => {
    //         const cart = [...state.cart, x];
    //         return {
    //             cart,
    //             isAdded: true,
    //         };
    //     });
    // }

    handleSearch(event) {
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
                    handleSearch={this.handleSearch.bind(this)}
                />

                <Query
                    query={GET_ALL_TUTORIALS}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>fetching</div>
                        if (error) return <div>{error}</div>
                        const allTutorials = data.getAllTutorials
                        const Tutorials = () => {
                            return allTutorials.filter(searchingFor(term)).map(tutorial => <SingleCourse addToCart={this.handleAddToCart} key={tutorial._id} tutorial={tutorial} />)
                        }
                        console.log(data.getAllTutorials)
                        return (
                            <div className="row">
                                {Tutorials()}
                                {console.log(Tutorials())}
                            </div>
                        )
                    }}

                </Query>

                <div className="section-padding"></div>
            </div>
        );
    }
}

export default Courses;