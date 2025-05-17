import './App.css'
import { Typography, Box } from '@mui/material';

function App() {

  return (
    <div className="App">
      <Typography variant="h1" component="h2" gutterBottom>
        Orrett Inventory Tracker
      </Typography>
      <div>
        <Box>
          <Typography>
            Total Bins
          </Typography>
        </Box>
      </div>
    </div>
  )
}

export default App
