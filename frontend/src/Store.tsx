import React from 'react';

interface IState {
    articles: [{  text: string, complete: boolean}]
}

interface IAction {
    type: string,
    payload: any
}

const initialState:IState = {
    articles: [{text: '', complete: false}]
}

export const Store = React.createContext<IState | any>(initialState)

function reducer(state:IState, action:IAction): IState {
    switch(action.type) {
        case 'FETCH':
            return {...state, articles: action.payload}
        default:
            return state
    }
}

export function StoreProvider(props:any):JSX.Element {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}