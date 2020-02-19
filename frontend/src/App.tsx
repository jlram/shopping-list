import React , { Fragment, useState, useEffect, KeyboardEvent} from 'react';
import './App.css';
import { Grid, TextField, Fab } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import TodoList from './components/TodoList'
import axios from 'axios'


interface ITodo {
  id: any
  title: string
  is_completed: boolean
}

export default function App(): JSX.Element{

  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  
  useEffect(() => {
    fetchDataAction()
  }, []); // componentDidMount()

  const handleClickFAB = () => {
    console.log(todos)

    todos.map((todo: ITodo, index: number) => (
    axios.put(`http://127.0.0.1:8000/api/${todo.id}/`, {
      is_completed: todo.is_completed
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
    ))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if(event.key === 'Enter'){
      if (value !== '') {
        addTodo(value);
        setValue('');  
      }
    }
  }

  const addTodo = (title:string) => {
    axios.post('http://127.0.0.1:8000/api/', {
      title: title,
      is_completed: false
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error + 'a');
    });

    fetchDataAction()
  }

  const complete = (index: number): void => {
    todos[index].is_completed = !todos[index].is_completed
    setTodos([...todos])
  }

  const remove = (index: number, id: number): void => {
    todos.splice(index, 1);
    setTodos([...todos])

    axios.delete(`http://127.0.0.1:8000/api/${id}/`);
  }

  const fetchDataAction = async() => {
    const data = await fetch('http://127.0.0.1:8000/api')
    const dataJSON = await data.json();

    setTodos(dataJSON)
  }


  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: '60px' }}>
        <Grid item xs={8} style={{textAlign: 'center'}}>
          <TextField id="outlined-basic" label="Añade un producto" variant="outlined" value={value} onChange={e => setValue(e.target.value)} onKeyPress={handleKeyPress} style={{ width: 280 }}/>  
        </Grid>

      </Grid>

      <TodoList todos={todos} complete={complete} delete={remove}/>

        <Fab color="secondary" aria-label="add" size="large" onClick={handleClickFAB} style={{ position: 'fixed', right: 20, bottom: 50 }}>
            <DoneAllIcon />
          </Fab>

    </Fragment>

  );
}
