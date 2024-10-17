import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Button, 
  AppBar, 
  Toolbar, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';

function App() {
  const [message, setMessage] = useState('');
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setMessage(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTodo(''); 
  };

  const handleAddTodo = () => {
    if (todo) {
      setTodos([...todos, todo]); 
      handleClose();
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My MERN Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom>
        {message}
      </Typography>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Todo
      </Button>
      <List>
        {todos.map((todoItem, index) => (
          <ListItem key={index}>
            <ListItemText primary={todoItem} />
            <Button variant="outlined" color="secondary" onClick={() => handleDeleteTodo(index)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo"
            type="text"
            fullWidth
            variant="standard"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTodo}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
