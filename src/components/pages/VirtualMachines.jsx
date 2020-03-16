import React, { useEffect, useContext, useCallback } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Table, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import pretty from "prettysize";
import { fetchVirtualMachines } from "../../utils/api";
import {
  addMachines,
  startLoading,
  stopLoading,
  StoreContext,
} from "../../StoreProvider";
import "../../App.scss";

const renderLabel = (_, { state }) => {
  const className = state === "running" ? "running" : "down";

  return <div className={`label ${className}`}>{state}</div>;
};

const Action = (_, { id }) => {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.push(`/virtual_machines/${id}`);
  }, [history, id]);

  return (
    <div className="row-action__btn" onClick={onClick}>
      <Button icon={<EyeOutlined />} shape="circle" />
    </div>
  );
};

const VirtualMachines = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { isLoading, machines } = store;

  const fetchData = useCallback(async () => {
    dispatch(startLoading());
    const json = await fetchVirtualMachines();

    if (!json.errors) {
      dispatch(addMachines(json.data));
    }

    dispatch(stopLoading());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <React.Fragment>
      <Table
        bordered
        dataSource={machines}
        isLoading={isLoading}
        columns={[
          {
            title: "Actions",
            dataIndex: "id",
            key: "actions",
            render: Action,
          },
          { title: "Id", dataIndex: "id", key: "id" },
          { title: "Name", dataIndex: "name", key: "name" },
          {
            title: "State",
            dataIndex: "state",
            key: "state",
            render: renderLabel,
          },
          {
            title: "memory",
            dataIndex: "memory",
            key: "memory",
            render: ({ memory }) => pretty(memory),
          },
          { title: "CPUs", dataIndex: "cpus", key: "cpus" },
          {
            title: "Hypervisor",
            dataIndex: ["hypervisor", "name"],
            key: "hypervisor",
          },
        ]}
        pagination={{ showSizeChanger: true }}
      />
    </React.Fragment>
  );
};

export default withRouter(VirtualMachines);
