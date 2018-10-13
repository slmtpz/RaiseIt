import React from 'react';
import { Icon, Modal, Form, Input } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = { username: '', password: '' }
        this.onInputChange = this.onInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
      }

      onInputChange(fieldName, e) { this.setState({[fieldName]: e.target.value}); }

      validateForm() {
        if (this.state.username === '' || this.state.password === '')   return;
        axios.post('localhost:5000/register', {
          username: this.state.username,
          password: this.state.password
        })
      }

      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Sign Up Now!"
            okText="Sign Up"
            cancelText='Cancel'
            onCancel={onCancel}
            onOk={this.validateForm}
          >
            <Form layout="vertical">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input a username!' }]
                })(
                  <Input placeholder='Username' onChange={e => this.onInputChange('username', e)} />
                )}
              </FormItem>
              <FormItem >
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'You forgot to enter your password!'}]
                })(
                  <Input placeholder='Password' type="password" onChange={e => this.onInputChange('password', e)} />  
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
);

export default CollectionCreateForm;