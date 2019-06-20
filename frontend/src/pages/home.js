import React, { Component } from 'react';
import { Carousel } from 'antd';
import '../css/style.css';


class Home extends Component {
    render() {
        return (
            <div>
                <Carousel autoplay >
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>

            </div>
        );
    }
}

export default Home;