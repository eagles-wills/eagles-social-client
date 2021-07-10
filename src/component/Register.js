import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import useForm from "../util/useForm";
import useStore from "../store";
const Register = ({ history }) => {
	const initialState = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	};
	const updateUser = useStore((state) => state.login);
	const [errors, setErrors] = useState({});
	const { value, handleChange, handleSubmit } = useForm(
		initialState,
		registerUser,
	);
	function registerUser() {
		addUser();
	}

	const { username, email, password, confirmPassword } = value;
	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update: (proxy, result) => {
			console.log(result);
			updateUser(result.data.registerUser);
			history.push("/");
		},
		variables: value,
		onError: (err) => {
			console.log(err.graphQLErrors[0]);
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
	});

	return (
		<div>
			<Form
				noValidate
				onSubmit={handleSubmit}
				className={loading ? "loading" : ""}
			>
				<h2>Register</h2>
				<Form.Input
					placeholder='Enter username here...'
					label='Username'
					name='username'
					value={username}
					error={errors.username ? true : false}
					onChange={handleChange}
				/>
				<Form.Input
					placeholder='Enter email here...'
					label='Email'
					name='email'
					value={email}
					error={errors.email ? true : false}
					onChange={handleChange}
				/>
				<Form.Input
					placeholder='Enter password here...'
					type='password'
					label='Password'
					name='password'
					error={errors.password ? true : false}
					value={password}
					onChange={handleChange}
				/>
				<Form.Input
					placeholder='Re enter password...'
					type='password'
					label='Confirm Password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
				/>
				<Button type='submit' primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className='ui message error'>
					<ul className='list'>
						{Object.values(errors).map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
const REGISTER_USER = gql`
	mutation registerUser(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		registerUser(
			username: $username
			email: $email
			password: $password
			confirmPassword: $confirmPassword
		) {
			id
			username
			email
			token
			createdAt
		}
	}
`;
export default Register;
