import  { useState, useEffect } from 'react';
import axios from 'axios'; 

const AreaProgressChart = () => {
  const [progressData] = useState([]);
  const [setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try 
        //  const response = await fetch('./progressData.json');
        //  const jsonData = await response.json();
        //  setProgressData(jsonData);
      //  }
      {
        const loginData = {
          email: 'shubham@gmail.com',
          password: 'test@123'
        };
        const token = await axios.post('http://localhost:3000/api/v1/check-auth/login', loginData);
        console.log("Token: ", token);
        const response = await axios.get('http://localhost:3000/api/v1/advisor/list-of-plans-with-more-subscriptions');
        console.log("Response: ", response);
        setData(response.data);
      }

      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (

    // (
    //   <div>
    //     <h1>Data from MongoDB</h1>
    //     <ul>
    //       {data.map(item => (
    //         <li key={item._id}>{item.name}</li>
    //       ))}
    //     </ul>
    //   </div>
    // )

     <div className="progress-bar">
       <div className="progress-bar-info">
         <h4 className="progress-bar-title">Most Sold Plans</h4>
       </div>
       <div className="progress-bar-list">
         {progressData.map((progressbar) => {
           return (
             <div className="progress-bar-item" key={progressbar.id}>
               <div className="bar-item-info">
                 <p className="bar-item-info-name">{progressbar.name}</p>
                 <p className="bar-item-info-value">
                   {progressbar.percentValues}
                 </p>
               </div>
               <div className="bar-item-full">
                 <div
                   className="bar-item-filled"
                   style={{
                     width: `${progressbar.percentValues}%`,
                   }}
                 ></div>
               </div>
             </div>
           );
         })}
       </div>
     </div>
  );
};

export default AreaProgressChart;
