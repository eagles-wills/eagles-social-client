import React, { useEffect, useState } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

const Post = ({
	post: { id, username, createdAt, body, likeCount, commentCount },
}) => {
	const [seed, setSeed] = useState("");
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
				<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button as='div' labelPosition='right'>
					<Button color='teal' basic>
						<Icon name='heart' />
						Like
					</Button>
					<Label color='teal' pointing='left'>
						{likeCount}
					</Label>
				</Button>
				<Button as='div' labelPosition='right'>
					<Button color='blue' basic>
						<Icon name='comments' />
						Comment
					</Button>
					<Label color='blue' pointing='left'>
						{commentCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
};

export default Post;
