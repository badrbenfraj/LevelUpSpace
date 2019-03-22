import React, { Component } from 'react';
import AddTutorial from './addTutorial';

class AddTutorialsHome extends Component {
    state = { visible: false }

    showAddTutorial = () => {
        this.setState({
            visible: true
        });
    }
    render() {
        return (
            <div>
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Tutorials <b>List</b></h2></div>
                        <div className="col-sm-4 text-right">
                            <button type="button" onClick={this.showAddTutorial} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                        </div>
                    </div>
                </div>
                {this.state.visible ? <AddTutorial /> : null}
                
            </div>
        );
    }
}

export default AddTutorialsHome;