import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';

class Login extends Component {
    render() {
        return (
            <div >
                <div className="breadcrumbs">
                    <div className="container">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                            <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                            Login
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="login-form">
                    <form>
                        <h2 className="text-center">Log in</h2>       
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" required="required"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" required="required"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Log in</button>
                        </div>
                        <div className="clearfix">
                            <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label>
                            <Link to="/forgot-password" className="pull-right" style={{float: 'right'}}>Forgot Password?</Link>
                        </div>        
                    </form>
                </div> 
            </div> 
        );
    }
}

export default Login;