import React, { Component } from 'react'
import { Table, Container, Button } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo';
import { GET_ALL_TUTORIALS } from '../../queries';
import CartItem from './cartItem';


const styles = {
  centerh1: {
    textAlign: 'center',
    padding: '30px'
  },
  checkoutBtn: {
    textAlign: 'right'
  },
  containerPadding: {
    paddingTop: '70px',
    paddingBottom: '150px'
  }
}

class Cart extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem('cart')),
    redirect: false
  }
  cartTable = () => {
    if (this.state.cartItems) {
      return (
        this.state.cartItems.map(item => {
          return (
            <Query
              key={item}
              query={GET_ALL_TUTORIALS}
              pollInterval={500}
            >
              {({ data, loading, error }) => {
                const AllTut = data.getAllTutorials;
                const cartTutorials = () => {
                  if (AllTut !== undefined) {
                    return (
                      AllTut.map(tutorial => {
                        if (tutorial._id === item) {
                          return (<CartItem key={tutorial._id} tutorial={tutorial} />)
                        }
                        return null
                      })
                    )
                  }
                }
                return (

                  <tbody>
                    {cartTutorials()}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <b>Total</b>
                      </td>
                    </tr>
                  </tbody>
                )
              }}
            </Query>
          )
        })
      )
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  handleCheckout = () => {
    if(this.state.cartItems){
      if (this.state.redirect) {
        localStorage.removeItem('cart');
        return <Redirect to="/my-courses" />
      }
    }
  }

  render() {
    const { centerh1, checkoutBtn, containerPadding } = styles
    console.log(this.state.cartItems)
    return (
      <div style={containerPadding}>
        <Helmet bodyAttributes={{ class: "logInPage" }}>
          <title>Cart - Level Up Space</title>
        </Helmet>
        <Container>
          <h1 style={centerh1}>Cart</h1>
          <Table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            {this.cartTable()}
          </Table>
          <div style={checkoutBtn}>
            <Button onClick={this.setRedirect}>Check out</Button>
            {this.handleCheckout()}
          </div>
        </Container>
      </div>
    );
  }
}

export default Cart;