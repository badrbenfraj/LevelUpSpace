
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_LECTURE } from '../../../../queries';
import classNames from 'classnames';


class AddLecture extends Component {
    state = {
        name: '',
        description: '',
        pictures: [],
        selectedFile: null,
        loading: false,
        error: '',
    }



    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event, addLecture) {
        const {pictures}= this.state;
        const { name, description, selectedFile } = this.state;
        const ID = this.props.lecture.section.id;

        event.preventDefault();

        addLecture({variables:{ name, description, ID, selectedFile, pictures }});
    }

    handleFilesChange = ({ target: { files } }) => this.setState({ pictures: files });

    onCompleted = (response) => console.log("complete: ", response)

    onError = error => console.log("Error: ", error)

    render() {
        const {pictures}= this.state;
        const { name, description, selectedFile } = this.state;
        const ID = this.props.lecture.section.id;

        return (
           
            <div className="text-center border border-light p-5">
                <p className="h4 mb-4">Add New Lecture</p>
                {this.props.lecture.section.id}
                {/* <!--Card content--> */}
                <div className="card-body px-lg-5 pt-0">
                    <Mutation
                        mutation={ADD_LECTURE}
                            onCompleted={this.onCompleted}
                            onError={this.onError}
                    >
                        {(addLecture) => {
                            return (
                                <form className="text-center" onSubmit={event => this.handleSubmit(event, addLecture)}>
                                    <div className={classNames({ 'error-label': this.state.error !== '' })}>
                                        {this.state.error}
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Lecture name"
                                                value={name}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col">
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                rows="4"
                                                cols="50"
                                                placeholder="Short description"
                                                value={description}
                                                onChange={this.handleChange.bind(this)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>

                                        <div>
                                            <input type="file" onChange={this.handleFilesChange} />
                                        </div>
                                     

                                    <button
                                        className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                        type="submit"
                                    >
                                        Add Lecture
                                    </button>
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </div>
        );
    }
}

export default AddLecture;