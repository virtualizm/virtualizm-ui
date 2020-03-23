import React, { useEffect, useContext, useCallback } from "react";
import pretty from "prettysize";
import { Table } from "antd";
import { fetchHypervisors } from "../../utils/api";
import {
  StoreContext,
  startLoading,
  stopLoading,
  addHypervisors,
} from "../../app/store";

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
        { title: "CPUs", dataIndex: "cpus", key: "cpus" },
        { title: "mhz", dataIndex: "mhz", key: "mhz" },
        {
          title: "Total Memory",
          dataIndex: "total_memory",
          key: "total_memory",
          render: total_memory => pretty(total_memory),
        },
      ]}
      pagination={{ showSizeChanger: true }}
    />
  );
};

export default Hypervisors;
