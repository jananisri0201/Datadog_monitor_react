import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import { Button, Modal, TextField, Typography, AppBar, Toolbar, IconButton, Grid, CircularProgress } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles'; 
import AddIcon from '@material-ui/icons/Add';


const datadogUrl = 'https://cors-anywhere.herokuapp.com/https://api.us5.datadoghq.com/api/v1/monitor';
const apiKey = '64a58aa7fb934a333f1050c00a1cc74e';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'linear-gradient(to right, #0F2027, #203A43, #2C5364)',
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching data
      const response = await axios.get(datadogUrl + '?group_states=alert', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'DD_API_KEY': apiKey,
          'DD_APPLICATION_KEY':'a481d0e009d8c29d0e824f64db1f8cd048c295b9',
        },
      });
      setApiData(response.data);
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      setError(error);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(datadogUrl, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'DD_API_KEY': apiKey,
          'DD_APPLICATION_KEY':'a481d0e009d8c29d0e824f64db1f8cd048c295b9',
        },
      });
      console.log('Form submitted successfully:', response.data);
      handleCloseModal();
      fetchData(); // Refresh table data after form submission
    } catch (error) {
      setError(error.response.data.errors[0]);
    }
  };

  return (
    <div className="App">
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}> 
            DataDog Monitor Dashboard
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleOpenModal}><IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <AddIcon />
          </IconButton> New Monitor</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} style={{padding: '20px'}}> {/* Add spacing and padding around the table */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>List of Monitors</Typography> {/* Heading list for the table */}
        </Grid>
        <Grid item xs={12}>
          {loading ? ( // Show loading indicator if data is being fetched
            <CircularProgress />
          ) : (
            <DataTable data={apiData} />
          )}
        </Grid>
      </Grid>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
          <h2>Add New Monitor</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Message"
              value={formData.message || ''}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Query"
              value={formData.query || ''}
              onChange={(e) => setFormData({ ...formData, query: e.target.value })}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Type"
              value={formData.type || ''}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              margin="normal"
              fullWidth
              required
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;
