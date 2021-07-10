import React from "react";
import { useQuery } from "@apollo/client";
import { Grid, Loader, Transition } from "semantic-ui-react";
import Post from "./Post";
import useStore from "../store";
import PostForm from "./PostForm";
import { FETCH_ALL_POST } from "../util/fetchAllPost";

const Home = () => {
	const user = useStore((state) => state.user);

	const { data, loading, error } = useQuery(FETCH_ALL_POST);

	if (data) console.log(data);
	if (error) console.log(error.message);

	return (
		<Grid columns={3}>
			<Grid.Row centered>
				<h2 className='home__heading'>Recent Posts</h2>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column>
						{" "}
						<PostForm />
					</Grid.Column>
				)}
				{loading ? (
					<Loader />
				) : (
					data.fetchAllPosts.map((post) => (
						<Transition key={post.id}>
							<Grid.Column
								key={post.id}
								style={{ marginBottom: "20px" }}
							>
								<Post post={post} />
							</Grid.Column>
						</Transition>
					))
				)}
			</Grid.Row>
		</Grid>
	);
};
export default Home;
