import  { useState, useEffect } from 'react';
import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Products",
  "Order ID",
  "Date",
  "Customer name",
  "Status",
  "Amount",
  "Action",
];

const AreaTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./purchase.json'); // Assuming the JSON file is named purchase.json and placed in the public folder
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
        <h4 className="data-table-title">Latest Orders</h4>
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
            {tableData.map((purchase) => {
              return (
                <tr key={purchase.id}>
                  <td>{purchase.name}</td>
                  <td>{purchase.order_id}</td>
                  <td>{purchase.date}</td>
                  <td>{purchase.customer}</td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${purchase.status}`}
                      ></span>
                      <span className="dt-status-text">{purchase.status}</span>
                    </div>
                  </td>
                  <td>${purchase.amount.toFixed(2)}</td> {/* Corrected variable name */}
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

export default AreaTable;

