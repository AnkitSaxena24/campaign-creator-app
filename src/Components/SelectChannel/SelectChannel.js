import React, { Component } from 'react';
import './SelectChannel.scss';
import SelectionQuestion from '../SectionQuestion/SectionQuestion';
import Checkbox from '@material-ui/core/Checkbox';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import TvIcon from '@material-ui/icons/Tv';
import RadioIcon from '@material-ui/icons/Radio';
import AirplayIcon from '@material-ui/icons/Airplay';

const MEDIA_TYPE = [
	{
		media_name: 'Digital', 
		media_value:'digital', 
		icon: <MobileScreenShareIcon fontSize="large" />, 
		coming_soon: false
	},
	{
		media_name: 'Out of Home', 
		media_value:'out_of_home', 
		icon: <AirplayIcon fontSize="large" />, 
		coming_soon: false
	},
	{
		media_name: 'TV', 
		media_value:'tv',
		icon: <TvIcon fontSize="large" />, 
		coming_soon: true
	},
	{
		media_name: 'Radio', 
		media_value:'radio', 
		icon: <RadioIcon fontSize="large" />,
		coming_soon: true
	},
]

const TYPES_OF_CHANNEL = [
	{channel_name: 'In App', value: 'in_app'},
	{channel_name: 'Mobile Web', value: 'mobile_web'},
	{channel_name: 'Desktop', value: 'desktop'},
	{channel_name: 'Social Media', value: 'social_media'},
	{channel_name: 'Paid Search', value: 'paid_search'},
	{channel_name: 'Email', value: 'email'},
	{channel_name: 'Lead Form', value: 'lead_form'},
	{channel_name: 'Landing Page', value: 'landing_page'},
];

const TRACKING_OPTIONS = [
	{attribution_type: 'Visits', value: 'visits'},
	{attribution_type: 'Transactions', value: 'transactions'}
];

class SelectChannel extends Component {

	setActiveMedia = mediaType => {
		this.props.handleMediaType(mediaType);
	}

	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	}

	handleChannelType = (event, channelName) => {
		this.props.handleChannelType(event, channelName)
	}

	handleTrackingOptions = (event, trackingOption) => {
		this.props.handleTrackingType(event, trackingOption)
	}

	getMediaTypes = () => {
		let mediaTypes = [];

		MEDIA_TYPE.map((type, index) => {
			mediaTypes.push(
				<button 
					className={`btn btn-primary-outline media-type mr-4 ${type.coming_soon ? 'coming-soon' : ''}`}
					onClick={()=>this.setActiveMedia(type.media_name)}
					disabled={type.coming_soon ? true : false} 
					key={index}
				>
					<div  
						className={`${this.props.mediaType === type.media_name ? 'active' : ''}`}
						key={index}
					>
						<div className="icon">
							{type.icon}
						</div>
						<div className="pt-2">
							<small className="text-muted">{type.media_name}</small>
						</div>
					</div>
				</button>
			);
		});

		return mediaTypes;
	}

	getTypesOfChannel = () => {
		let channels = [];

		TYPES_OF_CHANNEL.map((channel, index) => {
			channels.push(
				<div className="col-md-3" key={index}>
					<Checkbox 
						color="primary"
						onClick={(e) => this.handleChannelType(e, channel.channel_name)}
						checked={this.props.channelType.indexOf(channel.channel_name) !== -1}
					/>
					<small>{channel.channel_name}</small>
				</div>
			)
		});

		return channels;
	}

	getTrackingOptions = () => {
		let trackingOptions = [];	

		TRACKING_OPTIONS.map((option, index) => {
			trackingOptions.push(
				<div className="col" key={index}>
					<Checkbox 
						color="primary" 
						onClick={(e) => this.handleTrackingOptions(e, option.attribution_type)}
						checked={this.props.trackingType.indexOf(option.attribution_type) !== -1}
					/>
					<small>{option.attribution_type}</small>
				</div>
			)
		});

		return trackingOptions;
	}

	render() {

		const { mediaType, channelType, trackingType } = this.props;

		return (
			<div className="row">
				<div className="col-md-12 ml-4">
					<div className="mt-2">
						<SelectionQuestion 
							question={"Select the channel of your campaign"}
						/>
					</div>
					<div className="d-flex justify-content-start">
						{this.getMediaTypes()}
					</div>
					<div className="row mt-2">
						<div className="col-md-12">
							<h6 className="text-muted">TYPE(S) OF CHANNEL</h6>
						</div>
					</div>
					<div className="row mr-5">
						{this.getTypesOfChannel()}
					</div>
					<div className="row mt-2">
						<div className="col-md-12">
							<h6 className="text-muted">TRACKING OPTIONS</h6>
						</div>
					</div>
					<div className="row">
						{this.getTrackingOptions()}
					</div>
					<div className="buttons d-flex justify-content-end align-items-center w-100">
						<div className="pr-5 mr-1">
							<button type="button" className="btn btn-outline-primary mr-2" disabled style={{cursor: 'not-allowed'}}>Cancel</button>
							<button 
								type="button" 
								className="btn btn-primary" 
								onClick={this.continue}
								disabled={channelType.length === 0 || trackingType.length === 0 || mediaType === null ? true : false}
							>
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SelectChannel;
