import React from 'react';
import MenuItem from '../menu-item/menu-item';
import './directory.styles.scss';
import { Link } from 'react-router-dom';

class Directory extends React.Component {
	state = {
		sections: [
			{
				subtitle: 'I need',
				title: 'Design',
				id: 1,
				background:
					'https://res.cloudinary.com/ipcmobile/image/upload/v1565388713/landing-pages/marketing-request-portal/design.png',
			},
			{
				subtitle: 'I need',
				title: 'Content',
				id: 2,
				background:
					'https://res.cloudinary.com/ipcmobile/image/upload/v1565388682/landing-pages/marketing-request-portal/content.png',
			},
			{
				subtitle: "I'm going to an",
				title: 'Event',
				id: 3,
				background:
					'https://res.cloudinary.com/ipcmobile/image/upload/v1565388733/landing-pages/marketing-request-portal/event.jpg',
			},
		],
	};

	render() {
		return (
			<div className='directory-menu'>
				<Link className='logo' to='ipcmobile.com'>
					<img
						alt={'Infinte Peripherals logo'}
						src='https://res.cloudinary.com/ipcmobile/image/upload/v1586296794/logos/infinite-peripherals-logo.svg'
					/>
				</Link>
				{this.state.sections.map(({ title, subtitle, id, background }) => (
					<MenuItem
						key={id}
						title={title}
						subtitle={subtitle}
						background={background}
					/>
				))}
			</div>
		);
	}
}
export default Directory;
