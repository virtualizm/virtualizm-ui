import React, { useMemo } from "react";
import { Descriptions, Table, Divider } from "antd";
import pretty from "prettysize";
import { RunningState, Persistent } from "../../../components/Tags";
import { TagsEdit } from "../../TagsEdit";
import { HypervisorLink } from "../../../components/Links";

export const Details = ({ data }) => {
  const disks = useMemo(() => data.disks, [data]);

  return (
    <>
      <Descriptions column={2}>
        <Descriptions.Item label="Id">{data.id}</Descriptions.Item>
        <Descriptions.Item label="State">
          <RunningState state={data.state} />
        </Descriptions.Item>
        <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Type">
          <Persistent isPersistent={data.is_persistent} />
        </Descriptions.Item>
        <Descriptions.Item label="Tags">
          <TagsEdit vmId={data.id} vmTags={data.tags} />
        </Descriptions.Item>
        <Descriptions.Item label="Memory">
          {pretty(data.memory)}
        </Descriptions.Item>
        <Descriptions.Item label="Hypervisor">
          <HypervisorLink hv={data.hypervisor} />
        </Descriptions.Item>
        <Descriptions.Item label="CPUs">{data.cpus}</Descriptions.Item>
      </Descriptions>
      <Divider>Storage Devices</Divider>
      <Table
        dataSource={disks}
        pagination={false}
        size="small"
        bordered="true"
        columns={[
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
          },
          {
            title: "Device",
            dataIndex: "device",
            key: "device",
          },
          {
            title: "Source",
            dataIndex: "source_dev",
            key: "source_dev",
          },
        ]}
      />
    </>
  );
};
