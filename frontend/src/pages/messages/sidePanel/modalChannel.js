import React from 'react';
import {withFormik, Field, Form} from 'formik'

const ModalChannel = () => {
    return (
        <Form>
            <Field type="text" name="ChannelName" placeholder="Enter Channel Name" /><br/>
            <Field type="text" name="ChannelDetail" placeholder="Enter Channel Detail" />
            <button type="submit">Create</button>
        </Form>
    );
};

const FormikModalChannel = withFormik({
    enableReinitialize: true,
    mapPropsToValues(){
        return{
            ChannelName: '',
            ChannelDetail: ''
        }
    },
    handleSubmit(values){
        console.log(values);
        
    }
})(ModalChannel)

export default FormikModalChannel;