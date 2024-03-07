import { useState, useEffect } from 'react';
import "../areaTable/AreaTable.scss";
import AreaTableAction from "../areaTable/AreaTableAction";

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update this URL to your actual API endpoint
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



  const deleteClient = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/clients/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Filter out the deleted client from the table data
        setTableData(tableData.filter(client => client.UserID !== userId));
      } else {
        throw new Error(`Failed to delete client with UserID ${userId}.`);
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">List of subscribed Clients</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((client) => {
              return (
                <tr key={client.UserID}>
                  <td>{client.UserID}</td>
                  <td>{client.name}</td>
                  <td>{client.Invested}</td>
                  {/* <td>{clientlist.Returns}</td> */}
                  <td>
                    <span className={`abc-${client.Returns>0?'positive':'negative'}`}>{client.Returns}</span>
                  </td>   
                  <td>{client.Date}</td>
                  
                  {/* <td>${purchase.amount.toFixed(2)}</td> Corrected variable name */}
                  <td className="dt-cell-action">
                  <button onClick={() => alert('Edit functionality not implemented')}>Edit</button>
                    <button onClick={() => deleteClient(client.UserID)}>Delete</button>
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Clientlist;


  




