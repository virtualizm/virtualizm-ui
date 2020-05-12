import React, { useEffect, useContext, useCallback, useMemo } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Table, Button, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import pretty from "prettysize";
import { fetchVirtualMachines } from "../../utils/api";
import {
  addMachines,
  startLoading,
  stopLoading,
  StoreContext,
} from "../../app/store";

const renderLabel = state => {
  const color = state === "running" ? "green" : "red";

  return <Tag color={color}>{state}</Tag>;
};

const renderType = isPersistent => {
  if (isPersistent) {
    return <Tag color="blue">Persistent</Tag>;
  }
  return <Tag color="orange">Transient</Tag>;
};

const renderTag = tags => {
  return tags.map(tag => (<Tag color="blue">{tag}</Tag>));
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

  const { isLoading, machines, filter } = store;

  const dataSource = useMemo(() => {
    return machines.filter(
      machine =>
        machine.id.includes(filter) ||
        machine.name.includes(filter) ||
        machine.state.includes(filter) ||
        machine.hypervisor.name.includes(filter)
    );
  }, [filter, machines]);

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
        size="middle"
        dataSource={dataSource}
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
          { title: "Tags", dataIndex: "tags", key: "tags", render: renderTag },
          {
            title: "State",
            dataIndex: "state",
            key: "state",
            render: renderLabel,
          },
          {
            title: "Type",
            dataIndex: "is_persistent",
            key: "is_persistent",
            render: renderType,
          },
          {
            title: "memory",
            dataIndex: "memory",
            key: "memory",
            sorter: (a, b) => a.memory - b.memory,
            render: memory => pretty(memory),
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
