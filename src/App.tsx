import React , { Fragment, useState, useEffect, KeyboardEvent, useContext } from 'react';
import './App.css';
import { Grid, TextField, Fab } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TodoList from './components/TodoList'
import {Store} from './Store'


interface ITodo {
  text: string
  complete: boolean
}

export default function App(): JSX.Element{

  const {state, dispatch} = React.useContext(Store)

  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  
  useEffect(() => {

    var array = JSON.parse(localStorage.getItem("todos")!);
    if (array === null) {
      setTodos([])
    } else {
      setTodos(array)
    }

    fetchDataAction()

  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify([...todos]))
  });

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

  const addTodo = (text:string) => {
    setTodos([...todos, {text: text, complete: false}])
    localStorage.setItem('todos', JSON.stringify([...todos]))
  }

  const complete = (index: number): void => {
    todos[index].complete = !todos[index].complete
    setTodos([...todos])
    localStorage.setItem('todos', JSON.stringify([...todos]))
  }

  const remove = (index: number): void => {
    todos.splice(index, 1);
    setTodos([...todos])
    localStorage.setItem('todos', JSON.stringify([...todos]))
  }

  const fetchDataAction = async() => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
    const dataJSON = await data.json();

    console.log('done')

    return dispatch({
      type: 'FETCH',
      payload: dataJSON._embedded.episodes
    })
  }


  return (
    <Fragment>
      {console.log(state)}
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
