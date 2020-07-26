import React from 'react';
import './CampaignNameHeader.scss';

const campaignNameHeader = props => {
	return (
		<div className="p-4">
			<div className="row">
				<div className="col-md-12">
					<h6>CAMPAIGN NAME</h6>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<h2>{props.campaign_title}</h2>
				</div>
			</div>
		</div>
	);
}

export default campaignNameHeader;
