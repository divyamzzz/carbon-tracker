import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [data, setData] = useState({
    bytesReceived: 0,
    bytesSent: 0,
    totalGB: 0, // Ensure this is initialized as a number
  });

  useEffect(() => {
    // Fetch data from the server
    fetch('http://localhost:3001/api/netstat')
      .then((response) => response.json())
      .then((data) => {
        // Ensure that totalGB is a number
        setData({
          ...data,
          totalGB: parseFloat(data.totalGB) || 0,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Calculate carbon footprint using the totalGB and emission factors
  const carbonEmissionFactor1 = 0.02; // kg CO2e per GB (low estimate)
  const carbonEmissionFactor2 = 0.2;  // kg CO2e per GB (high estimate)
  const carbonFootprint1 = data.totalGB * carbonEmissionFactor1;
  const carbonFootprint2 = data.totalGB * carbonEmissionFactor2;

  // Electricity consumption and emissions
  const electricityConsumptionPerGB = 0.1; // kWh per GB
  const electricityEmissionFactor = 0.475; // kg CO2e per kWh

  // Calculate carbon footprint due to electricity
  const electricityFootprint = data.totalGB * electricityConsumptionPerGB * electricityEmissionFactor;

  // Hardware production emissions
  const hardwareEmissionFactor = 0.05; // kg CO2e per GB
  const hardwareFootprint = data.totalGB * hardwareEmissionFactor;

  // Total carbon footprint (data + electricity + hardware)
  const totalFootprint1 = carbonFootprint1 + electricityFootprint + hardwareFootprint;
  const totalFootprint2 = carbonFootprint2 + electricityFootprint + hardwareFootprint;

  // Define threshold for excessive carbon footprint (realistic daily estimate)
  const carbonFootprintThreshold = 1.0; // kg CO2e per day

  return (
    <div className="App">
      <h1>Carbon Footprint Report</h1>
      <p>Total GB Consumed by You: {data.totalGB.toFixed(2)} GB</p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Low Estimate (kg CO2e)</th>
            <th>High Estimate (kg CO2e)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data Transmission</td>
            <td>{carbonFootprint1.toFixed(2)}</td>
            <td>{carbonFootprint2.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Electricity Consumption</td>
            <td colSpan="2">{electricityFootprint.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Hardware Production</td>
            <td colSpan="2">{hardwareFootprint.toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>Total Carbon Footprint</strong></td>
            <td>{totalFootprint1.toFixed(2)}</td>
            <td>{totalFootprint2.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {totalFootprint2 > carbonFootprintThreshold && (
        <div className="suggestions">
          <h2>Suggestions to Reduce Your Carbon Footprint</h2>
          <ul>
            <li>Optimize data usage by reducing streaming quality and limiting background data.</li>
            <li>Upgrade to energy-efficient devices and maintain them regularly.</li>
            <li>Choose green energy providers and use solar charging when possible.</li>
            <li>Minimize cloud storage by using local storage and deleting unnecessary files.</li>
            <li>Batch tasks and schedule downloads during off-peak times.</li>
            <li>Educate others about digital carbon emissions and support sustainable policies.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
