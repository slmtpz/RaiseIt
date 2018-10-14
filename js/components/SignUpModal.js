import React from 'react';
import { Modal, Form, Input } from 'antd';

import requestHandler from './../RequestHandler';


const FormItem = Form.Item;

const SignUpModal = Form.create()(
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = { username: '', password: '' }
        this.onInputChange = this.onInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
      }

      onInputChange(fieldName, e) {
        let value = e.target.value;
        console.log(fieldName, value, value.length);
        if (fieldName === 'gsm' && value.length === 1 && value[0] != '+') {
          value = '+90' + value;
        }
        this.setState({[fieldName]: value});
        return value;
      }

      cleanForm() {
        this.setState({
          username: '',
          password: '',
          gsm: ''
        });
        this.props.form.setFieldsValue({
          username: '',
          password: '',
          gsm: ''
        })
      }

      validateForm() {
        if (this.state.username === '' || this.state.password === '')   return;
        
        
        console.log('signup postluyoruz', this.state);
        requestHandler.post('/register', {
          username: this.state.username,
          password: this.state.password,
          gsm: this.state.gsm
        }).then(res => {
          this.cleanForm();
          this.props.onOk(res.data);
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
            title="Sign Up Now!"
            okText="Sign Up"
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
                {getFieldDecorator('gsm', {
                  rules: [{ required: true, message: 'You forgot to enter your gsm!'}],
                  getValueFromEvent: e => this.onInputChange('gsm', e)
                })(
                  <Input
                    placeholder='+90'
                    onChange={e => this.onInputChange('gsm', e)} />
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

export default SignUpModal;