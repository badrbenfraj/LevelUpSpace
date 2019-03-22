import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import AddTutorial from '../Tutorials/addTutorial';



const { Sider, Content } = Layout;
// const SubMenu = Menu.SubMenu;

class Teacher extends Component {
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
        if (this.state.current === "AddTutorial") {
            return (
                <Layout>
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <AddTutorial />
                        </div>
                    </Content>
                </Layout>
            )
        } else if (this.state.current === "Mentors") {
            return (
                <Layout>
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

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
                        defaultSelectedKeys={['AddTutorial']}
                        mode="inline">
                        <Menu.Item key="AddTutorial">
                            <Icon type="plus" />
                            <span>Add Tutorial</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                {this.layoutContent()}
            </Layout>
        );
    }
}

export default Teacher;