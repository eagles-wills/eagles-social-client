import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Login, Navbar, Register } from "./component";
const App = () => {
	return (
		<Router>
			<Container>
				<Navbar />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
			</Container>
		</Router>
	);
};

export default App;
