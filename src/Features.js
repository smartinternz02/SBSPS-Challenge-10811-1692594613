import React from 'react';
import "./featureStyles.css"
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="features-container">
      <div className="feature-card">
        <img src="https://images.unsplash.com/photo-1634804658555-248d9e9a212f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2JTIwdmVoaWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60" alt="Feature 2" />
        <div className="feature-card-content">
          <h3>Updating Charge History To View Anywhere Anytime</h3>
          <p>Keep track of your charge history and access it from anywhere.</p>
          <Link to="/update" className="back-button">
          Update
        </Link>
        </div>
      </div>
      <div className="feature-card">
        <img src="https://images.unsplash.com/photo-1596731498067-99aeb581d3d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGV2JTIwdmVoaWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60" alt="Feature 3" />
        <div className="feature-card-content">
          <h3>Find Range</h3>
          <p>Predicted Distance your Electric Vehicle can Go</p>
          <Link to="/range" className="back-button">
                    Range
                  </Link>
        </div>
      </div>
            <div className="feature-card">
        <img src="https://images.unsplash.com/photo-1669941060931-6912c4538ba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGV2JTIwdmVoaWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60" alt="Feature 3" />
        <div className="feature-card-content">
          <h3>View Charge History</h3>
          <p>Want to see your Charge History that you have entered. Here you have it</p>
 <Link to="/view" className="back-button">
                    View
                  </Link>
        </div>
      </div>
    </div>
  );
}

export default Features;