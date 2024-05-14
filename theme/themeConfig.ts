import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    controlHeight: 48,
    borderRadius: 12,
    colorBgContainer: "#FFFFFF",
    colorBgContainerDisabled: "#9CA0AC",
    colorTextDisabled: "#fff",
    // colorPrimary: "#52c41a",
  },
  components: {
    Table: {
      cellFontSize: 12,
      headerSplitColor: "transparent",
    },
    Form: {
      labelFontSize: 16,
    },
  },
};

export default theme;
