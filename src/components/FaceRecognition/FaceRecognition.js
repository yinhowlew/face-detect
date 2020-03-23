import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt={''} src={imageUrl} width='500px' height='auto' />
				{/* this is a completely empty div for the box, and use css class from clarifai
				add a style attribute to set the position of the box, using our prop
				*/}
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;