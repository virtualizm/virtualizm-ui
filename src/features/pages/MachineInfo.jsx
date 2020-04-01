import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { Tabs } from "antd";
import { Console, Details, Xml } from "./VirtualMachineInfo";
import { StoreContext } from "../../app/store";

const { TabPane } = Tabs;

const MachineInfo = props => {
  const param = props.match.params.id;

  const { store } = useContext(StoreContext);

  const item = store.machines.find(({ id }) => id === param);

  if (!item) {
    return null;
  }

  const { xml, ...fields } = item;

  return (
    <div className="modal">
      <Tabs defaultActiveKey={1} animated={false}>
        <TabPane tab="General" key="1">
          <Details data={fields} />
        </TabPane>
        <TabPane tab="XML" key="2">
          <Xml xml={xml} />
        </TabPane>
        <TabPane tab="Console" key="3">
          <Console id={param} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default withRouter(MachineInfo);
