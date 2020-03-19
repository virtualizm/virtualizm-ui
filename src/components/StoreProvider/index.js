import React, { useReducer, useMemo } from "react";
import { reducer, state, StoreContext } from "../../app/store";

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, state);

  const providedValue = useMemo(
    () => ({
      store,
      dispatch,
    }),
    [store, dispatch]
  );

  return (
    <StoreContext.Provider value={providedValue}>
      {children}
    </StoreContext.Provider>
  );
};
