import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';


import 'antd/dist/antd.css';
import './css/index.css';
import AppComponent from './App';


const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});



ReactDOM.render(
  <ApolloProvider client={client}>
      <Router>
        <AppComponent />
      </Router>
  </ApolloProvider>,
  document.getElementById('root'));