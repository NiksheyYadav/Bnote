import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Fade,
  Tabs,
  Tab,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleToggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    }
    if (filter === 'completed') {
      return task.completed;
    }
    return true;
  });

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        To-Do List
      </Typography>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <TextField
          label="New Task"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          style={{ marginLeft: '1rem' }}
        >
          Add
        </Button>
      </div>
      <Tabs value={filter} onChange={handleFilterChange} centered>
        <Tab label="All" value="all" />
        <Tab label="Active" value="active" />
        <Tab label="Completed" value="completed" />
      </Tabs>
      <List>
        {filteredTasks.map((task, index) => (
          <Fade in={true} key={index}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    const taskIndex = tasks.findIndex(
                      (t) => t.text === task.text
                    );
                    handleDeleteTask(taskIndex);
                  }}
                >
                  <Delete />
                </IconButton>
              }
            >
              <Checkbox
                checked={task.completed}
                onChange={() => {
                  const taskIndex = tasks.findIndex(
                    (t) => t.text === task.text
                  );
                  handleToggleComplete(taskIndex);
                }}
              />
              <ListItemText
                primary={task.text}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              />
            </ListItem>
          </Fade>
        ))}
      </List>
    </Container>
  );
}

export default App;