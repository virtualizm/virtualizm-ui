import React from "react";

export const addHypervisors = payload => ({ type: "ADD_HYPERVISORS", payload });
export const addMachines = payload => ({ type: "ADD_MACHINES", payload });
export const startLoading = () => ({ type: "START_LOADING" });
export const stopLoading = () => ({ type: "STOP_LOADING" });
export const changeFilter = payload => ({ type: "CHANGE_FILTER", payload });

export const state = {
  isLoading: false,
  hypervisors: [],
  machines: [],
  filter: "",
};

export const StoreContext = React.createContext(state);

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_HYPERVISORS":
      return {
        ...state,
        hypervisors: payload,
      };

    case "ADD_MACHINES": {
      return {
        ...state,
        machines: payload,
      };
    }

    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "STOP_LOADING":
      return {
        ...state,
        isLoading: false,
      };

    case "CHANGE_FILTER":
      return {
        ...state,
        filter: payload,
      };

    default:
      return state;
  }
};
