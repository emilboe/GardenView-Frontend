import React, { Component } from 'react';
import './InputField.css';

// This is a conrolled input field, because we need to store
// what the user is typing in the state.

// -------------- PROPS --------------
// value, onChange, label, type, id, name, validators

import { validateInput } from '../../actions/Validators';

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: '',
            error: null,
            errorClass: '',
         }
    };

    handleChange = (event) => {
        const error = validateInput(this.props.validators, event.target.value);
        this.setState({ 
            value: event.target.value,
            error: error.message
        });
        // this.props.onChange(event.target.value)
    }

    render() { 
        return ( 
            <div className="inputField">
                {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
                <input 
                    className={`input ${this.state.error && 'error'}`}
                    type={this.props.type}
                    value={this.state.value}
                    name={this.props.name}
                    id={this.props.id}
                    onChange={this.handleChange}
                />
                {this.state.error && <span className="errorMessage">{this.state.error}</span>}
            </div>
         );
    };
};

InputField.defaultProps = {
    value: '',
    label: '',
    type: 'text',
}
 
export default InputField;