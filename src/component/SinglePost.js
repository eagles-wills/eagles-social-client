import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import {
	Loader,
	Grid,
	Card,
	Button,
	Image,
	Icon,
	Label,
	Form,
	Popup,
} from "semantic-ui-react";
import { CREATE_COMMENT, FETCH_POST } from "../util/fetchAllPost";
import LikePost from "./LikePost";
import useStore from "../store";

const SinglePost = ({ match, history }) => {
	const postId = match.params.postId;
	const [seed, setSeed] = useState("");
	const user = useStore((state) => state.user);
	const [comment, setComment] = useState("");
	const commentInputRef = useRef(null);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 10000));
	}, []);
	const { data } = useQuery(FETCH_POST, {
		variables: { postId },
		onError: (err) => console.log(err.networkError),
	});

	function deletePostCallback() {
		history.push("/");
	}

	const [submitComment] = useMutation(CREATE_COMMENT, {
		update: (_, result) => {
			setComment("");
			commentInputRef.current.blur();
		},
		variables: { postId, body: comment },
		onError: (err) => console.log(err.graphQLErrors[0]),
	});

	let postMarkup;
	if (!data) return (postMarkup = <Loader />);
	const fetchPost = data.fetchPost;

	if (!fetchPost) {
		postMarkup = <Loader />;
	} else {
		const {
			id,
			username,
			body,
			comments,
			likeCount,
			likes,
			commentCount,
			createdAt,
		} = fetchPost;

		postMarkup = (
			<Grid container>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							size='mini'
							floated='right'
							src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta as={Link} to={`/posts/${id}`}>
									{moment(createdAt).fromNow()}
								</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra className='post__content'>
								<LikePost post={{ id, likes, likeCount }} user={user} />
								<Popup
									inverted
									content='Comment on a post'
									trigger={
										<Button
											labelPosition='right'
											as='div'
											onClick={() => console.log("comment on post")}
										>
											<Button color='blue' basic>
												<Icon name='comments' />
											</Button>
											<Label color='blue' pointing='left'>
												{commentCount}
											</Label>
										</Button>
									}
								/>
								{user && user.data.username === username && (
									<DeleteButton
										postId={id}
										callback={deletePostCallback}
									/>
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<Form className='form__comment'>
										<p>post a comment</p>
										<div className='ui action input fluid'>
											<input
												type='text'
												placeholder='Comment....'
												name='comment'
												value={comment}
												onChange={(e) => setComment(e.target.value)}
												ref={commentInputRef}
											/>
											<button
												type='submit'
												disabled={comment.trim() === ""}
												onClick={submitComment}
											>
												submit
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{user && user.data.username === comment.username && (
										<DeleteButton
											postId={id}
											commentId={comment.id}
										/>
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta as={Link} to={`/posts/${id}`}>
										{moment(comment.createdAt).fromNow()}
									</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
};

export default SinglePost;
