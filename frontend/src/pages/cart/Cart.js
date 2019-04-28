import React, { Component } from 'react'
import { Table, Container, Button } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import withAuth from '../../HOC/withAuth'
import { GET_ALL_TUTORIALS, ADD_ORDER, GET_CURRENT_USER } from '../../queries';
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
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    redirect: false
  }
  cartTable = () => {
    return this.state.cartItems.map(item => {
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
                      return (<CartItem key={tutorial._id} tutorial={tutorial} deleteitem={() => this.handleDeleteCartItem(tutorial._id)} />)
                    }
                    return null
                  })
                )
              }
            }
            return (

              <tbody>
                {cartTutorials()}
              </tbody>
            )
          }}
        </Query>
      )
    })
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }


  handleCheckout = () => {
    if (JSON.parse(localStorage.getItem('cart'))) {
      if (this.state.redirect) {
        localStorage.removeItem('cart');
        return this.state.cartItems.map(item => {
          const TutorialID = item;
          return (
            <Query
              key={item}
              query={GET_CURRENT_USER}
            >
              {(data, loading, error) => {
                const userName = data.data.getCurrentUser.userName;
                const handleChange = (event) => {
                  const name = event.target.name;
                  const value = event.target.value;
                  this.setState({
                    [name]: value
                  });
                }
                const handleSubmit = (addOrders) => {
                  if(this.state.redirect){
                    addOrders();
                  }
                }
                return (
                  <Mutation
                    mutation={ADD_ORDER}
                    variables={{ TutorialID, userName }}
                  >
                    {(addOrders) => {
                      return (
                        <form>
                          {handleSubmit(addOrders)}
                          <input type="hidden" name="TutorialID" value={TutorialID} onChange={handleChange} />
                          <input type="hidden" name="username" value={userName} onChange={handleChange} />
                          <Redirect to="/my-courses" />
                        </form>
                      )
                    }}
                  </Mutation >
                )

              }}
            </Query>
          )
        })
        // return <Redirect to="/my-courses" />
      }
    }
  }

  handleDeleteCartItem = (itemId) => {
    const cartIDs = JSON.parse(localStorage["cart"]);
    const updatedcartIds = cartIDs.filter(id => id !== itemId);
    this.setState(prevState => ({ ...prevState, cartItems: updatedcartIds }), () => {
      localStorage.setItem('cart', JSON.stringify(updatedcartIds));
    });
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

export default withAuth(session => session && session.getCurrentUser)(withRouter(Cart));