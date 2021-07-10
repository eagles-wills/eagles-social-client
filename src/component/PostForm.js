import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Form, Button } from "semantic-ui-react";
import { FETCH_ALL_POST } from "../util/fetchAllPost";
import useForm from "../util/useForm";
const PostForm = () => {
	const { value, handleChange, handleSubmit } = useForm(
		{ body: "" },
		postAdded,
	);
	const [createPost, { error }] = useMutation(CREATE_POST, {
		update: (proxy, result) => {
			console.log(result.data.createPost);
			let data = proxy.readQuery({ query: FETCH_ALL_POST });
			
			proxy.writeQuery({
				query: FETCH_ALL_POST,
				data: {
					fetchAllPosts: [{ data: result.data.createPost, ...data }],
				},
			});

			value.body = "";
		},
		variables: value,
		onError: (err) => console.log(err.graphQLErrors[0]),
	});

	function postAdded() {
		createPost();
	}

	return (
		<Form onSubmit={handleSubmit}>
			<h2>Create a post:</h2>
			<Form.Field>
				<Form.Input
					placeholder='Hi World!'
					name='body'
					onChange={handleChange}
					value={value.body}
					error={error ? true : false}
				/>
				<Button type='submit' color='teal'>
					Submit
				</Button>
			</Form.Field>
			{error && (
				<div className='ui error message' style={{ margin: 20 }}>
					<ul className='list'>
						<li>{error.graphQLErrors[0].extensions.errors.error}</li>
					</ul>
				</div>
			)}
		</Form>
	);
};

const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			username
			body
			createdAt
		}
	}
`;

export default PostForm;
