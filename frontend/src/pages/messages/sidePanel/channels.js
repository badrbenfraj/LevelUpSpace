import React, { Component } from 'react';
import { Icon, Modal, Button } from 'antd';
import FormikModalChannel from './modalChannel';


class Channels extends Component {
    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        return (
            <div>

                <Button type="primary" onClick={this.showModal}>
                    <Icon type="plus" /> Add Channel
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <FormikModalChannel />
                </Modal>
            </div>
        );
    }
}


export default Channels;