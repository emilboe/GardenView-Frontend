import React from 'react';
import InputField from './InputField';
import { Validators } from '../../helpers/Validators';
import '../../index.css';

// export default {
//     title: 'form/InputField',
//     component: InputField
// }

// export const Name = () => (
//     <InputField 
//         type='text'
//         label='Name'
//         id='name'
//         validators={[
//             {check: Validators.required, message: 'This field is required'}
//         ]}
//         // value={this.state.firstName} 
//         // onChange={this.handleChange}
//         />
// )

// export const Email = () => (
//     <InputField 
//         type='email'
//         label='Email'
//         id='email'
//         validators={[
//             {check: Validators.required, message: 'This field is required'},
//             {check: Validators.email, message: 'Email is not in correct format'}
//         ]}
//         // value={this.state.firstName} 
//         // onChange={this.handleChange}
//         />
// )

// export const Small = () => <InputField size='small' placeholder='Small size' />
// export const Medium = () => <InputField size='medium' placeholder='Medium size' />
// export const Large = () => <InputField size='large' placeholder='Large size' />

// Name.storyName = 'Name Input';
// Email.storyName = 'Email Input';


////////////////////////////////////////
export default {
    title: 'form/InputField',
    component: InputField,
    parameters: {
        actions: {
            handles: ['change']
        }
    }
}

const Template = (args) => <InputField {...args} />

export const Name = Template.bind({});
Name.args = {
    type: 'text',
    label: 'Name',
    id: 'name',
    validators: [
        {check: Validators.required, message: 'This field is required'},
    ]
}

export const Email = Template.bind({});
Email.args = {
    type: 'email',
    label: 'Email',
    id: 'email',
    validators: [
        {check: Validators.required, message: 'This field is required'},
        {check: Validators.email, message: 'Please type a valid email address'}
    ],
}

export const Password = Template.bind({});
Password.args = {
    type: 'password',
    label: 'Password',
    id: 'password',
    validators: [
        {check: Validators.required, message: 'This field is required'},
        {check: Validators.password, message: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' }
    ],
}