import Button from './SubmitButton';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: { onClick: { action: 'clicked' } },
}

// export const Primary = () => <Button variant='primary'>Primary</Button>
// export const Secondary = () => <Button variant='secondary'>Secondary</Button>
// export const Success = () => <Button variant='success'>Success</Button>
// export const Danger = () => <Button variant='danger'>Danger</Button>

const Template = (args) => <Button {...args} />

export const Login = Template.bind({});
Login.args = {
    variant: 'primary',
    children: 'Login',
}

export const Register = Template.bind({});
Register.args = {
    variant: 'primary',
    children: 'Register',
}

// export const LongPrimaryA = Template.bind({});
// LongPrimaryA.args = {
//     ...PrimaryA.args,
//     // children: 'Long Primary Args'
// }

// export const SecondaryA = Template.bind({});
// SecondaryA.args = {
//     variant: 'secondary',
//     // children: 'Secondary Args'
// }