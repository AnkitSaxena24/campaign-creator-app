import React from 'react';

const campaignSuccess = props => {
  return (
    <div className="row">
      <div className="col-md-12 text-center mt-3">
        <h3 className="font-weight-bold">Congratulations! Campaign Successfully Created.</h3>
        <div className="d-flex justify-content-center">
          <button 
            type="button" 
            className="btn btn-primary mt-3"
            onClick={props.createNewCampaign}
          >
            CREATE NEW CAMPAIGN
          </button>
        </div>
      </div>
    </div>
  )
};

export default campaignSuccess;