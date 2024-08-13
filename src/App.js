import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState({
    bytesReceived: 0,
    bytesSent: 0,
    totalGB: 0,
  });

  useEffect(() => {
    // Fetch data from the server
    fetch('http://localhost:3001/api/netstat')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Network Statistics</h1>
      <p>Bytes Received: {data.bytesReceived}</p>
      <p>Bytes Sent: {data.bytesSent}</p>
      <p>Total GB: {data.totalGB} GB</p>
    </div>
  );
}

export default App;
