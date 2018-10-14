import React from 'react';
import { Modal, Form, Input } from 'antd';

import requestHandler from './../RequestHandler';


const FormItem = Form.Item;

const DepositModal = Form.create()(
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = { deposit: '' };
        this.onInputChange = this.onInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
      }

      onInputChange(fieldName, e) { this.setState({[fieldName]: e.target.value}); }

      cleanForm() {
        this.setState({ deposit: '' });
        this.props.form.setFieldsValue({ deposit: '' });
      }

      validateForm() {
        let deposit = this.state.deposit; // nanerden yuru.
        if (deposit === '' || isNaN(deposit))   return;
        deposit = parseInt(deposit);

        console.log('deposit postluyoruz:', this.state);
        requestHandler.post('/deposit', {
          username: localStorage.getItem('username'),
          amount: deposit
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
            title="Deposit!"
            okText="Confirm"
            cancelText='Cancel'
            onCancel={this.closeForm}
            onOk={this.validateForm}
          >
            <Form layout="vertical">
              <FormItem>
                {getFieldDecorator('deposit', {
                  rules: [{ required: true, message: 'Please input the deposit amount!' }]
                })(
                  <Input
                    placeholder='Enter deposit amount'
                    onChange={e => this.onInputChange('deposit', e)} />
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
);

export default DepositModal;