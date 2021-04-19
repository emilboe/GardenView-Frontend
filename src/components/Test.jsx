import React, { Component } from 'react';
import { Validators } from '../helpers/Validators';
import InputField from './Input/InputField';
import SubmitButton from './SubmitButton/SubmitButton';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: '',
            email: '',
            number: '',
         }
    }

    handleChange = (value) => {
        console.log(value)
        this.setState({ 
            firstName: value,
            email: value,
            number: value,
        })
    }

    render() { 
        return ( 
            <>
            <InputField 
                type='text'
                label='First name'
                id='firstName'
                validators={[
                    {check: Validators.required, message: 'This field is required'}
                ]}
                value={this.state.firstName} 
                onChange={this.handleChange}/>

            <InputField 
                type='email'
                label='Email'
                id='email'
                validators={[
                    {check: Validators.required, message: 'This field is required'},
                    {check: Validators.email, message: 'Please type a valid email address'}
                ]}
                value={this.state.email} 
                onChange={this.handleChange}/>

            <InputField 
                type='number'
                label='Number'
                id='number'
                validators={[
                    {check: Validators.required, message: 'This field is required'},
                    {check: Validators.number, message: 'This is not a number'}
                ]}
                value={this.state.number} 
                onChange={this.handleChange}/>

            <SubmitButton variant="primary" children="Submit" />
            </>
         );
    }
}
 
export default Test;