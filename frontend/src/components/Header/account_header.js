import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Popover, Button } from 'antd';

import Signout from '../../pages/Auth/signout';

class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.togglle = this.togglle.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            dropdownOpen: false,
            isOpen: false
        };
    }
    togglle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onMouseEnter() {
        this.setState({ dropdownOpen: true });
    }

    onMouseLeave() {
        this.setState({ dropdownOpen: false });
    }
    render() {
        const text = <span>Title</span>;
        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        return (
            <div className="topnav navbar nav navbar-expand-sm" >
                <div className="container-fluid">
                    <div className="container-fluid">
                        <Navbar color="transparent" light expand="md">
                            <Link className="logo" to="/">Levelup Space</Link>
                            <NavbarToggler onClick={this.togglle} className="navbar-dark" />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Link to="/">Home</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/about">About</Link>
                                    </NavItem>
                                    <Popover placement="bottom" title={text} content={content}>
                                        <Button>Courses</Button>
                                    </Popover>
                                    <NavItem>
                                        <Link to="/blog">Blog</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/contact">Contact</Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                    <ul className="navbar-nav nav navbar-right">
                        <li><Signout /></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;