import React from "react";
import PropTypes from "prop-types";
import { Layout, Button } from "antd";
import { Filter } from "../Filter";

const { Header } = Layout;
const headerStyles = { padding: "0 16px" };

const Container = props => {
  const { handleClose, showBackBtn } = props;

  return (
    <Header style={headerStyles}>
      {showBackBtn ? <Button onClick={handleClose}>Close</Button> : <Filter />}
    </Header>
  );
};

Container.propTypes = {
  handleClose: PropTypes.func.isRequired,
  showBackBtn: PropTypes.bool.isRequired,
};

export const HeaderComponent = React.memo(Container);
