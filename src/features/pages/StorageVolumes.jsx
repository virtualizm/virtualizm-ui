import React, { useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import pretty from "prettysize";
import { Table, Tag } from "antd";
import { fetchStorageVolumes } from "../../utils/api";
import { sortNumbers, sortStrings } from "../../utils/tableSorters";
import {
  StoreContext,
  startLoading,
  stopLoading,
  addStorageVolumes,
} from "../../app/store";

const renderType = type => {
  return <Tag color="blue">{type}</Tag>;
};

const renderSize = size => {
  return `${pretty(size)} (${size})`;
};

const renderStoragePool = pool => {
  return <Link to="/storage-pools/{vm.}">vm.name</Link>;
};

const StorageVolumes = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { isLoading, storage_volumes } = store;

  const fetchData = useCallback(async () => {
    dispatch(startLoading());
    const json = await fetchStorageVolumes();

    if (!json.errors) {
      dispatch(addStorageVolumes(json.data));
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
      dataSource={storage_volumes}
      isLoading={isLoading}
      columns={[
        { title: "Id", dataIndex: "id", key: "id" },
        {
            title: "Hypervisor",
            dataIndex: ["hypervisor", "name"],
            key: "hypervisor",
            sorter: (a, b) => sortStrings(a.hypervisor, b.hypervisor),
        },
        {
            title: "StoragePool",
            dataIndex: ["pool", "name"],
            key: "pool",
            render: pool=>renderStoragePool(pool),
            sorter: (a, b) => sortStrings(a.pool, b.pool),
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => sortStrings(a.name, b.name),
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
          render: renderType,
          sorter: (a, b) => sortStrings(a.type, b.type),
        },
        {
          title: "Capacity",
          dataIndex: "capacity",
          key: "capacity",
          render: capacity=>renderSize(capacity),
          sorter: (a, b) => sortNumbers(a.capacity, b.capacity),
        },
        {
          title: "Allocation",
          dataIndex: "allocation",
          key: "allocation",
          render: allocation=>renderSize(allocation),
          sorter: (a, b) => sortNumbers(a.allocation, b.allocation),
        },
        {
          title: "Physical",
          dataIndex: "physical",
          key: "physical",
          render: physical=>renderSize(physical),
          sorter: (a, b) => sortNumbers(a.physical, b.physical),
        },
        {
          title: "Target Path",
          dataIndex: "target_path",
          key: "target_path",
          sorter: (a, b) => sortStrings(a.target_path, b.target_path),
        }
      ]}
      pagination={{ showSizeChanger: true }}
    />
  );
};

export default StorageVolumes;
