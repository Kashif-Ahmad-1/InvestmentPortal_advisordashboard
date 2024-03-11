import React from 'react';
import { useParams } from 'react-router-dom';
import plans from "./plans.json";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import PlanCard from './FlipingCard';
import dummy from './grapghup.png'
import advidata from "./advi.json";


const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

function AdvClProfile() {
    // Extracting the advisor ID from the URL params
    const { advisor_id } = useParams();

    const advisor = advidata.listOfNamesOfAdvisors.find(advisor => advisor._id === advisor_id);

    const advisorPlans = plans.filter(plan => plan.advisor_id === advisor_id);
  
    return (
      <div>
        <div className='bigadv'>
            <div className='riga'>
            <div className='advleft'>
                <img className="moneyimg" src="https://avatar.iran.liara.run/public/boy" alt="money" style={{ borderRadius: '1.5rem', width: '8rem', height: '8rem', margin: '0.6rem' }} />
                <img src={dummy} style={{ borderRadius: '1.5rem', width: '10rem', height: '10rem', margin: '0.6rem' }}/>
            </div>
            </div>
            <div className='lefa'>
            <div className='advright'> 
                <h2 style={{marginTop:"0.5rem"}}>{advisor.name}</h2>
                <center><hr style={{ width: '70%' }} /></center>
                <div>📧: {advisor.email} </div>
                <div>🚀: {new Date(advisor.createdAt).toLocaleDateString()}</div>
            </div>
            </div>
        </div>
        <h2 style={{marginBottom:"1rem"}}>{advisor.name.split(" ")[0]}'s Plans</h2>
        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
          {advisorPlans.map((plan, index) => (
            <div key={index}>
              <PlanCard plan={plan} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  
}

export default AdvClProfile ;