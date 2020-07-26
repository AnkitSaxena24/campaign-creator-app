import React, { Component } from 'react';
import './Layout.scss';
import CampaignScreen from '../CampaignScreen/CampaignScreen';
import CampaignNameHeader from '../../Components/CampaignNameHeader/CampaignNameHeader';
import CampaignSteps from '../../Components/CampaignSteps/CampaignSteps';

class Layout extends Component {

	state = {
		step: 1
	}

	// Proceed to next step
	nextStep = () => {
		const { step } = this.state;
		this.setState({ step: step + 1 });
	}

	// Go to the previous step
	prevStep = () => {
		const { step } = this.state;
		this.setState({ step: step - 1 });
	}

	cancelCampaign = () => {
		this.setState({ step: 1 })
	}

	render() {
		return (
			<div className="layout-color">
				<div className="main-screen container">
					<div className="row">
						<div className="col-md-12">
							<CampaignNameHeader campaign_title={"Manis Ad Mobile"} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<CampaignSteps 
								curStep={this.state.step}
							/>
						</div>
					</div>
					<CampaignScreen 
						activeStep={this.state.step}
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						cancelCampaign={this.cancelCampaign}
					/>
				</div>
			</div>
		)
	}
}

export default Layout;
