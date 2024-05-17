import { Flex, Layout as AntdLayout } from "antd";
import { ReactNode } from "react";
import Header from "../Header";

const { Header: AntdHeader, Footer, Content } = AntdLayout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 88,
  paddingInline: 20,
  lineHeight: "88px",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  // lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#fff",
};

const layoutStyle = {
  // borderRadius: 8,
  overflow: "hidden",
  // width: "600px",
  maxWidth: "600px",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AntdLayout style={layoutStyle}>
      <AntdHeader style={headerStyle}>
        <Header />
      </AntdHeader>
      <Content style={contentStyle}>{children}</Content>
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </AntdLayout>
  );
}
