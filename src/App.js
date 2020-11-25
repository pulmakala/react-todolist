import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const App = () => {
    const [todo, setTodo] = useState({description: '', date: '', status:''});
    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState('one');

    const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});
    }

    const gridRef= useRef();
  
    const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
      setTodo({description: '', date: '', status:''});
    }

    const deleteTodo = () => {
      if (gridRef.current.getSelectedNodes().length > 0) {
        setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
      }
      else {
        alert('Selectrowfirst');
      }
    }

    const columns = [
      { headerName: "Description", field:"description", sortable: true, filter: true},
      { headerName: "Date", field: "date", sortable: true, filter: true},
      { headerName: "Status", field: "status", sortable: true, filter: true,
        cellStyle: params=> params.value===   "High"? {color: 'red'} : {color:'black'}
      }
    ]

    const handleChange = (event, value) => {
      setValue(value);
    }
  
    return (
        <div className="App">
          <AppBar position="stati">
            <Toolbar>
              <Typography variant="h6">
                To-do List
              </Typography>
              <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Home" />
                <Tab value="two" label="My to-dos" />
              </Tabs>
            </Toolbar>
          </AppBar>
          {value === 'one' && <div>
            <center><h2>Welcome!</h2>
            <div>Here you can find the To-do List.</div></center>
            </div>}
          {value === 'two' && <div>
          <center>
          <TextField style={{margin: 5}} label="Description" name="description" value={todo.description} onChange={inputChanged} />
          <TextField style={{margin: 5}} label="Date" name="date" value={todo.date} onChange={inputChanged} />
          <TextField style={{margin: 5}} label="Status" name="status" value={todo.status} onChange={inputChanged} />
          <Button 
            size="small" 
            style={{margin: 5}} 
            variant="contained" 
            color="primary" 
            onClick={addTodo}>
              Add
            </Button>
          <Button 
            size="small" 
            style={{margin: 5}} 
            variant="contained" 
            color="secondary" 
            onClick={deleteTodo}>
              Delete
            </Button>

          <div className="ag-theme-material" style={{height:'300px', width:'40%', margin:'auto'}}>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                columnDefs={columns}
                rowData={todos}>
            </AgGridReact>
            
            </div>
            </center>
            </div>}
        </div>
    );
}

export default App;