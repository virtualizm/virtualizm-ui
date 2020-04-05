import React, { useEffect, useContext, useCallback } from "react";
import pretty from "prettysize";
import { Table, Tag } from "antd";
import { fetchHypervisors } from "../../utils/api";
import {
  StoreContext,
  startLoading,
  stopLoading,
  addHypervisors,
} from "../../app/store";

const renderState = connected => {
  const [color, state] = connected ? ["green", "connected"] : ["red", "disconnected"];
  return <Tag color={color}>{state}</Tag>;
};

const Hypervisors = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { isLoading, hypervisors } = store;

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
      dataSource={hypervisors}
      isLoading={isLoading}
      columns={[
        { title: "Id", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        {
          title: "State",
          dataIndex: "connected",
          key: "connected",
          render: renderState
        },
        { title: "CPUs", dataIndex: "cpus", key: "cpus" },
        { title: "Max vCPUs", dataIndex: "max_vcpus", key: "max_vcpus" },
        { title: "MHz", dataIndex: "mhz", key: "mhz" },
        {
          title: "Total Memory",
          dataIndex: "total_memory",
          key: "total_memory",
          render: total_memory => pretty(total_memory),
        },
        {
          title: "Free Memory",
          dataIndex: "free_memory",
          key: "free_memory",
          render: total_memory => pretty(total_memory),
        },
        { title: "QEMU Version", dataIndex: "version", key: "version" },
        { title: "Libvirt Version", dataIndex: "libversion", key: "libversion" },

      ]}
      pagination={{ showSizeChanger: true }}
    />
  );
};

export default Hypervisors;
