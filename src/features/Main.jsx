import React from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import Hypervisors from "./pages/Hypervisors";
import VirtualMachines from "./pages/VirtualMachines";
import MachineInfo from "./pages/MachineInfo";
import { Header } from "./Header";
import { SideMenu } from "./SideMenu";

const { Sider, Content, Footer } = Layout;

const layoutStyles = { minHeight: "100vh" };
const contentStyles = {
  margin: "0",
  paddingTop: "16px",
  background: "#fff",
  padding: "24px",
  "min-height": "280px",
};

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);

  return (
    <Layout style={layoutStyles}>
      <Sider collapsible collapsed={open} onCollapse={setOpen}>
        <SideMenu />
      </Sider>
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
        <Footer style={{ textAlign: "center" }}>Virtualizm.org</Footer>
      </Layout>
    </Layout>
  );
}
