import React from 'react';
import "./Plans.css";

const AdvisorCard = ({ advisor }) => {
  return (
    <div className="flip-card" >
    <div className="flip-card-inner">
      <div className="flip-card-front" >
        <h2 style={{marginTop:"0.5rem"}}>{advisor.name}</h2>
        <center><hr style={{ width: '70%' }} /></center>
        <div>
        <img className="moneyimg" src="https://avatar.iran.liara.run/public/boy" alt="money" style={{ borderRadius: '1.5rem', width: '8rem', height: '8rem', margin: '0.6rem' }} />
        </div>
        <footer className='ffo'>
          <div className='finr'>
        {/* <p style={{ textAlign: 'center' }}>⭐<br/>{advisor.rating}</p> */}
        </div>
        <div className='finl'>
        {/* <p style={{ textAlign: 'center' }}>👥<br/>{plan.total_orders}</p> */}
        </div>

        </footer>
      </div>
      <div className="flip-card-back" >
        <h2 style={{marginTop:"0.5rem"}}>Details</h2>
        <center><hr style={{ width: '70%' }} /></center>
        <br/>
        <p>📧: {advisor.email} </p>
        <p>🚀: {new Date(advisor.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  </div>
  );
};

export default AdvisorCard;
