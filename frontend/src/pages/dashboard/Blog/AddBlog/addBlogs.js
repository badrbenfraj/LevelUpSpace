import React, { Component } from 'react';
import { ADD_BLOGS, GET_CURRENT_USER, GET_BLOGS } from '../../../../queries';
import { message } from 'antd';
import classNames from 'classnames';
import CKEditor from "react-ckeditor-component";
import { Mutation, Query } from 'react-apollo';


const initialState = {
  title: '',
  userName: '',
  category: '',
  subject: '',
  content: '',
  error: '',

}


class Editor extends Component {


  state = {
    ...initialState,
  }

  clearState() {
    this.setState({ ...initialState })
  }

  setContent() {
    console.log("Setting content");
    this.setState({
      title: "",
      userName: "",
      category: "",
      suject: "",
      content: "",
    });
  }

  onChange(event) {
    console.log(
      "onChange fired with event info: ",
      event,
      "and data: ",
      event.editor.getData()
    );
  }

  handleEditorChange = event => {
    const content = event.editor.getData();
    this.setState({ content: content });
  };

  handleSubmit(event, addBlogs) {
    event.preventDefault();
    addBlogs().then(async ({ data }) => {
      message.success('Section added successfuly')
      this.clearState();

    }).catch(error => {
      this.setState({
        error: "couldn't add blog"
      })
    });

  }

  validateForm() {
    const { title, category, subject, content, userName } = this.state;
    const isInvalid = !title || !category || subject || content || userName;
    return isInvalid;
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { title, category, subject, content } = this.state
    return (
      <div className="text-center border border-light p-5">
        <p className="h4 mb-4">Add New Blog</p>
        {/* <!--Card content--> */}
        <div className="card-body px-lg-5 pt-0">
          <Query query={GET_CURRENT_USER}>
            {({ data }) => {
              const userName = data.getCurrentUser.userName;

              return (
                <Mutation
                  mutation={ADD_BLOGS}
                  variables={{ title, category, subject, content, userName }}
                >
                  {(addBlogs) => {

                    return (

                      <form className="text-center" onSubmit={event => this.handleSubmit(event, addBlogs)}>
                        <div className={classNames({ 'error-label': this.state.error !== '' })}>
                          {this.state.error}
                        </div>
                        <div className="form-row mb-4">
                          <div className="col">
                            <input
                              type="hidden"
                              name="userName"
                              className="form-control"
                              placeholder="author name"
                              value={userName}
                              onChange={this.handleChange.bind(this)}
                            />
                          </div>
                        </div>

                        <div className="form-row mb-4">
                          <div className="col">
                            <input
                              type="text"
                              name="title"
                              className="form-control"
                              placeholder="Blog title"
                              value={title}
                              onChange={this.handleChange.bind(this)}
                            />
                          </div>
                        </div>

                        <div className="form-row mb-4">
                          <div className="col">
                            <input
                              type="text"
                              name="category"
                              className="form-control"
                              placeholder="Blog category"
                              onChange={this.handleChange.bind(this)}
                              value={category} />
                          </div>
                        </div>

                        <div className="form-row mb-4">
                          <div className="col">
                            <textarea
                              className="form-control"
                              name="subject"
                              rows="4"
                              cols="50"
                              placeholder="Short description"
                              onChange={this.handleChange.bind(this)}
                              value={subject}
                            >
                            </textarea>
                          </div>
                        </div>

                        <CKEditor
                          name="content"
                          content={content}
                          events={{ change: this.handleEditorChange }}
                        />
                        <button
                          className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                          type="submit">
                          Add Blog
                </button>
                        <div className="media-body">
                          <div className="media-content">
                            <h4 className="media-heading">
                            </h4>
                          </div>
                        </div>
                      </form>
                    );

                  }}
                </Mutation>
              )

            }}
          </Query >

          </div>
        </div>
  
    )

  }
};


export default Editor;