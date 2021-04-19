import './SubmitButton.css';

const Button = (props) => {
    const { variant = 'primary', children, ...rest } = props
    return (
        <button type="submit" className={`button ${variant}`} {...rest}>
            {children}
        </button>
    );
}

export default Button;