import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
const Navbar = () => {
	const pathname = window.location.pathname;
	const path = pathname === "/" ? "home" : pathname.substr(1);
	console.log(path);
	const [activeItem, setActiveItem] = useState(path);
	const handleClick = (e, { name }) => setActiveItem(name);

	return (
		<div>
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
		</div>
	);
};

export default Navbar;
