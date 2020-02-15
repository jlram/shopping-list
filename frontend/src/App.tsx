import React , { Fragment, useState, useEffect, KeyboardEvent} from 'react';
import './App.css';
import { Grid, TextField, Fab } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
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

  const handleSubmit = () => {
    if (value !== '') {
      addTodo(value);
      setValue('');  
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if(event.key === 'Enter'){
      handleSubmit();
    }
  }

  const addTodo = (title:string) => {
    setTodos([...todos, {id: null, title: title, is_completed: false}])

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


  }

  const complete = (index: number): void => {
    todos[index].is_completed = !todos[index].is_completed
    setTodos([...todos])
  }

  const remove = (index: number): void => {
    todos.splice(index, 1);
    setTodos([...todos])
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
          <TextField id="outlined-basic" label="Añade un producto" variant="outlined" value={value} onChange={e => setValue(e.target.value)} onKeyPress={handleKeyPress}/>  
        </Grid>
        <Grid item xs={4}>
        <Fab color="primary" aria-label="add" onClick={handleSubmit}>
            <AddShoppingCartIcon />
          </Fab>

        </Grid>
      </Grid>

      <TodoList todos={todos} complete={complete} delete={remove}/>

    </Fragment>

  );
}
