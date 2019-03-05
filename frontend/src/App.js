import React from 'react';
import { Switch, Route } from 'react-router-dom'

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

const App = ({ refetch, session }) => {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact render={props => (
                    <MainLayout>
                        <Home {...props} />
                    </MainLayout>
                )} />
                <Route path="/about" render={props => (
                    <MainLayout>
                        <About {...props} />
                    </MainLayout>
                )} />
                <Route path="/courses" render={props => (
                    <MainLayout>
                        <Courses {...props} />
                    </MainLayout>
                )} />
                <Route path="/blog" render={props => (
                    <MainLayout>
                        <Blog {...props} />
                    </MainLayout>
                )} />
                <Route path="/contact" render={props => (
                    <MainLayout>
                        <Contact {...props} />
                    </MainLayout>
                )} />
                <Route path="/login" render={props => (
                    <MainLayout>
                        <Login {...props} refetch={refetch} />
                    </MainLayout>
                )} />
                <Route path="/register" render={props => (
                    <MainLayout>
                        <Register {...props} refetch={refetch} />
                    </MainLayout>
                )} />
                <Route path="/dashboard" render={props => (
                    <MainLayout>
                        <Dashboard {...props} session={session} />
                    </MainLayout>
                )} />
            </Switch>
        </React.Fragment>
    );
};

const AppComponent = withSession(App);

export default AppComponent;
