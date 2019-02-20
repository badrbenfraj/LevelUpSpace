import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <div className="contact-form container">
                <form>
                    <h2 className="text-center Playfair-Display-Bold-Font">Contact</h2>       
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" required="required"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email" required="required"/>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" rows="7" placeholder="Enter Your message"></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Send</button>
                    </div>
                </form>
            </div>  
        );
    }
}

export default Contact;