import React, { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { HeaderComponent } from "./Header.component";

const Container = props => {
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.push("/virtual_machines");
  }, [history]);

  const showBackBtn = !!useRouteMatch("/virtual_machines/:id");

  return (
    <HeaderComponent handleClose={handleClose} showBackBtn={showBackBtn} />
  );
};

export const HeaderContainer = React.memo(Container);
