import React from "react";
import { Form, Button } from "semantic-ui-react";
import useForm from "../util/useForm";
const Register = () => {
	const initialState = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	};
	const { value, handleChange, handleSubmit } = useForm(initialState);

	const { username, email, password, confirmPassword } = value;

	return (
		<div>
			<Form noValidate onSubmit={handleSubmit}>
				<h2>Register</h2>
				<Form.Input
					placeholder='Enter username here...'
					label='Username'
					name='username'
					value={username}
					onChange={handleChange}
				/>
				<Form.Input
					placeholder='Enter email here...'
					label='Email'
					name='email'
					value={email}
					onChange={handleChange}
				/>
				<Form.Input
					placeholder='Enter password here...'
					label='Password'
					name='password'
					value={password}
					onChange={handleChange}
				/>
				<Form.Input
					placeholder='Re enter password...'
					label='Confirm Password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
				/>
				<Button type='submit' primary>
					Register
				</Button>
			</Form>
		</div>
	);
};

export default Register;
