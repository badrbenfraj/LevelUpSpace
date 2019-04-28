import React from 'react';
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

const CartItem = (props) => {
    const { images, btnDelete } = styles
    const { name, price } = props.tutorial
    return (
        <tr>
            <td>
                <img style={images} src="" alt="" />
                <p><b>{name}</b></p>
            </td>
            <td>
                <p><b>{price} TND</b></p>
            </td>
            <td>
                <p><button style={btnDelete} onClick={props.deleteitem}>x</button></p>
            </td>
        </tr>
    );
}


export default CartItem;





   // if (this.state.cartItems) {
        //     var cartIDs = JSON.parse(localStorage["cart"]);
        //     const updatedcartIds = cartIDs.filter(id => id !== this.props.tutorial._id);
        //     this.setState(prevState => ({...prevState, cartItems: updatedcartIds}) , () => {
        //         localStorage.setItem('cart', JSON.stringify(updatedcartIds));
        //     });
        //     console.log()
        // }





    // handleDelete = () => {
    //     if (this.state.cartItems) {
    //         var json = JSON.parse(localStorage["cart"]);
    //         for (let i = 0; i < json.length; i++)
    //             if (json[i] !== this.props.tutorial._id) {
    //                 const id = json.splice(i, 1);
    //                 if (id !== this.state.NewCart[i]) {
    //                     const NewCart = [...this.state.NewCart, id];
    //                     localStorage.setItem('cart', JSON.stringify(NewCart));
    //                     return NewCart
    //                 }
    //             }
    //     }
    // }
