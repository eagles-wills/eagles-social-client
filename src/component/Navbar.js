import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import useStore from "../store";
const Navbar = () => {
	const user = useStore((state) => state.user);
	const logout = useStore((state) => state.logout);

	const pathname = window.location.pathname;
	const path = pathname === "/" ? "home" : pathname.substr(1);

	const [activeItem, setActiveItem] = useState(path);
	const handleClick = (e, { name }) => setActiveItem(name);
	console.log(user);

	const navbar = user ? (
		<Menu pointing secondary>
			<Menu.Item name={user.data.username} active as={Link} to='/' />
			<Menu.Menu position='right'>
				<Menu.Item name='logout' onClick={logout} />
			</Menu.Menu>
		</Menu>
	) : (
		<Menu pointing secondary>
			<Menu.Item
				name='home'
				active={activeItem === "home"}
				onClick={handleClick}
				as={Link}
				to='/'
			/>
			<Menu.Menu position='right'>
				<Menu.Item
					name='register'
					active={activeItem === "register"}
					onClick={handleClick}
					as={Link}
					to='/register'
				/>
				<Menu.Item
					name='login'
					active={activeItem === "login"}
					onClick={handleClick}
					as={Link}
					to='/login'
				/>
			</Menu.Menu>
		</Menu>
	);

	return navbar;
};

export default Navbar;
