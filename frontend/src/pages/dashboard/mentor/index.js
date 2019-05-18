import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Claims from '../Claim/claim';
import AddBlogsHome from '../Blog/AddBlog';


const { Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class Mentor extends Component {
    state = {
        collapsed: false,
        current: 'Claims',
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
    layoutContent = (props) => {
        if (this.state.current === "Claims") {
            return (
                <Claims  {...props} />
            )
        } else if (this.state.current === "addBlogs") {
            return (
                <AddBlogsHome />
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
                            <Menu.Item key="Claims">
                                Claims
                            </Menu.Item>
                            <Menu.Item key="addBlogs">
                                <Icon type="edit" />
                                <span> Blog</span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.layoutContent(this.props)}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Mentor;