import React, { Component } from 'react';

class CourseTitle extends Component {
    render() {
        console.log(this.props)
        return this.props.TutorialTitle.map((title) => {
            return (
                <div key={title._id}>
                    <h3>{title.name}</h3>
                </div>
            )
        })
    }
}

export default CourseTitle;