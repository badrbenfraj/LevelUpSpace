import React, { Component } from 'react';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import { ADD_LECTURE } from '../../../../queries';
import { message, Progress } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const initialState = {
    name: '',
    description: '',
    error: '',
    video: '',
    progress: 0
}

class AddLecture extends Component {
    state = {
        ...initialState,
        ID: this.props.lecture.section.id
    }

    clearState() {
        this.setState({ ...initialState })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event, addLecture) {
        event.preventDefault();
        addLecture().then(async ({ data }) => {
            message.success('Lecture added successfuly')
            this.clearState();

        }).catch(error => {
            this.setState({
                error: "couldn't add lecture"
            })
        });

    }

    handleFilesChange = async (video) => {
        const data = new FormData();
        console.log(video[0])
        data.append('file', video[0]);
        data.append('upload_preset', 'LevelUpSpace');
        const res = await axios.post('https://api.cloudinary.com/v1_1/levelup/video/upload', data, {
            onUploadProgress: (progressBar) => {
                let progress = Math.round(progressBar.loaded * 100 / progressBar.total)
                this.setState({
                    progress
                })
            }
        });
        console.log(this.state.progress)
        const file = await res;
        console.log(file)
        console.log(file.data.secure_url)
        this.setState({
            video: file.data.secure_url
        });
    }

    render() {
        const { name, description, ID, progress, video } = this.state;
        console.log(this.props.lecture.section.id)
        return (
            <div className="text-center border border-light p-5">
                <p className="h4 mb-4">Add New Lecture</p>
                {this.props.lecture.section.id}
                {/* <!--Card content--> */}
                <div className="card-body px-lg-5 pt-0">
                    <Mutation
                        mutation={ADD_LECTURE}
                        variables={{ name, description, ID, video }}
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
                                                onChange={this.handleChange}
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
                                                onChange={this.handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>

                                    <div style={{ marginRight: '50px', marginLeft: '50px' }}>
                                        {/* <input type="file" onChange={this.handleFilesChange} accept="*" required /> */}
                                        <Dropzone onDrop={this.handleFilesChange} className="dropzone" accept="video/*">
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                        {this.state.progress !== 0 ? (<Progress percent={progress} />) : null}<br />
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