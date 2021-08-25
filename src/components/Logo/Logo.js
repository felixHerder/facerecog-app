import React from 'react'
import Tilt from 'react-tilt';
import face from './charlie.jpg'
import './Logo.css'

const Logo = () => {
	return (
		<div className='absolute top-0 left-0 ml4 mt4 w4'>
			<Tilt className="Tilt br3 shadow-2" options={{ max: 35 }} style={{ height: 96, width: 96 }} >
				<div className="Tilt-inner pa3">
					<img alt='face logo' src={face} style={{ mixBlendMode: "multiply" }} />
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;