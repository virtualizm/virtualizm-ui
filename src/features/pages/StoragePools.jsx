import React, { useEffect, useContext, useCallback, useMemo } from "react";
import pretty from "prettysize";
import { Descriptions, Table, Tag } from "antd";
import { fetchStoragePools } from "../../utils/api";
import { sortNumbers, sortStrings } from "../../utils/tableSorters";
import {
  StoreContext,
  startLoading,
  stopLoading,
  addStoragePools,
} from "../../app/store";

const renderState = (state) => {
  const color = state === "running" ? "green" : "red";
  return <Tag color={color}>{state}</Tag>;
};

const renderType = (type) => {
  return <Tag color="blue">{type}</Tag>;
};

const StoragePools = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { isLoading, storagePools, filter } = store;

  const dataSource = useMemo(() => {
    return storagePools.filter(
      (storagePool) =>
        storagePool.id.includes(filter) ||
        storagePool.name.includes(filter) ||
        storagePool.target_path.includes(filter) ||
        storagePool.hypervisor.name.includes(filter)
    );
  }, [filter, storagePools]);

  const fetchData = useCallback(async () => {
    dispatch(startLoading());
    const json = await fetchStoragePools();

    if (!json.errors) {
      dispatch(addStoragePools(json.data));
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
          title: "Hypervisor",
          dataIndex: ["hypervisor", "name"],
          key: "hypervisor",
          sorter: (a, b) => sortStrings(a.hypervisor, b.hypervisor),
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => sortStrings(a.name, b.name),
        },
        {
          title: "State",
          dataIndex: "state",
          key: "state",
          render: renderState,
          sorter: (a, b) => sortStrings(a.state, b.state),
        },
        {
          title: "Type",
          dataIndex: "pool_type",
          key: "pool_type",
          render: renderType,
          sorter: (a, b) => sortStrings(a.pool_type, b.pool_type),
        },

        {
          title: "Capacity",
          dataIndex: "capacity",
          key: "capacity",
          render: (capacity) => pretty(capacity),
          sorter: (a, b) => sortNumbers(a.capacity, b.capacity),
        },
        {
          title: "Allocation",
          dataIndex: "allocation",
          key: "allocation",
          render: (allocation) => pretty(allocation),
          sorter: (a, b) => sortNumbers(a.allocation, b.allocation),
        },
        {
          title: "Available",
          dataIndex: "available",
          key: "available",
          render: (available) => pretty(available),
          sorter: (a, b) => sortNumbers(a.available, b.available),
        },
        {
          title: "Target Path",
          dataIndex: "target_path",
          key: "target_path",
          sorter: (a, b) => sortStrings(a.target_path, b.target_path),
        },
      ]}
      expandable={{
        expandedRowRender: (record) => (
          <Descriptions>
            <Descriptions.Item label="Capacity">
              {record.capacity}
            </Descriptions.Item>
            <Descriptions.Item label="Allocation">
              {record.allocation}
            </Descriptions.Item>
            <Descriptions.Item label="Available">
              {record.available}
            </Descriptions.Item>
          </Descriptions>
        ),
      }}
      pagination={{ showSizeChanger: true }}
    />
  );
};

export default StoragePools;
