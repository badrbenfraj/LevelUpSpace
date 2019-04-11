import React, { Component } from 'react';
import AddTeacher from './addTeacher';
import TeachersList from './teachersList';

class Teachers extends Component {
    state = { visible: false }

    showAddTeacher = () => {
        this.setState({
            visible: true,
        });
    }
    render() {
        return (
            <div>
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Teachers <b>List</b></h2></div>
                        <div className="col-sm-4 text-right">
                            <button type="button" onClick={this.showAddTeacher} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                        </div>
                    </div>
                </div>
                {this.state.visible ? <AddTeacher /> : null}
                <TeachersList />
            </div>
        );
    }
}

export default Teachers;


