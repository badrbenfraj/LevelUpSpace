import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/footer/footer';

class MainLayout extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <div className="fluid-container">
                <section className="main">
                    <Header />
                    <div className="grid">
                        {this.props.children}
                    </div>
                    <Footer />
                </section>
            </div>
        )
    }
}

export default MainLayout;