import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Layout, Menu } from 'antd';
import { GET_SECTIONS, GET_LECTURES } from '../../../queries';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Course extends Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['0'],
        ID: this.props.match.params.id,
        current: '0',
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });

    }
    layoutContent = (props) => {
        const t = ()=>{
            if (this.state.current === '0') {
                return (
                    <div>
                        hello 0
                    </div>
                )
            }
        }
        return (
            <div>
                <Query
                    query={GET_SECTIONS}
                    variables={{ TutorialID: this.state.ID }}
                >
                    {({ data, loading, error }) => {
                        if (loading) return <div>fetching</div>
                        if (error) return <div>{error}</div>
                        const AllSections = data.getSections;
                        if (AllSections) {
                            return AllSections.map((section, i) => {
                                return (
                                    <Query
                                        key={i}
                                        query={GET_LECTURES}
                                        variables={{ SectionID: section._id }}
                                        pollInterval={500}
                                    >
                                        {({ data }) => {
                                            const AllLectures = data.getLectures;
                                            console.log(data)
                                            if (AllLectures) {
                                                console.log(this.state.current)
                                                return AllLectures.map(lecture => {
                                                    if (this.state.current === lecture._id) {
                                                        return (
                                                            <div key={lecture._id}>{
                                                                lecture.name}
                                                                <div>
                                                                    {lecture.desciption}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                })
                                            }
                                            return null
                                        }}
                                    </Query>
                                )
                            })
                        }
                        return null
                    }}
                </Query>
                {t()}
            </div>
        )

    }
    render() {
        const { ID } = this.state;
        return (
            <Layout>
                <Sider width={256} style={{ background: '#fff' }}>
                    <Query
                        query={GET_SECTIONS}
                        variables={{ TutorialID: ID }}
                    >
                        {({ data, loading, error }) => {
                            if (loading) return <div>fetching</div>
                            if (error) return <div>{error}</div>
                            const AllSections = data.getSections;
                            const AllTutorials = () => {
                                if (AllSections) {
                                    return AllSections.map((section, i) => {
                                        return (
                                            <Query
                                                key={i}
                                                query={GET_LECTURES}
                                                variables={{ SectionID: section._id }}
                                                pollInterval={500}
                                            >
                                                {({ data }) => {
                                                    const AllLectures = data.getLectures;
                                                    console.log(data)
                                                    const AllTutorials = () => {
                                                        if (AllLectures) {
                                                            return (
                                                                <Menu
                                                                    mode="inline"
                                                                    key={section._id}
                                                                    onClick={this.handleClick}
                                                                    openKeys={this.state.openKeys}
                                                                    onOpenChange={this.onOpenChange}
                                                                    selectedKeys={[this.state.current]}
                                                                    style={{ width: 256 }}
                                                                >
                                                                    <SubMenu key={i} title={<span>{section.name} </span>}>
                                                                        {AllLectures.map((lecture) => {
                                                                            return <Menu.Item key={lecture._id}>{lecture.name}</Menu.Item>
                                                                        })
                                                                        }
                                                                    </SubMenu>
                                                                </Menu>
                                                            )
                                                        }
                                                        return null
                                                    }
                                                    return AllTutorials()
                                                }}
                                            </Query>
                                        )
                                    })
                                }
                            }
                            return AllTutorials()
                        }}
                    </Query>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                    }}
                    >
                        {this.layoutContent(this.props)}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Course;