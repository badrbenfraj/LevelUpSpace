import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/footer/footer';
import ProfileHeader from '../components/Header/account_header';


class MainLayout extends Component {

    render() {
        return (
            <div className="fluid-container">
                <section className="main">
                    {this.props.session && this.props.session.getCurrentUser ? <ProfileHeader /> : <Header />}
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