import React from 'react';
import { Modal, Form, Input } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

const LoginModal = Form.create()(
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = { username: '', password: '' }
        this.onInputChange = this.onInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
      }

      onInputChange(fieldName, e) { this.setState({[fieldName]: e.target.value}); }

      cleanForm() {
        this.setState({
          username: '',
          password: ''
        });
        this.props.form.setFieldsValue({
          username: '',
          password: ''
        })
      }

      validateForm() {
        if (this.state.username === '' || this.state.password === '')   return;

        console.log('postluyoruz:', this.state);
        axios.post('http://localhost:5000/login', {
          username: this.state.username,
          password: this.state.password
        }).then(res => {
          console.log(res);
          this.cleanForm();
          this.props.onOk(res);
        });
      }

      closeForm() {
        this.cleanForm();
        this.props.onCancel();
      }

      render() {
        const { visible, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Login"
            okText="Log in"
            cancelText='Cancel'
            onCancel={this.closeForm}
            onOk={this.validateForm}
          >
            <Form layout="vertical">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input a username!' }]
                })(
                  <Input
                    placeholder='Username'
                    onChange={e => this.onInputChange('username', e)} />
                )}
              </FormItem>
              <FormItem >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'You forgot to enter your password!'}]
                })(
                  <Input
                    placeholder='Password'
                    type="password"
                    onChange={e => this.onInputChange('password', e)} />
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
);

export default LoginModal;