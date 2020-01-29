import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Store} from '../Store'

interface ITodo {
    text: string
    complete: boolean
}
  
export default function TodoList(props: any): JSX.Element{

    const {state, dispatch} = React.useContext(Store)

    return (
        <Grid container spacing={1} style={{ marginTop: '15px' }}>
            <Grid item xs={12} >
                <Card variant="outlined" style={{    width: '95%'}}>
                    <CardContent>
                        {props.todos.map((todo: ITodo, index: number) => (
                            <Grid container key={index}>
                                <Grid item xs={10} >
                                    <Typography variant="h5" color="textSecondary" gutterBottom style={{ textDecoration: todo.complete ? 'line-through' : '' }} onClick={() => props.complete(index)}>
                                        {todo.text}
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={2}>
                                    {
                                    (index + 1) === props.todos.length ?
                                        <IconButton aria-label="delete" color="secondary" onClick={() => props.delete(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        :  '' 
                                    }
                                </Grid>
                            </Grid>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
      </Grid>
    )
}