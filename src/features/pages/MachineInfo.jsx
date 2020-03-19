import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Tabs, Button } from "antd";
import { Console, Details, Xml } from "./VirtualMachineInfo";
import { StoreContext } from "../../app/store";

const { TabPane } = Tabs;

const MachineInfo = props => {
  const param = props.match.params.id;

  const { store } = useContext(StoreContext);

  function handleClose() {
    props.history.push("/virtual_machines");
  }

  const item = store.machines.find(({ id }) => id === param);

  if (!item) {
    return null;
  }

  const { xml, ...fields } = item;

  return (
    <div className="modal">
      <>
        <Button onClick={handleClose}>Close</Button>
        <Tabs defaultActiveKey={1} animated={false}>
          <TabPane tab="General" key="1">
            <Details data={fields} />
          </TabPane>
          <TabPane tab="XML" key="2">
            <Xml xml={xml} />
          </TabPane>
          <TabPane tab="Console" key="3">
            <Console />
          </TabPane>
        </Tabs>
      </>
    </div>
  );
};

export default withRouter(MachineInfo);
