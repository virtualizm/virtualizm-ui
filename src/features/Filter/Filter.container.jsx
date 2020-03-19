import React, { useContext, useCallback } from "react";
import { StoreContext, changeFilter } from "../../app/store";
import { FilterComponent } from "./Filter.component";

export const FilterContainer = () => {
  const { store, dispatch } = useContext(StoreContext);

  const handleOnChange = useCallback(
    e => {
      dispatch(changeFilter(e.target.value));
    },
    [dispatch]
  );

  return (
    <FilterComponent value={store.filter} handleOnChange={handleOnChange} />
  );
};
