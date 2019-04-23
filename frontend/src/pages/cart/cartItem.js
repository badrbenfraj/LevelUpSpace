import React, { Component } from 'react';
const styles = {
    images: {
        width: '30px'
    },
    btnDelete: {
        color: 'white',
        backgroundColor: '#072a48',
        border: 'solid',
        borderColor: '#072a48',
        width: '30px',
        cursor: 'pointer',
        borderWidth: '0.1ex'
    }
}

class CartItem extends Component {
    state = {
        cartItems: JSON.parse(localStorage.getItem('cart')),
        NewCart: JSON.parse(localStorage.getItem('NewCart') || "[]")
    }
    handleDelete = () => {
        if (this.state.cartItems) {
            var json = JSON.parse(localStorage["cart"]);
            for (let i = 0; i < json.length; i++)
                if (json[i] !== this.props.tutorial._id) {
                    const id = json.splice(i, 1);
                    if (id !== this.state.NewCart[i]) {
                        const NewCart = [...this.state.NewCart, id];
                        localStorage.setItem('NewCart', JSON.stringify(NewCart));
                        return NewCart
                    }
                }
        }
    }
    render() {
        const { images, btnDelete } = styles
        const { name, price } = this.props.tutorial
        console.log(this.handleDelete())
        console.log(localStorage.getItem('NewCart'))
        console.log(this.state.NewCart)
        console.log(this.props.tutorial)
        return (
            <tr>
                <td>
                    <img style={images} src="" alt="" />
                    <p><b>{name}</b></p>
                </td>
                <td>
                    <p><b>{price}$</b></p>
                </td>
                <td>
                    <p><button style={btnDelete} onClick={() => this.handleDelete()}>x</button></p>
                </td>
            </tr>
        );
    }
}

export default CartItem;