import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-boost';
import { setContext } from "apollo-link-context";
import { RetryLink } from 'apollo-link-retry';
import { createUploadLink } from "apollo-upload-client";


import 'antd/dist/antd.css';
import './css/index.css';
import AppComponent from './App';

const cache = new InMemoryCache();
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem("token")
  }
}));

const retryLink = new RetryLink();
const uploadLink = createUploadLink({
  uri: "http://localhost:3001/graphql"
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, retryLink, uploadLink])
});

// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql',
//   request: operation => {
//     const token = localStorage.getItem("token");
//     operation.setContext({
//       headers: {
//         authorization: token
//       }
//     });
//   }
// });



ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <AppComponent />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'));