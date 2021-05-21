import React from 'react'
import Tilt from 'react-tilt';
import face from './face.png'
import './Logo.css'

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br3 shadow-2" options={{ max: 35 }} style={{ height: 150, width: 150 }} >
				<div className="Tilt-inner pa3"> 
					<img alt='face logo' src= {face} style={{mixBlendMode:"multiply"}} /> 
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;