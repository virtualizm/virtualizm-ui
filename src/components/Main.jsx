import React from "react";
import { Layout } from "antd";
import Hypervisors from "./pages/Hypervisors";
import VirtualMachines from "./pages/VirtualMachines";
import MachineInfo from "./pages/MachineInfo";
import SideMenu from "./Menu";
import { Route } from "react-router-dom";

const { Sider, Header, Content, Footer } = Layout;

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={open} onCollapse={setOpen}>
        <div className="logo" />
        <SideMenu />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px", paddingTop: "16px" }}>
          <Route path="/virtual_machines/:id">
            <MachineInfo />
          </Route>

          <Route path="/virtual_machines">
            <VirtualMachines />
          </Route>

          <Route path="/hypervisors">
            <Hypervisors />
          </Route>
        </Content>
        <Footer style={{ textAlign: "center" }}>Virtualizm.org</Footer>
      </Layout>
    </Layout>
  );
}
