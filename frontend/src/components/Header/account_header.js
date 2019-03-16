import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { Avatar, Icon } from 'antd';

import Signout from '../../pages/Auth/signout';

class ProfileHeader extends Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to={`/profile/${this.props.session.getCurrentUser.userName}`}>Profile</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3"><Signout /></Menu.Item>
            </Menu>
        );
        console.log(this.props.session.getCurrentUser.isUser)
        return (
            <div className="topnav navbar nav navbar-expand-sm" >
                <div className="container-fluid">
                    <ul>
                        <li><Link className="logo" to="/dashboard"><strong>Levelup Space</strong></Link></li>
                    </ul>
                    <ul>
                        <li><strong><Link to="/shopping-cart"><Icon type="shopping-cart" style={{ fontSize: '22px', }} theme="outlined"/></Link></strong></li>
                        <li><strong><Link to="/messages"><Icon type="message" style={{ fontSize: '22px', }} theme="outlined"/></Link></strong></li>
                        <li>

                            <Dropdown overlay={menu} trigger={['click']} className="navbar-right">
                                <Link className="ant-dropdown-link" to="#">
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                                    <strong> {this.props.session.getCurrentUser.userName}</strong>
                                </Link>
                            </Dropdown>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}

export default ProfileHeader;