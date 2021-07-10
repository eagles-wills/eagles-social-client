import React from "react";
import { Route, Redirect } from "react-router-dom";
import useStore from "../store";
function AuthRoute({ component: Component, ...rest }) {
	const user = useStore((state) => state.user);
	console.log(user);
	return (
		<Route
			{...rest}
			render={(props) =>
				user ? <Redirect to='/' /> : <Component {...props} />
			}
		/>
	);
}

export default AuthRoute;
