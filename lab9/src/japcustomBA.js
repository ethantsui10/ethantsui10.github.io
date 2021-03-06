import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";
import getDay from "react-datepicker";
import addDays from "react-datepicker";
import Button from "react-bootstrap/Button";


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validCCRegex = RegExp(/^(?:3[47][0-9]{13})$/);
const validDateRegex = RegExp(/(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class RegisterCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      creditCard: null,
      classname: '',
      serv: '',
      pass: '',
      errors: {
        email: '',
        creditCard: '',
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'メールが無効です！';
        break;
      case 'creditCard':
        errors.creditCard =
          validCCRegex.test(value)
            ? ''
            : 'クレジットカードは有効ではありません!';
        break;

    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.serv === '' || this.state.email === null || this.state.creditCard === null){
      this.setState({pass:'すべてのフィールドが入力されていることを確認してください' })
      this.setState({classname:'error' })

    }

    else if(this.state.errors.email !== '' || this.state.errors.creditCard !== ''){
      this.setState({pass:'すべてのフィールドが入力されていることを確認してください' })
      this.setState({classname:'error' })
    }

    else{
      this.setState({pass:"ありがとうございました！ 予約しました！"})
      this.setState({classname:'' })
    }

    console.log(this.state.pass);

  }

  handleServ = (event) => {

    this.setState({ serv: event.target.value })


  }

  handleSelect = (event) => {

    this.setState({ mech: event.target.value })


  }


  isWeekday = (date: Date) =>{
    const day = date.getDay()
    if(this.state.mech == "Ben"){
      return day !==0 && day !== 6
    }
    else if(this.state.mech == "Jorge"){
      return day!== 0 && day !==3 && day !==5
    }
    else if (this.state.mech == "Jen"){
      return day !== 1 && day !==2 && day !==4
    }
  }




  render() {
    const {errors} = this.state;
    return (

      <div className='wrapper'>
        <div className='form-wrapper'>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className = 'serviceSection'>
              <fieldset>
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={3}>
                    カスタム車両を選択してください
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select" value ={this.state.serv} onChange = {this.handleServ} defaultValue="">
                      <option value ="" disabled ={true}>選択する</option>
                      <option value ="oilChange">$35,000 - 1994日産スカイライン</option>
                      <option value ="flatTire">$45,000 - 1995 E36 BMW M3</option>
                      <option value ="paintTouchUp">$60,000 - 1991ダッジバイパー</option>
                      <option value ="engineRepair">$65,000 - 2008 Honda S2000</option>
                    </Form.Control>
                  </Form.Group>
                  </Col>
                </Form.Group>
              </fieldset>



            </div>

            <div className = 'emailSection'>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                メールアドレスを入力してください：
              </Form.Label>

              <Col sm={5}>
              <OverlayTrigger key = "right" placement = "right" overlay = {
                  <Tooltip id = {'emailtt-right'}>
                    購入に関して連絡が必要な場合に備えて、メールをお願いします。
                  </Tooltip>
                }>
              <div className='email'>
                <Form.Control type="email" name = 'email' placeholder="Eメール" onChange={this.handleChange} noValidate/>
                {errors.email.length > 0 &&
                  <span className='error'>{errors.email}</span>}
              </div>
              </OverlayTrigger>
              </Col>
            </Form.Group>
            </div>
            <div className = 'creditCardSection'>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                  クレジットカードの番号を入力して下さい：
                </Form.Label>
                <Col sm={5}>
              <OverlayTrigger key = "right" placement = "right" overlay = {
                  <Tooltip id = {'emailtt-right'}>
                    購入を確認するためにクレジットカードを要求します。
                  </Tooltip>
                }>
                <div className='creditCard'>

                  <Form.Control type="creditCard" name = 'creditCard' placeholder="375912345612345" onChange={this.handleChange} noValidate/>
                  {errors.creditCard.length > 0 &&
                    <span className='error'>{errors.creditCard}</span>}
                </div>
              </OverlayTrigger>
              </Col>
              </Form.Group>
            </div>
            <div className='submit' onClick = {this.handleSubmit}>
              <Button variant ='primary'>参加する</Button><br />
              <span className={this.state.classname}>{this.state.pass}</span>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default RegisterCustom;
