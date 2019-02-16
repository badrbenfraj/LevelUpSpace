import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'

import Header from './components/Header/Header';

import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import Home from './components/home';
import About from './components/about';
import Courses from './components/courses';
import Blog from './components/blog';
import Contact from './components/contact';
import Footer from './components/footer/footer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/courses" component={Courses}/>
          <Route path="/blog" component={Blog}/>
          <Route path="/contact" component={Contact}/>
        </Switch>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
