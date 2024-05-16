import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    borderRadius: 12,
    colorBgContainer: "#FFFFFF",
    colorBgContainerDisabled: "#9CA0AC",
    colorTextDisabled: "#fff",
    controlHeight: 50,

    // colorPrimary: "#52c41a",
  },
  components: {
    Table: {
      cellFontSize: 12,
      cellFontSizeSM: 12,
      headerSplitColor: "transparent",
    },

    Form: {
      labelFontSize: 16,
      labelHeight: 23,
    },
  },
};

export default theme;
