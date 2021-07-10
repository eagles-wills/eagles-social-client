import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql } from "../../../server/node_modules/apollo-server-core/dist";
import useForm from "../util/useForm";
import useStore from "../store";
const Login = ({ history }) => {
	const [errors, setErrors] = useState({});
	const { value, handleChange, handleSubmit } = useForm(
		{ username: "", password: "" },
		loginUser,
	);
	const { username, password } = value;
	const updateUser = useStore((state) => state.login);
	const [addUser, { loading }] = useMutation(LOGIN_USER, {
		update: (proxy, result) => {
			updateUser(result.data.loginUser);
			history.push("/");
		},
		onError: (err) => {
			const error = err.graphQLErrors[0];
			if (err.message === "Errors") {
				setErrors(error.extensions.errors);
			} else {
				setErrors(error.extensions.error.errors);
			}
		},
		variables: value,
	});
	function loginUser() {
		addUser();
	}

	return (
		<div>
			<Form
				noValidate
				onSubmit={handleSubmit}
				className={loading ? "loading" : ""}
			>
				<h2>Login</h2>
				<Form.Input
					placeholder='Enter username here...'
					label='Username'
					name='username'
					value={username}
					error={errors.username ? true : false}
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

				<Button type='submit' primary>
					Login
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className='ui message error container'>
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

const LOGIN_USER = gql`
	mutation loginuser($username: String!, $password: String!) {
		loginUser(username: $username, password: $password) {
			id
			username
			email
			token
			createdAt
		}
	}
`;

export default Login;
