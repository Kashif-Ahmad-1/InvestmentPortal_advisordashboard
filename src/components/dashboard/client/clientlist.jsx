import  { useState, useEffect } from 'react';
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
        const response = await fetch('./clientlist.json'); // Assuming the JSON file is named purchase.json and placed in the public folder
        const jsonData = await response.json();
        setTableData(jsonData);
      } 
      
      // {
      //   const response = await axios.get('http://localhost:5000/api/data'); // api link
      //   setData(response.data);
      // }

      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
            {tableData.map((clientlist) => {
              return (
                <tr key={clientlist.UserID}>
                  <td>{clientlist.UserID}</td>
                  <td>{clientlist.name}</td>
                  <td>{clientlist.Invested}</td>
                  <td>{clientlist.Returns}</td>
                  <td>{clientlist.Date}</td>
                  
                  {/* <td>${purchase.amount.toFixed(2)}</td> Corrected variable name */}
                  <td className="dt-cell-action">
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


  





