import React, { Component } from 'react';
import SelectionQuestion from '../SectionQuestion/SectionQuestion';

class Budget extends Component {

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

	render() {

		const { totalBudget, totalImpressions } = this.props;

		return (
			<div className="pl-4 pr-4 w-100">
				<div className="row">
					<div className="col-md-12">
						<div className="mt-2">
							<SelectionQuestion 
								question={"How much is your campaign budget?"}
							/>
						</div>
						<form>
							<div className="form-group">
								<div className="d-flex justify-content-around row">
									<div className="col-md-6">
										<small className="text-muted font-weight-bold">
											Total Budget
										</small>
										<input 
											type="number"
											className="form-control mt-2"
											onChange={this.props.handleBudgetChange}
											value={totalBudget}
										/>
									</div>
									<div className="col-md-6">
										<small className="text-muted font-weight-bold">
											Total Impressions
										</small>
										<input 
											type="number"
											className="form-control mt-2"
											onChange={this.props.handleImpressionChange}
											value={totalImpressions}
										/>
									</div>
								</div>
							</div>
						</form>
						<div className="buttons d-flex justify-content-between align-items-center w-100">
							<div className="pl-2">
								<button type="button" className="btn btn-outline-primary" onClick={this.goBack}>Previous</button>
							</div>
							<div className="pr-5">
								<button type="button" className="btn btn-outline-primary mr-2" onClick={this.handleCancel}>Cancel</button>
								<button 
									className="btn btn-primary" 
									onClick={this.props.creatCampaignData}
									disabled={!totalImpressions || !totalBudget ? true : false}
								>
									Create Tracker
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Budget;