import React from 'react';

const STEPS = [
	{
		title: 'STEP 1 - SELECT CHANNEL',
		tab: 1
	},
	{
		title: 'STEP 2 - FLIGHT',
		tab: 2
	},
	{
		title: 'STEP 3 - BUDGET',
		tab: 3
	}
]

export default function campaignSteps(props) {

	const steps = STEPS.map((step, index) => {
		return (
			<small 
				key={index} 
				className={`${props.curStep === step.tab ? 'text-success' : ''}text-danger font-weight-bold`}
			>
				{step.title}
			</small>
		)
	})

	return (
		<>
		<div className="d-flex justify-content-around">
			{steps}
		</div>
		<hr />
		</>
	)
}
