// import  { useState, useEffect } from 'react';
// import "../areaTable/AreaTable.scss";
// import AreaTableAction from "../areaTable/AreaTableAction";

// const TABLE_HEADS = [
//   "stock",
//   "buyAt",
//   "sellAt",
//   "stopLoss",
//   "Edit",
// ];


// const Plans = () => {
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('./planlist.json'); // Assuming the JSON file is named purchase.json and placed in the public folder
//         const jsonData = await response.json();
//         setTableData(jsonData);
//       } 
     

//       catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <section className="content-area-table">
//       <div className="data-table-info">
//         <h4 className="data-table-title">high risk</h4>
//       </div>
//       <div className="data-table-diagram">
//         <table>
//           <thead>
//             <tr>
//               {TABLE_HEADS.map((th, index) => (
//                 <th key={index}>{th}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((planlist) => {
//               return (
//                 <tr key={planlist.planId}>
//                   <td>{planlist.stock}</td>
//                   <td>{planlist.buyAt}</td>
//                   <td>{planlist.sellAt}</td>
//                   <td>{planlist.stopLoss}</td>
                  
//                   {/* <td>${purchase.amount.toFixed(2)}</td> Corrected variable name */}
//                   <td className="dt-cell-action">
//                     <AreaTableAction />
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default Plans;



// import { useState, useEffect } from 'react';
// import "../areaTable/AreaTable.scss";
// // import AreaTableAction from "../areaTable/AreaTableAction";

// const TABLE_HEADS = [
//   "stock",
//   "buyAt",
//   "sellAt",
//   "stopLoss",
//   "Edit",
// ];

// const Plans = () => {
//   const [tableData, setTableData] = useState([]);

 

 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Update this URL to your actual API endpoint
//         const apiUrl = 'http://localhost:3000/plans';
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const jsonData = await response.json();
//         setTableData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data from API:', error);
//       }
//     };
//     fetchData();
//   }, []);



//   const handleEdit = (planId) => {
//     // Placeholder for edit functionality
//     // This could open a modal or form pre-populated with the plan's details
//     console.log('Editing plan', planId);
//   };


//   const handleDelete = async (planId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/plans/${planId}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Error deleting plan');
//       }
//       // Refetch or directly update the state to remove the deleted plan
//       fetchPlans(); // Or use a more efficient state update
//     } catch (error) {
//       console.error('Error deleting plan:', error);
//     }
//   };
 

//   return (
//     <section className="content-area-table">
//     <div className="data-table-info">
//       <h4 className="data-table-title">high risk</h4>
//     </div>
//     <div className="data-table-diagram">
//       <table>
//         <thead>
//           <tr>
//             {TABLE_HEADS.map((th, index) => (
//               <th key={index}>{th}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((plan) => (
//             <tr key={plan.planId}>
//               <td>{plan.stock}</td>
//               <td>{plan.buyAt}</td>
//               <td>{plan.sellAt}</td>
//               <td>{plan.stopLoss}</td>
//               <td>
//                 <button onClick={() => handleEdit(plan.planId)}>Edit</button>
//               </td>
//               <td>
//                 <button onClick={() => handleDelete(plan.planId)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </section>
//   );
// };

// export default Plans;


import React, { useState, useEffect } from 'react';
import "../areaTable/AreaTable.scss";

const TABLE_HEADS = [
  "planId",
  "stock",
  "buyAt",
  "sellAt",
  "stopLoss",
  "Edit",
];
const Plans = () => {
  const [tableData, setTableData] = useState([]);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [tempPlanData, setTempPlanData] = useState({});

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const apiUrl = 'http://localhost:3000/plans';
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setTableData(jsonData);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const handleDelete = async (planId) => {
    try {
      const response = await fetch(`http://localhost:3000/plans/${planId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting plan');
      }
      fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const handleEdit = (planId) => {
    const planToEdit = tableData.find(plan => plan.planId === planId);
    setEditingPlanId(planId);
    setTempPlanData(planToEdit);
  };

  const handleEditChange = (e) => {
    setTempPlanData({ ...tempPlanData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/plans/${editingPlanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempPlanData),
      });
      if (!response.ok) {
        throw new Error('Error saving edited plan');
      }
      await fetchPlans(); // Refresh the plans list to reflect the update
      setEditingPlanId(null); // Exit editing mode
      setTempPlanData({}); // Reset temporary data
    } catch (error) {
      console.error('Error saving edited plan:', error);
    }
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">High Risk</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Buy At</th>
              <th>Sell At</th>
              <th>Stop Loss</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
  {tableData.map((plan) => (
    <tr key={plan.planId}>
      {editingPlanId === plan.planId ? (
        <>
          <td><input type="text" name="stock" value={tempPlanData.stock} onChange={handleEditChange} /></td>
          <td><input type="number" name="buyAt" value={tempPlanData.buyAt} onChange={handleEditChange} /></td>
          <td><input type="number" name="sellAt" value={tempPlanData.sellAt} onChange={handleEditChange} /></td>
          <td><input type="number" name="stopLoss" value={tempPlanData.stopLoss} onChange={handleEditChange} /></td>
          <td>
            <button onClick={() => handleSaveEdit(plan.planId)}>Save</button>
            <button onClick={() => setEditingPlanId(null)}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{plan.stock}</td>
          <td>{plan.buyAt}</td>
          <td>{plan.sellAt}</td>
          <td>{plan.stopLoss}</td>
          <td>
            <button onClick={() => handleEdit(plan.planId)}>Edit</button>
          </td>
          <td>
            <button onClick={() => handleDelete(plan.planId)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </section>
  );
};

export default Plans;






