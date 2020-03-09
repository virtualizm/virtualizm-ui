import React, { useReducer, useEffect } from 'react';
import { subscribeOnSocket } from './Api';

export const addHypervisors = (payload) => ({type: 'ADD_HYPERVISORS', payload });
export const addMachines = (payload) => ({type: 'ADD_MACHINES', payload});
export const startLoading = () => ({type: 'START_LOADING'});
export const stopLoading = () => ({type: 'STOP_LOADING'});
export const updateMachineState = (payload) => ({type: 'UPDATE_MACINE_STATE', payload});

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

        case 'UPDATE_MACINE_STATE': {
            return {
                ...state,
                machines: state.machines.map((item) => {
                    if(item.id === payload.payload.id) {
                        return {
                            ...item,
                            state: payload.payload.attributes.state.toLowerCase()
                        }
                    }

                    return item;
                })
            }
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

    useEffect(() => {
        function stateUpdate(payload) {
            dispatch(updateMachineState(payload));
        }

        subscribeOnSocket(stateUpdate);
    }, [dispatch]);

    return (
        <StoreContext.Provider value={providedValue}>
            {children}
        </StoreContext.Provider>
    )
}