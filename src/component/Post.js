import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import useStore from "../store";
import LikePost from "./LikePost";
import DeleteButton from "./DeleteButton";

const Post = ({
	post: { id, username, createdAt, body, likeCount, commentCount, likes },
}) => {
	const [seed, setSeed] = useState("");
	const user = useStore((state) => state.user);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 10000));
	}, []);
	return (
		<Card fluid>
			<Card.Content>
				<Image
					size='mini'
					floated='right'
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow()}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra className='post__content'>
				<LikePost post={{ id, likes, likeCount }} />
				<Button labelPosition='right' as={Link} to={`/posts/${id}`}>
					<Button color='blue' basic>
						<Icon name='comments' />
					</Button>
					<Label color='blue' pointing='left'>
						{commentCount}
					</Label>
				</Button>
				{user && user.data.username === username && (
					<DeleteButton postId={id} />
				)}
			</Card.Content>
		</Card>
	);
};

export default Post;
