import React from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import Hypervisors from "./pages/Hypervisors";
import VirtualMachines from "./pages/VirtualMachines";
import StoragePools from "./pages/StoragePools";
import StorageVolumes from "./pages/StorageVolumes";
import MachineInfo from "./pages/MachineInfo";
import { Header } from "./Header";
import { SideMenu } from "./SideMenu";

const { Content } = Layout;

const contentStyles = {
  margin: "0",
  paddingTop: "16px",
  background: "#fff",
  padding: "24px",
  minHeight: "280px",
};

export default function Dashboard() {
  const [closed, setClose] = React.useState(true);

  const layoutStyles = {
    minHeight: "100vh",
    transition: "margin-left 200ms",
    marginLeft: closed ? 80 : 200,
  };

  return (
    <Layout style={layoutStyles}>
      <SideMenu collapsible collapsed={closed} onCollapse={setClose} />
      <Layout className="site-layout">
        <Header />
        <Content style={contentStyles}>
          <div className="site-layout-content">
            <Route path="/virtual_machines/:id" exact>
              <MachineInfo />
            </Route>

            <Route path="/virtual_machines" exact>
              <VirtualMachines />
            </Route>

            <Route path="/hypervisors">
              <Hypervisors />
            </Route>

            <Route path="/storage-pools">
              <StoragePools />
            </Route>

            <Route path="/storage-volumes">
              <StorageVolumes />
            </Route>

            {/* <Route path="*">
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary">Back Home</Button>}
            />
          </Route> */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
