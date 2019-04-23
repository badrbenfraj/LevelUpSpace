import React, { Component } from 'react';

class SearchBox extends Component {
    render() {
        return (
            <div className="search-result">
                <span>Showing 1-9 of total 18 courses</span>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search courses" onChange={this.props.handleSearch}/>
                    <span className="input-group-btn">
                        <button className="btn" type="button"><i className="fa fa-search"></i></button>
                    </span>
                </div>
            </div>
        );
    }
}

export default SearchBox;