import React from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

import requestHandler from './../RequestHandler';


const FormItem = Form.Item;
const Option = Select.Option;
const ADDRESS_OPTIONS = [
    'ARNAVUTKOY', 'SULTANGAZI', 'CATALCA', 'SILE', 'SULTANBEYLI', 'SILIVRI', 'ADALAR', 'ESENLER',
    'SANCAKTEPE', 'CEKMEKOY', 'GAZIOSMANPASA', 'BUYUKCEKMECE', 'ESENYURT', 'GUNGOREN', 'AVCILAR',
    'KUCUKCEKMECE', 'BAGCILAR', 'TUZLA', 'EYUP', 'BEYLIKDUZU', 'KAGITHANE', 'BEYKOZ', 'ZEYTINBURNU',
    'BAYRAMPASA', 'BASAKSEHIR', 'KARTAL', 'PENDIK', 'BAHCELIEVLER', 'UMRANIYE', 'MALTEPE', 'ATASEHIR',
    'BEYOGLU', 'SARIYER', 'FATIH', 'USKUDAR', 'BAKIRKOY', 'BESIKTAS', 'KADIKOY', 'SISLI'
];
const PostModal = Form.create()(
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = { 
            room: '',
            living: '',
            age: '',
            size: '',
            initialBid: '',
            buildingType: '',
            postType: '',
            address: '',
            estimate: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
        this.onGetEstimateClicked = this.onGetEstimateClicked.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);
      }

      onInputChange(fieldName, e) {
        let value = e.target.value;
        if (fieldName === 'gsm' && value.length === 1 && value[0] != '+') {
          value = '+90' + value;
        }
        this.setState({[fieldName]: value});
        return value;
      }

      onOptionChange(fieldName, value) { this.setState({[fieldName]: value});}

      onGetEstimateClicked() {
          console.log('POSTMODAL. onGetEstimateClicked: state', this.state);
          requestHandler.post('/estimate',{
            room: parseInt(this.state.room),
            saloon: parseInt(this.state.living),
            address: this.state.address,
            building_type: this.state.buildingType,
            post_type: this.state.postType,
            size: parseInt(this.state.size),
            age: parseInt(this.state.age)
          }).then(e =>{
              this.setState({estimate: e.data.estimation});
          })
      }

      cleanForm() {
        this.setState({
          username: '',
          password: '',
        });
        this.props.form.setFieldsValue({
          username: '',
          password: '',
        })
      }

      validateForm() {        
        requestHandler.post('/posting', {
            room: parseInt(this.state.room),
            saloon: parseInt(this.state.living),
            address: this.state.address,
            building_type: this.state.buildingType,
            post_type: this.state.postType,
            size: parseInt(this.state.size),
            age: parseInt(this.state.age),
            username: localStorage.getItem('username'),
            starting_bid: parseInt(initialBid)
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
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
          let addressOptions = ADDRESS_OPTIONS.map( (option, i) =>(<Option key={i} value={option}>{option}</Option>));
        return (
          <Modal
            visible={visible}
            title="Create a post!"
            okText="Submit Your Post"
            cancelText='Cancel'
            onCancel={this.closeForm}
            onOk={this.validateForm}
          >
            <Form layout="vertical">
              <FormItem {...formItemLayout} label="Room">
                {getFieldDecorator('room', {
                  rules: [{ required: true, message: 'Room number missing!' }]
                })(
                  <Input
                    placeholder='Enter a number' 
                    onChange={e => this.onInputChange('room', e)} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Living room" >
                {getFieldDecorator('living', {
                  rules: [{ required: true, message: 'Number of living rooms missing!'}],
                  getValueFromEvent: e => this.onInputChange('living', e)
                })(
                  <Input
                    placeholder='Enter a number'
                    onChange={e => this.onInputChange('gsm', e)} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Post Type">
                    <Select onChange={e => this.onOptionChange('postType', e)}>
                <Option value="Kiralik">For Rent</Option>
                <Option value="Satilik">For Sale</Option>
                </Select>
              </FormItem>
              <FormItem {...formItemLayout} label="Building Type">
                    <Select onChange={e => this.onOptionChange('buildingType', e)}>
                        <Option value="Daire">Daire</Option>
                        <Option value="Residans">Residans</Option>
                        <Option value="Mustakil Ev">Mustakil Ev</Option>
                        <Option value="Villa">Villa</Option>
                    </Select>
              </FormItem>
              <FormItem {...formItemLayout} label="Address">
                    <Select onChange={e => this.onOptionChange('address', e)}>
                        {addressOptions}
                    </Select>
              </FormItem>
              <FormItem {...formItemLayout} label="Size in sq meters">
                {getFieldDecorator('size', {
                  rules: [{ required: true, message: 'Size field missing!'}]
                })(
                  <Input
                    placeholder='Enter a number.'
                    onChange={e => this.onInputChange('size', e)} />  
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Building's Age">
                {getFieldDecorator('age', {
                  rules: [{ required: true, message: 'Age field missing!'}]
                })(
                  <Input
                    placeholder='Enter a number.'
                    onChange={e => this.onInputChange('age', e)} />  
                )}
              </FormItem>
              <Button
                style={{
                    marginBottom: 8,
                    marginRight: 16
                }}
                onClick={this.onGetEstimateClicked}
                > Get an Estimate </Button> <label>{this.state.estimate}</label>
              <FormItem {...formItemLayout} label="Initial bid">
                {getFieldDecorator('initialBid', {
                  rules: [{ required: true, message: 'Age field missing!'}]
                })(
                  <Input
                    placeholder='Enter a number.'
                    onChange={e => this.onInputChange('initialBid', e)} />  
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
);
/* 

*/
export default PostModal;