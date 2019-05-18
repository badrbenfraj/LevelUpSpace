import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Layout, Menu } from 'antd';
import { GET_SECTIONS, GET_LECTURES, GET_QUIZZES } from '../../../queries';
import withAuth from '../../../HOC/withAuth';
import { withRouter } from 'react-router-dom';
import QuizIndex from './quiz/QuizIndex';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Course extends Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['0'],
        ID: this.props.match.params.id,
        current: '0'
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
        const t = () => {
            if (this.state.current === '0') {
                return (
                    <div>
                        <h5><strong>Welcome to LevelUp space, here u will find everything u need to learn coding from the beginning to the advance level</strong></h5>
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
                                                            <div key={lecture._id}>
                                                                {lecture.name}
                                                                <div>
                                                                    {lecture.description}
                                                                    <Query
                                                                        query={GET_QUIZZES}
                                                                        variables={{ LectureID: lecture._id }}
                                                                    >
                                                                        {(data, error, loading) => {
                                                                            const allQuizzes = data.data.getQuizzes
                                                                            if (allQuizzes) {
                                                                                const tt = () => {
                                                                                    return allQuizzes.map(e => e._id)
                                                                                }
                                                                                if (tt().length > 0) {
                                                                                    console.log(Boolean(allQuizzes))
                                                                                    console.log(allQuizzes)
                                                                                    console.log(tt().length)
                                                                                    return <QuizIndex quiz={allQuizzes} />
                                                                                }
                                                                            }
                                                                            return null
                                                                        }}
                                                                    </Query>
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
                <Layout style={{ padding: '0 0 24px 24px' }}>
                    <Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280, textAlign: 'justify'
                    }}
                    >
                        {this.layoutContent(this.props)}
                    </Content>
                    <Sider width={256} style={{ background: '#fff', padding: '10px', borderLeft: '1px solid #e8e8e8' }}>
                        <input type='text' />
                    </Sider>
                </Layout>
            </Layout>

        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Course));