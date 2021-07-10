import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import useStore from "../store";
const LikePost = ({ post: { likeCount, likes, id } }) => {
	const [liked, setLiked] = useState(false);
	const user = useStore((state) => state.user);
	useEffect(() => {
		if (user && likes.find((like) => like.username === user.data.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [user, likes]);

	const likeButton = user ? (
		liked ? (
			<Button color='teal'>
				<Icon name='heart' />
			</Button>
		) : (
			<Button color='teal' basic>
				<Icon name='heart' />
			</Button>
		)
	) : (
		<Button color='teal' basic as={Link} to='/login'>
			<Icon name='heart' />
		</Button>
	);
	console.log(liked);
	const [likePost] = useMutation(LIKE_POST, {
		update: (proxy, result) => {
			console.log(result);
		},
		onError: (err) => console.log(err),
		variables: { postId: id },
	});

	return (
		<Popup
			content={liked ? "Unlike post" : "Like post"}
			trigger={
				<Button as='div' labelPosition='right' onClick={likePost}>
					{likeButton}
					<Label color='teal' pointing='left'>
						{likeCount}
					</Label>
				</Button>
			}
		/>
	);
};

const LIKE_POST = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id

			likes {
				id
				username
			}
			likeCount
		}
	}
`;

export default LikePost;
