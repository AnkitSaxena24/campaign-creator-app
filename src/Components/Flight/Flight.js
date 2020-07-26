import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SelectionQuestion from '../SectionQuestion/SectionQuestion';

class Flight extends Component {

	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	}

	goBack = e => {
		e.preventDefault();
		this.props.prevStep();
	}

	handleCancel = e => {
		e.preventDefault();
		this.props.handleCancelCampaign();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.campaignStartDate !== this.props.campaignStartDate) {
			this.props.handleDateReset();
		}
	}

	render() {
		const { campaignStartDate, campaignEndDate } = this.props;
		return (
			<div className="pl-4 pr-4 w-100">
				<div className="row">
					<div className="col-md-12">
						<div className="mt-2">
							<SelectionQuestion 
								question={"Select when the campaign start and end?"}
							/>
						</div>
						<form>
							<div className="d-flex row justify-content-around">
								<div className="form-group col-md-6">
									<DatePicker
										selected={campaignStartDate}
										onChange={this.props.handleStartDateChange}
										minDate={new Date()}
										name="Start Date"
										dateFormat="dd MMM yyyy"
										showDisabledMonthNavigation
										placeholderText="Start Date"
										className="text-center"
										fullWidth={true}
									/>
								</div>
								<div className="form-group col-md-6">
									<DatePicker
										disabled={!campaignStartDate ? true : false}
										selected={campaignEndDate}
										onChange={this.props.handleEndDateChange}
										minDate={campaignStartDate}
										name="End Date"
										dateFormat="dd MMM yyyy"
										showDisabledMonthNavigation
										placeholderText="End Date"
										className="text-center"
										fullWidth={true}
									/>
								</div>
							</div>
						</form>
						<div className="buttons d-flex justify-content-between align-items-center w-100">
							<div className="pl-2">
								<button className="btn btn-outline-primary" onClick={this.goBack}>Previous</button>
							</div>
							<div className="pr-5">
								<button 
									type="button" 
									className="btn btn-outline-primary mr-2" 
									onClick={this.handleCancel}
								>
									Cancel
								</button>
								<button 
									className="btn btn-primary" 
									onClick={this.continue}
									disabled={!campaignEndDate || !campaignStartDate ? true : false}
								>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Flight;
