import React, { useMemo } from "react";
import { Descriptions, Table } from "antd";
import pretty from "prettysize";
import { RunningState, Persistent } from "../../../components/Tags";
import { TagsList } from "../../../components/Tags";
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
          <TagsList tags={data.tags} />
        </Descriptions.Item>
        <Descriptions.Item label="Memory">
          {pretty(data.memory)}
        </Descriptions.Item>
        <Descriptions.Item label="Hypervisor">
          <HypervisorLink hv={data.hypervisor} />
        </Descriptions.Item>
        <Descriptions.Item label="CPUs">{data.cpus}</Descriptions.Item>
      </Descriptions>
      <Table
        dataSource={disks}
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
