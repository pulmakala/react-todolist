import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


const App = () => {
    const [todo, setTodo] = useState({description: '', date: '', status:''});
    const [todos, setTodos] = useState([]);

    const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});
    }

    const gridRef= useRef();
  
    const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
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
  
    return (
        <div className="App">
          <center>
          <h3>To-do List</h3>
          <input type="text" name="description" placeholder="Description" value={todo.description} onChange={inputChanged} />
          <input type="text" name="date" placeholder="Date" value={todo.date} onChange={inputChanged} />
          <input type="text" name="status" placeholder="Status" value={todo.status} onChange={inputChanged} />
          <button onClick={addTodo}>Add</button>
          <button onClick={deleteTodo}>Delete</button>

          <div className="ag-theme-material" style={{height:'300px', width:'50%', margin:'auto'}}>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="single"
                columnDefs={columns}
                rowData={todos}>
            </AgGridReact>
            
            </div>
            </center>
        </div>
    );
}

export default App;