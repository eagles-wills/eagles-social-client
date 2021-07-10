import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";
import {
	DELETE_COMMENT,
	DELETE_POST,
	FETCH_ALL_POST,
} from "../util/fetchAllPost";

const DeleteButton = ({ postId, callback, commentId }) => {
	const [confirmOpen, setConfrmOpen] = useState(false);
	const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
	const [removerUser] = useMutation(mutation, {
		update: (proxy, result) => {
			console.log(result);
			if (!commentId) {
				const data = proxy.readQuery({ query: FETCH_ALL_POST });

				proxy.writeQuery({
					query: FETCH_ALL_POST,
					data: {
						fetchAllPosts: data.fetchAllPosts.filter(
							(p) => p.id !== postId,
						),
					},
				});
				setConfrmOpen(false);
				if (callback) {
					console.log("This is the callback button in action");
					return callback();
				}
			}
		},
		variables: { postId, commentId },
	});
	return (
		<Popup
			content={commentId ? "Delete Comment" : "Delete post"}
			trigger={
				<div>
					<Button
						color='red'
						floated='right'
						as='div'
						onClick={() => setConfrmOpen(true)}
					>
						<Icon name='trash' style={{ margin: 0 }} />
					</Button>
					<Confirm
						open={confirmOpen}
						onCancel={() => setConfrmOpen(false)}
						onConfirm={removerUser}
					/>
				</div>
			}
		/>
	);
};

export default DeleteButton;
