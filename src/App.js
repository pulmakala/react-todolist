import React, { useState } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {
  const [todo, setTodo] = useState({description: '', date: '', status: ''});
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    setTodos([todo, ...todos]);
    setTodo({description: '', date: '', status: ''});
  }

  const columns = [
    { headerName: 'Description', field: 'description' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Status', field: 'status' },
  ]

  return (
    <div className="App">
      <h3>To Do-List</h3>
      <input type="text" name="description" value={todo.description} placeholder="Description" onChange={inputChanged} />
      <input type="date" name="date" value={todo.date} placeholder="Date" onChange={inputChanged} />
      <input type="text"name="status" value={todo.status} placeholder="Status" onChange={inputChanged} />
      <button onClick={addTodo}>Add</button>
     
      <div className="ag-theme-material" style={{height:'50%', width:'700px', margin:'auto'}}>
        <AgGridReact
         columnDefs={columns}
         rowData={todos}>
        </ AgGridReact>
      </div>
    </div>
  );
}

export default App;