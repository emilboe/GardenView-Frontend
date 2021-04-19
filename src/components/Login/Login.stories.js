import React from 'react';
import { Login } from '../SubmitButton/SubmitButton.stories';
import { Email, Password } from '../Input/InputField.stories';

export default {
    title: 'form/Login'
}

export const LoginForm = (args) => (
    <>
        <Email {...Email.args} />
        <Password {...Password.args} />
        <Login {...Login.args} />
    </>
)