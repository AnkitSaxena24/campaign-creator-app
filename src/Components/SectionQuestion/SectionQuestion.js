import React from 'react';
import InfoIcon from '@material-ui/icons/Info';


const sectionQuestion = props => {
	return(
		<div className="d-flex flex-row">
			<span className="mr-1"><InfoIcon color="primary" /></span>
			<p>{props.question}</p>
		</div>
	)
}

export default sectionQuestion;
