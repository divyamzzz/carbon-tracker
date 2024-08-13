const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3001; // Define the port for your server

app.use(cors());

// Endpoint to get netstat data
app.get('/api/netstat', (req, res) => {
  const command = 'netstat -e';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }

    // Split output into lines and find the line containing "Bytes"
    const lines = stdout.trim().split(/\r?\n/);
    let bytesReceived = 0;
    let bytesSent = 0;

    for (let line of lines) {
      if (line.toLowerCase().includes('bytes')) {
        const columns = line.trim().split(/\s+/);
        if (columns.length >= 3) {
          bytesReceived = parseInt(columns[1], 10);
          bytesSent = parseInt(columns[2], 10);
          break;
        }
      }
    }

    // Calculate total bytes and convert to GB
    const totalBytes = bytesReceived + bytesSent;
    const totalGB = totalBytes / (1024 * 1024 * 1024);

    // Send JSON response
    res.json({
      bytesReceived,
      bytesSent,
      totalGB: totalGB.toFixed(2),
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
