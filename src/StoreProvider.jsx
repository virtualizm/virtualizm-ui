import React, { useReducer } from 'react';

export const addHypervisors = (payload) => ({type: 'ADD_HYPERVISORS', payload });
export const addMachines = (payload) => ({type: 'ADD_MACHINES', payload});
export const startLoading = () => ({type: 'START_LOADING'});
export const stopLoading = () => ({type: 'STOP_LOADING'});

const state = {
    isLoading: false,
    hypervisors: [],
    machines: []
};

export const StoreContext = React.createContext(state);

const Reducer = (state, {type, payload}) => {
    switch(type) {
        case 'ADD_HYPERVISORS':
            return {
                ...state,
                hypervisors: payload,
            }

        case 'ADD_MACHINES': {
            return {
                ...state,
                machines: payload
            }
        }

        case 'START_LOADING':
            return {
                ...state,
                isLoading: true
            }
        
        case 'STOP_LOADING':
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}


export const StoreProvider = ({children}) => {
    const [store, dispatch] = useReducer(Reducer, state);

    const providedValue = {
        store, dispatch
    }

    return (
        <StoreContext.Provider value={providedValue}>
            {children}
        </StoreContext.Provider>
    )
}