import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Teachers from './teachersList/teachers';
import Mentors from './mentorsList/mentors';

const { Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class Admin extends Component {
    state = {
        collapsed: false,
        current: '1',
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    layoutContent = () => {
        if (this.state.current === "Teachers") {
            return (
                <Layout>
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Teachers />
                        </div>
                    </Content>
                </Layout>
            )
        }else if (this.state.current === "Mentors") {
            return(
                <Layout>
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Mentors />
                        </div>
                    </Content>
                </Layout>
            )
        }
    }
    render() {
        console.log(this.state.current)
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark"
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>Trainers</span></span>}
                        >
                            <Menu.Item key="Teachers">Teachers</Menu.Item>
                            <Menu.Item key="Mentors">Mentors</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                {this.layoutContent()}
            </Layout>
        );
    }
}

export default Admin;