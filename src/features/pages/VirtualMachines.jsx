import React, { useEffect, useContext, useCallback, useMemo } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Table, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import pretty from "prettysize";
import { fetchVirtualMachines } from "../../utils/api";
import { sortNumbers, sortStrings } from "../../utils/tableSorters";
import {
  addMachines,
  startLoading,
  stopLoading,
  StoreContext,
} from "../../app/store";

import { RunningState, Persistent } from "../../components/Tags";
import { HypervisorLink } from "../../components/Links";
import { TagsList } from "../../components/Tags";

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
      (machine) =>
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
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => sortStrings(a.name, b.name),
          },
          {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags, record) => <TagsList tags={tags} />,
          },
          {
            title: "State",
            dataIndex: "state",
            key: "state",
            render: (state) => <RunningState state={state} />,
            sorter: (a, b) => sortStrings(a.state, b.state),
          },
          {
            title: "Type",
            dataIndex: "is_persistent",
            key: "is_persistent",
            render: (type) => <Persistent isPersistent={type} />,
            sorter: (a, b) => sortStrings(a.is_persistent, b.is_persistent),
          },
          {
            title: "memory",
            dataIndex: "memory",
            key: "memory",
            render: (memory) => pretty(memory),
            sorter: (a, b) => sortNumbers(a.memory, b.memory),
          },
          {
            title: "CPUs",
            dataIndex: "cpus",
            key: "cpus",
            sorter: (a, b) => sortNumbers(a.cpus, b.cpus),
          },
          {
            title: "Hypervisor",
            dataIndex: "hypervisor",
            key: "hypervisor",
            render: (hypervisor) => <HypervisorLink hv={hypervisor} />,
            sorter: (a, b) => sortStrings(a.hypervisor, b.hypervisor),
          },
        ]}
        pagination={{ showSizeChanger: true }}
      />
    </React.Fragment>
  );
};

export default withRouter(VirtualMachines);
