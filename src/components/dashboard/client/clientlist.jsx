import React, { useState, useEffect } from 'react';
import "../areaTable/AreaTable.scss";
import AreaTableAction from "../areaTable/AreaTableAction";
import SimpleModal from './SimpleModal';

const TABLE_HEADS = [
  "User ID",
  "Customer name",
  "Invested",
  "Returns",
  "Date",
  "Edit",
];

const Clientlist = () => {
  const [tableData, setTableData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    Invested: '',
    Returns: '',
    Date: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://localhost:3000/clients';
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
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient)
      });

      if (!response.ok) {
        throw new Error('Something went wrong with adding a new client');
      }

      const addedClient = await response.json();
      setTableData([...tableData, addedClient]);
      setNewClient({ name: '', Invested: '', Returns: '', Date: '' }); // Reset form fields
      setModalIsOpen(false); // Close the modal
    } catch (error) {
      console.error('Error adding new client:', error);
    }
  };

  const deleteClient = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/clients/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTableData(tableData.filter(client => client.UserID !== userId));
      } else {
        throw new Error(`Failed to delete client with UserID ${userId}.`);
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">List of subscribed Clients</h4>
        <button onClick={handleModalOpen}>Add New Client</button>
      </div>
      <SimpleModal isOpen={modalIsOpen} onClose={handleModalClose}>
        {/* Modal content including form for adding a new client */}
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="form-group">
            <label htmlFor="name">Customer Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={newClient.name}
              onChange={handleInputChange}
              placeholder="Enter customer name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Invested">Invested Amount:</label>
            <input
              type="number"
              id="Invested"
              name="Invested"
              required
              value={newClient.Invested}
              onChange={handleInputChange}
              placeholder="Enter invested amount"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Returns">Returns:</label>
            <input
              type="number"
              id="Returns"
              name="Returns"
              required
              value={newClient.Returns}
              onChange={handleInputChange}
              placeholder="Enter returns"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Date">Date:</label>
            <input
              type="date"
              id="Date"
              name="Date"
              required
              value={newClient.Date}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-btn">Add Client</button>
        </form>
      </SimpleModal>
      <div className="data-table-diagram">
        {/* Table displaying the list of clients */}
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((client) => (
              <tr key={client.UserID}>
                <td>{client.UserID}</td>
                <td>{client.name}</td>
                <td>{client.Invested}</td>
                <td><span className={`abc-${client.Returns>0?'positive':'negative'}`}>{client.Returns}</span></td>
                <td>{client.Date}</td>
                <td className="dt-cell-action">
                  {/* Placeholder for edit functionality */}
                  <button onClick={() => deleteClient(client.UserID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Clientlist;


















// import { useState, useEffect } from 'react';
// import "../areaTable/AreaTable.scss";
// import AreaTableAction from "../areaTable/AreaTableAction";

// const TABLE_HEADS = [
//   "User ID",
//   "Customer name",
//   "Invested",
//   "Returns",
//   "Date",
//   "Edit",
// ];


// const Clientlist = () => {
//   const [tableData, setTableData] = useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Update this URL to your actual API endpoint
//         const apiUrl = 'http://localhost:3000/clients';
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



//   const deleteClient = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/clients/${userId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         // Filter out the deleted client from the table data
//         setTableData(tableData.filter(client => client.UserID !== userId));
//       } else {
//         throw new Error(`Failed to delete client with UserID ${userId}.`);
//       }
//     } catch (error) {
//       console.error('Error deleting client:', error);
//     }
//   };

//   return (
//     <section className="content-area-table">
//       <div className="data-table-info">
//         <h4 className="data-table-title">List of subscribed Clients</h4>
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
//             {tableData.map((client) => {
//               return (
//                 <tr key={client.UserID}>
//                   <td>{client.UserID}</td>
//                   <td>{client.name}</td>
//                   <td>{client.Invested}</td>
//                   {/* <td>{clientlist.Returns}</td> */}
//                   <td>
//                     <span className={`abc-${client.Returns>0?'positive':'negative'}`}>{client.Returns}</span>
//                   </td>   
//                   <td>{client.Date}</td>
                  
//                   {/* <td>${purchase.amount.toFixed(2)}</td> Corrected variable name */}
//                   <td className="dt-cell-action">
//                   <button onClick={() => alert('Edit functionality not implemented')}>Edit</button>
//                     <button onClick={() => deleteClient(client.UserID)}>Delete</button>
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

// export default Clientlist;


  
// import React, { useState, useEffect } from 'react';
// import "../areaTable/AreaTable.scss";
// import AreaTableAction from "../areaTable/AreaTableAction";
// import SimpleModal from './SimpleModal';

// const TABLE_HEADS = [
//   "User ID",
//   "Customer name",
//   "Invested",
//   "Returns",
//   "Date",
//   "Edit",
// ];

// const Clientlist = () => {
//   const [tableData, setTableData] = useState([]);

 
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const handleModalOpen = () => {
//     setModalIsOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalIsOpen(false);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     try {
//       // Replace 'http://localhost:3000/clients' with your actual API endpoint
//       const response = await fetch('http://localhost:3000/clients', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newClient)
//       });
  
//       if (!response.ok) {
//         // Handle server errors (e.g., 400 Bad Request)
//         throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//       }
  
//       const addedClient = await response.json(); // Assuming the server responds with the added client data
//       setTableData(currentTableData => [...currentTableData, addedClient]); // Update the UI with the new client
  
//       // Reset form fields after successful submission
//       setNewClient({ name: '', Invested: '', Returns: '', Date: '' });
  
//       handleModalClose(); // Close the modal after submission
//     } catch (error) {
//       console.error('Error adding new client:', error);
//       // Optionally, inform the user of the error (e.g., through an alert or a visible error message on the form)
//     }
//   };

//   const [newClient, setNewClient] = useState({
//     name: '',
//     Invested: '',
//     Returns: '',
//     Date: ''
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl = 'http://localhost:3000/clients';
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

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewClient(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const addClient = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3000/clients', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newClient)
//       });

//       if (!response.ok) {
//         throw new Error('Something went wrong with adding a new client');
//       }

//       const addedClient = await response.json();
//       setTableData([...tableData, addedClient]);
//       setNewClient({ name: '', Invested: '', Returns: '', Date: '' });
//     } catch (error) {
//       console.error('Error adding new client:', error);
//     }
//   };

//   const deleteClient = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/clients/${userId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setTableData(tableData.filter(client => client.UserID !== userId));
//       } else {
//         throw new Error(`Failed to delete client with UserID ${userId}.`);
//       }
//     } catch (error) {
//       console.error('Error deleting client:', error);
//     }
//   };

//   return (
//     <section className="content-area-table">
//       <div className="data-table-info">
//         <h4 className="data-table-title">List of subscribed Clients</h4>
//         <button onClick={handleModalOpen}>Add New Client</button>
//       </div>
//       <SimpleModal isOpen={modalIsOpen} onClose={handleModalClose}>
//       <form onSubmit={handleSubmit}>
//   <div className="form-group">
//     <label htmlFor="name">Customer Name:</label>
//     <input
//       type="text"
//       id="name"
//       name="name"
//       required
//       value={newClient.name}
//       onChange={handleInputChange}
//       placeholder="Enter customer name"
//     />
//   </div>

//   <div className="form-group">
//     <label htmlFor="Invested">Invested Amount:</label>
//     <input
//       type="number"
//       id="Invested"
//       name="Invested"
//       required
//       value={newClient.Invested}
//       onChange={handleInputChange}
//       placeholder="Enter invested amount"
//     />
//   </div>

//   <div className="form-group">
//     <label htmlFor="Returns">Returns:</label>
//     <input
//       type="number"
//       id="Returns"
//       name="Returns"
//       required
//       value={newClient.Returns}
//       onChange={handleInputChange}
//       placeholder="Enter returns"
//     />
//   </div>

//   <div className="form-group">
//     <label htmlFor="Date">Date:</label>
//     <input
//       type="date"
//       id="Date"
//       name="Date"
//       required
//       value={newClient.Date}
//       onChange={handleInputChange}
//     />
//   </div>

//   <button type="submit" className="submit-btn">Add Client</button>
// </form>
//       </SimpleModal>
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
//             {tableData.map((client) => (
//               <tr key={client.UserID}>
//                 <td>{client.UserID}</td>
//                 <td>{client.name}</td>
//                 <td>{client.Invested}</td>
//                 <td><span className={`abc-${client.Returns>0?'positive':'negative'}`}>{client.Returns}</span></td>
//                 <td>{client.Date}</td>
//                 <td className="dt-cell-action">
//                   <button onClick={() => alert('Edit functionality not implemented')}>Edit</button>
//                   <button onClick={() => deleteClient(client.UserID)}>Delete</button>
//                   <AreaTableAction />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default Clientlist;




