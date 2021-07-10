import { gql } from "@apollo/client";

export const FETCH_ALL_POST = gql`
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
export const FETCH_POST = gql`
	query ($postId: ID!) {
		fetchPost(postId: $postId) {
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

export const DELETE_POST = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;
export const DELETE_COMMENT = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				username
				body
				createdAt
			}
		}
	}
`;

export const CREATE_COMMENT = gql`
	mutation ($postId: ID!, $body: String) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				username
				body
				createdAt
			}
			commentCount
		}
	}
`;
