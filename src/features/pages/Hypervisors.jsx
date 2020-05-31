import React, { useEffect, useContext, useCallback, useMemo } from "react";
import pretty from "prettysize";
import { Table, Tag } from "antd";
import { fetchHypervisors } from "../../utils/api";
import { sortNumbers, sortStrings } from "../../utils/tableSorters";
import {
  StoreContext,
  startLoading,
  stopLoading,
  addHypervisors,
} from "../../app/store";

import { Connected } from "../../components/Tags";

const Hypervisors = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { isLoading, hypervisors, filter } = store;

  const dataSource = useMemo(() => {
    return hypervisors.filter(
      (hypervisor) =>
        hypervisor.id.includes(filter) || hypervisor.name.includes(filter)
    );
  }, [filter, hypervisors]);

  const fetchData = useCallback(async () => {
    dispatch(startLoading());
    const json = await fetchHypervisors();

    if (!json.errors) {
      dispatch(addHypervisors(json.data));
    }

    dispatch(stopLoading());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Table
      bordered
      size="middle"
      dataSource={dataSource}
      isLoading={isLoading}
      columns={[
        { title: "Id", dataIndex: "id", key: "id" },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => sortStrings(a.name, b.name),
        },
        {
          title: "State",
          dataIndex: "connected",
          key: "connected",
          render: (connected) => <Connected connected={connected} />,
          sorter: (a, b) => sortStrings(a.connected, b.connected),
        },
        {
          title: "CPUs",
          dataIndex: "cpus",
          key: "cpus",
          sorter: (a, b) => sortNumbers(a.cpus, b.cpus),
        },
        {
          title: "Max vCPUs",
          dataIndex: "max_vcpus",
          key: "max_vcpus",
          sorter: (a, b) => sortNumbers(a.max_vcpus, b.max_vcpus),
        },
        {
          title: "MHz",
          dataIndex: "mhz",
          key: "mhz",
          sorter: (a, b) => sortNumbers(a.mhz, b.mhz),
        },
        {
          title: "Total Memory",
          dataIndex: "total_memory",
          key: "total_memory",
          render: (total_memory) => pretty(total_memory),
          sorter: (a, b) => sortNumbers(a.total_memory, b.total_memory),
        },
        {
          title: "Free Memory",
          dataIndex: "free_memory",
          key: "free_memory",
          render: (total_memory) => pretty(total_memory),
          sorter: (a, b) => sortNumbers(a.free_memory, b.free_memory),
        },
        {
          title: "QEMU Version",
          dataIndex: "version",
          key: "version",
          sorter: (a, b) => sortNumbers(a.version, b.version),
        },
        {
          title: "Libvirt Version",
          dataIndex: "libversion",
          key: "libversion",
          sorter: (a, b) => sortNumbers(a.libversion, b.libversion),
        },
      ]}
      pagination={{ showSizeChanger: true }}
    />
  );
};

export default Hypervisors;
