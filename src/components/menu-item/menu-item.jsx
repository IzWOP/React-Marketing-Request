import React from 'react';
import './menu-item.styles.scss';
import { Link } from 'react-router-dom';

const MenuItem = ({ title, subtitle, background }) => {
	return (
		<Link
			className='menuItem'
			to={`${title}`}
			style={{ backgroundImage: `url(${background})` }}>
			<div className='menuOption'>
				<div className='text-area'>
					<h5>{subtitle}</h5>
					<h1>{title}</h1>
				</div>
			</div>
		</Link>
	);
};

export default MenuItem;
