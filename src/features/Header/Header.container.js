import React, { useCallback, useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { HeaderComponent } from "./Header.component";
import { StoreContext } from "../../app/store";

const Container = props => {
  const history = useHistory();
  const { store } = useContext(StoreContext);

  const handleClose = useCallback(() => {
    history.push("/virtual_machines");
  }, [history]);

  const route = useRouteMatch("/virtual_machines/:id");

  const showBackBtn = !!route;
  const id = route ? route.params.id : null;
  const openedVm = store.machines.find(({ id: _id }) => _id === id);

  const name = openedVm ? openedVm.name : "";
  const state = openedVm ? openedVm.state : "";

  return (
    <HeaderComponent
      handleClose={handleClose}
      showBackBtn={showBackBtn}
      id={id}
      name={name}
      state={state}
    />
  );
};

export const HeaderContainer = React.memo(Container);
