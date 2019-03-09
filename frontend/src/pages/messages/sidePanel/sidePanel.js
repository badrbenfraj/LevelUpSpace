import React, { Component } from 'react';
import { Layout } from 'antd';
import Channels from './channels';

const {
    Sider
} = Layout;

class SidePanel extends Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh', height: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <div className="logo" />
                    <Channels />
                </Sider>
            </Layout>
        );
    }
}

export default SidePanel;



