import React, { Component } from 'react';
import SelectChannel from '../../Components/SelectChannel/SelectChannel';
import Flight from '../../Components/Flight/Flight';
import Budget from '../../Components/Budget/Budget';
import CampaignSuccess from '../../Components/CampaignSucess/CampaignSuccess';
import Spinner from '../../Components/Spinner/Spinner';
import './CampaignScreen.scss';

import axios from 'axios';

class CampaignScreen extends Component {

	state = {
		campaignStartDate: null, 
		campaignEndDate: null,
		totalBudget: '',
		totalImpressions: '',
		mediaType: null,
		channelType: [],
		trackingType: [],
		isLoading: false
	}

	handleChannelType = (event, channelName) => {
		const { channelType } = this.state;
		if(event.target.checked) {
			this.setState({ channelType: [...channelType, channelName] })
		} else {
			this.setState({ channelType: channelType.filter(value => value !== channelName) })
		}
	}

	handleTrackingType = (event, trackingData) => {
		const { trackingType } = this.state;
		if(event.target.checked) {
			this.setState({ trackingType: [...trackingType, trackingData] })
		} else {
			this.setState({ trackingType: trackingType.filter(value => value !== trackingData) })
		}
	}

	handleMediaType = type => {
		this.setState({ mediaType: type })
	}

	handleBudgetChange = e => {
		let budget = e.target.value
		this.setState({ totalBudget: budget })
	}

	handleImpressionChange = e => {
		let impressions = e.target.value;
		this.setState({ totalImpressions: impressions })
	}

	// Setting campaign start date
	handleStartDateChange = date => {
		this.setState({ campaignStartDate: date });
	}

	// Setting campaign end date
	handleEndDateChange = date => {
		this.setState({ campaignEndDate: date })
	}

	// Resetting campaign end date, in case of start date change
	handleDateReset = () => {
		this.setState({ campaignEndDate: null })
	}

	creatCampaignData = () => {
		const {
			campaignStartDate, 
			campaignEndDate,
			totalImpressions,
			totalBudget,
			channelType,
			trackingType,
			mediaType
		} = this.state;

		let finalData = { 
			campaignStartDate, 
			campaignEndDate,
			totalImpressions,
			totalBudget,
			channelType,
			trackingType,
			mediaType
		}

		this.creatCampaign(finalData);
	}

	// Making post API call to store campaign data
	creatCampaign = (campaignData) => {
		this.setState({ isLoading: true }, () => this.props.nextStep())
		axios.post(`https://campaigncreator-534d6.firebaseio.com/create-campaign.json`, 
			campaignData
		).then((response) => {
			this.setState({ isLoading: false });
		}).catch((error) => {
			this.setState({ isLoading: false });
			console.log('Error', error.message);
		})
	}

	// Cancel campaign creation
	handleCancelCampaign = () => {
		this.setState({
			campaignStartDate: null, 
			campaignEndDate: null,
			totalImpressions: null,
			totalBudget: null,
			channelType:[],
			trackingType:[],
			mediaType: null
		}, () => this.props.cancelCampaign());
	}

	render() {

		const { 
			campaignEndDate, 
			campaignStartDate, 
			totalBudget, 
			totalImpressions, 
			mediaType, 
			trackingType, 
			channelType,
			isLoading 
		} = this.state;

		const { activeStep, nextStep, prevStep } = this.props;

		switch(activeStep) {
			case 1:
				return (
					<SelectChannel 
						nextStep={nextStep}
						handleChannelType={this.handleChannelType}
						handleTrackingType={this.handleTrackingType}
						channelType={channelType}
						trackingType={trackingType}
						handleMediaType={this.handleMediaType}
						mediaType={mediaType}
					/>
				);
			case 2:
				return (
					<Flight 
						nextStep={nextStep}
						prevStep={prevStep}
						handleStartDateChange={this.handleStartDateChange}
						handleEndDateChange={this.handleEndDateChange}
						handleDateReset={this.handleDateReset}
						campaignStartDate={campaignStartDate}
						campaignEndDate={campaignEndDate}
						handleCancelCampaign={this.handleCancelCampaign}
					/>
				);
			case 3:
				return (
					<Budget 
						nextStep={nextStep}
						prevStep={prevStep}
						totalBudget={totalBudget}
						totalImpressions={totalImpressions}
						handleBudgetChange={this.handleBudgetChange}
						handleImpressionChange={this.handleImpressionChange}
						handleCancelCampaign={this.handleCancelCampaign}
						creatCampaignData={this.creatCampaignData}
					/>
				);
			case 4:
				return isLoading ? <Spinner /> : <CampaignSuccess createNewCampaign={this.handleCancelCampaign} />
		}
	}
}

export default CampaignScreen;
