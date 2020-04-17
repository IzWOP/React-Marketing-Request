import React from 'react';

class Directory extends React.Component {
	state = {
		sections: [
			{
				title: 'Design',
				id: 1,
			},
			{
				title: 'Content',
				id: 2,
			},
			{
				title: 'Event',
				id: 3,
			},
		],
    };
    
    render(){
        return(
            <div className='directory-menu'>
            {this.state.sections.map(({title}) =>()};
            </div>
        )
    }
}
