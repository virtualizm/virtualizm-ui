import React, { useEffect, useContext, useCallback, useMemo } from "react";
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
  return <Link to={"/storage-pools/"+pool.id}>{pool.name}</Link>;
};

const renderHypervisor = hv => {
  return <Link to={"/hypervisors/"+hv.id}>{hv.name}</Link>;
};

const StorageVolumes = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { isLoading, storageVolumes, filter } = store;

  const dataSource = useMemo(() => {
    return storageVolumes.filter(
      storageVolume =>
        storageVolume.id.includes(filter) ||
        storageVolume.name.includes(filter) ||
        storageVolume.target_path.includes(filter) ||
        storageVolume.key.includes(filter) ||
        storageVolume.hypervisor.name.includes(filter) ||
        storageVolume.pool.name.includes(filter)
    );
  }, [filter, storageVolumes]);


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
      dataSource={dataSource}
      isLoading={isLoading}
      columns={[
        { title: "Id", dataIndex: "id", key: "id" },
        {
            title: "Hypervisor",
            dataIndex: "hypervisor",
            key: "hypervisor",
            render: hypervisor=>renderHypervisor(hypervisor),
            sorter: (a, b) => sortStrings(a.hypervisor.name, b.hypervisor.name),
        },
        {
            title: "StoragePool",
            dataIndex: "pool",
            key: "pool",
            render: pool=>renderStoragePool(pool),
            sorter: (a, b) => sortStrings(a.pool.name, b.pool.name),
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
        },
        {
          title: "Target Format",
          dataIndex: "target_format",
          key: "target_format",
          sorter: (a, b) => sortStrings(a.target_format, b.target_format),
        },
	{
          title: "Key",
          dataIndex: "key",
          key: "key",
          sorter: (a, b) => sortStrings(a.key, b.key),
        }
      ]}
      pagination={{ showSizeChanger: true }}
    />
  );
};

export default StorageVolumes;
