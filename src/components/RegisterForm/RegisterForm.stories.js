import React from 'react';
import { Register } from '../SubmitButton/SubmitButton.stories';
import { Email, Password } from '../Input/InputField.stories';

export default {
    title: 'form/Register'
}

export const RegisterForm = (args) => (
    <>
        <Email {...Email.args} />
        <Password {...Password.args} />
        <Register {...Register.args} />
    </>
)