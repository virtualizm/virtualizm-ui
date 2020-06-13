import React, { useEffect, useContext, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import pretty from "prettysize";
import { Descriptions, Table, Tag } from "antd";
import { fetchStorageVolumes } from "../../utils/api";
import { sortNumbers, sortStrings } from "../../utils/tableSorters";
import {
  StoreContext,
  startLoading,
  stopLoading,
  addStorageVolumes,
} from "../../app/store";

import { StoragePoolLink, HypervisorLink } from "../../components/Links";

const renderType = (type) => {
  return <Tag color="blue">{type}</Tag>;
};

const renderMachine = (list) => {
  return list.map((mc) => (
    <Link to={"/virtual_machines/" + mc.id}>
      {mc.name}
      <br />
    </Link>
  ));
};

const StorageVolumes = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { isLoading, storageVolumes, filter } = store;

  const dataSource = useMemo(() => {
    return storageVolumes.filter(
      (storageVolume) =>
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
      loading={isLoading}
      rowKey="id"
      columns={[
        {
          title: "Hypervisor",
          dataIndex: "hypervisor",
          key: "hypervisor",
          render: (hypervisor) => <HypervisorLink hv={hypervisor} />,
          sorter: (a, b) => sortStrings(a.hypervisor.name, b.hypervisor.name),
        },
        {
          title: "Virtual Machines",
          dataIndex: "virtualMachines",
          key: "virtualMachines",
          render: (machine) => renderMachine(machine),
          sorter: (a, b) => sortStrings(a.hypervisor.name, b.hypervisor.name),
        },
        {
          title: "Storage Pool",
          dataIndex: "pool",
          key: "pool",
          render: (pool) => <StoragePoolLink pool={pool} />,
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
          dataIndex: "volume_type",
          key: "volume_type",
          render: renderType,
          sorter: (a, b) => sortStrings(a.volume_type, b.volume_type),
        },
        {
          title: "Capacity",
          dataIndex: "capacity",
          key: "capacity",
          render: pretty,
          sorter: (a, b) => sortNumbers(a.capacity, b.capacity),
        },
        {
          title: "Allocation",
          dataIndex: "allocation",
          key: "allocation",
          render: pretty,
          sorter: (a, b) => sortNumbers(a.allocation, b.allocation),
        },
        {
          title: "Physical",
          dataIndex: "physical",
          key: "physical",
          render: pretty,
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
      ]}
      expandable={{
        expandedRowRender: (record) => (
          <Descriptions>
            <Descriptions.Item label="Id">{record.id}</Descriptions.Item>
            <Descriptions.Item label="Physical size">
              {record.physical}
            </Descriptions.Item>
            <Descriptions.Item label="Capacity">
              {record.capacity}
            </Descriptions.Item>
            <Descriptions.Item label="Allocation">
              {record.allocation}
            </Descriptions.Item>
            <Descriptions.Item label="Key">{record.key}</Descriptions.Item>
          </Descriptions>
        ),
      }}
      pagination={{ showSizeChanger: true }}
    />
  );
};

export default StorageVolumes;
