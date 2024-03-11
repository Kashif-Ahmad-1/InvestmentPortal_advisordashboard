import React from 'react';
import "./Plans.css"


const PlanCard = ({ plan }) => {
  return (
    <div className="flip-card" >
      <div className="flip-card-inner">
        <div className="flip-card-front" >
            
          <h2 style={{marginTop:"0.5rem"}}>{plan.plan_name}</h2>
          <center><hr style={{ width: '50%' }} /></center>
          <div className='cout'>
          <div className='cin'>        
          <p style={{ textAlign: 'center' }}><strong>Type</strong><br/>{plan.type_cat}</p>
          </div>
          <div className='cin'>
          <p style={{ textAlign: 'center' }}><strong>Risk</strong><br/>{plan.risk_cat}</p>
          </div>
          </div>
          <div>
          <img className="moneyimg" src={plan.img} alt="money" style={{ borderRadius: '1.5rem', width: '10rem', height: '5rem', margin: '0.6rem' }} />
          </div>
          <footer className='ffo'>
            <div className='finr'>
          <p style={{ textAlign: 'center' }}>⭐<br/>{plan.rating}</p>
          </div>
          <div className='finl'>
          <p style={{ textAlign: 'center' }}>👥<br/>{plan.total_orders}</p>
          </div>

          </footer>
        </div>
        <div className="flip-card-back" >
          <h2 style={{marginTop:"0.5rem"}}>Dummy Text</h2>
          <center><hr style={{ width: '50%' }} /></center>
          <br/>
          <p>This is the back side of the card.</p>
          <p>Add your dummy text here.</p>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
