import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid, Loader } from "semantic-ui-react";
import Post from "./Post";

const Home = () => {
	const { data, loading, error } = useQuery(FETCH_ALL_POST);

	if (data) console.log(data);
	if (error) console.log(error.message);
	return (
		<Grid columns={3}>
			<Grid.Row centered>
				<h2 className='home__heading'>Recent Posts</h2>
			</Grid.Row>
			<Grid.Row>
				{loading ? (
					<Loader />
				) : (
					data.fetchAllPosts.map((post) => (
						<Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
							<Post post={post} />
						</Grid.Column>
					))
				)}
			</Grid.Row>
		</Grid>
	);
};

const FETCH_ALL_POST = gql`
	{
		fetchAllPosts {
			id
			username
			body
			likes {
				username
			}
			comments {
				username
				body
				id
				createdAt
			}
			likeCount
			commentCount
			createdAt
		}
	}
`;
export default Home;
