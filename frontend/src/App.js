import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'


import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'

import withSession from './HOC/withSession';

import Home from './pages/home';
import About from './pages/about';
import Courses from './pages/courses';
import Blog from './pages/Blog/blog';
import Contact from './pages/contact';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Dashboard from "./pages/dashboard/dashboard";
import MainLayout from './layouts/mainLayout';
import SentryError from './raven';
import UserProfile from './pages/dashboard/user_profile';
import NotFound from './pages/error_404';
import FAQ from './pages/Policies_and_conditions/faq';
import withAuth from './HOC/withAuth';
import Messages from './pages/messages/userMessages/messages';

const App = ({ refetch, session }) => {
    return (
        <SentryError>
            <Switch>
                <Route path="/" exact render={props => (
                    <MainLayout session={session}>
                        <Home {...props} />
                    </MainLayout>
                )} />
                <Route path="/about" render={props => (
                    <MainLayout session={session}>
                        <About {...props} />
                    </MainLayout>
                )} />
                <Route path="/courses" render={props => (
                    <MainLayout session={session}>
                        <Courses {...props} />
                    </MainLayout>
                )} />
                <Route path="/blog" render={props => (
                    <MainLayout>
                        <Blog {...props} />
                    </MainLayout>
                )} />
                <Route path="/contact" render={props => (
                    <MainLayout session={session}>
                        <Contact {...props} />
                    </MainLayout>
                )} />
                <Route path="/faq" render={props => (
                    <MainLayout session={session}>
                        <FAQ {...props} />
                    </MainLayout>
                )} />
                <Route path="/login" render={props => (
                    <MainLayout>
                        <Login {...props} refetch={refetch} />
                    </MainLayout>
                )} />
                <Route path="/register" render={props => (
                    <MainLayout session={session}>
                        <Register {...props} refetch={refetch} />
                    </MainLayout>
                )} />
                <Route path="/dashboard"
                    render={props =>
                        withAuth() ? (
                            <MainLayout session={session}>
                                <Dashboard {...props} session={session} />
                            </MainLayout>
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: '/login'
                                    }}
                                />
                            )
                    } />
                <Route exact path="/profile/:userName"
                    render={props =>
                        withAuth() ? (
                            <MainLayout session={session}>
                                <UserProfile {...props} session={session} />
                            </MainLayout>
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: '/login'
                                    }}
                                />
                            )
                    } />
                <Route exact path="/messages"
                    render={props =>
                        withAuth() ? (
                            <MainLayout session={session}>
                                <Messages {...props} session={session} />
                            </MainLayout>
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: '/login'
                                    }}
                                />
                            )
                    } />
                <Route path="/" render={props => (
                    <MainLayout session={session}>
                        <NotFound {...props} />
                    </MainLayout>
                )} />
            </Switch>
        </SentryError>
    );
};



const AppComponent = withSession(App);

export default AppComponent;
