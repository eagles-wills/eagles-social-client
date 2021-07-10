import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Home, Login, Navbar, Register } from "./component";
import AuthRoute from "./util/AuthRoute";
import "./App.css";
import SinglePost from "./component/SinglePost";

const App = () => {
	return (
		<Router>
			<Container>
				<Navbar />
				<Route exact path='/' component={Home} />
				<Switch>
					<AuthRoute exact path='/register' component={Register} />
					<AuthRoute exact path='/login' component={Login} />
					<Route exact path='/posts/:postId' component={SinglePost} />
				</Switch>
			</Container>
		</Router>
	);
};

export default App;
