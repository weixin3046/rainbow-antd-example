import { Drawer as AntdDrawer, DrawerProps } from "antd";
import { createStyles, useTheme } from "antd-style";
import type {
  DrawerClassNames,
  DrawerStyles,
} from "antd/es/drawer/DrawerPanel";

const useStyle = createStyles(({ token }) => ({
  "my-drawer-body": {
    background: "#F8FAFF",
  },
  "my-drawer-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-drawer-header": {
    background: "#F8FAFF",
  },
  "my-drawer-footer": {
    color: token.colorPrimary,
  },
  "my-drawer-content": {
    borderLeft: "0px",
    background: "#F8FAFF",
  },
  "my-drawer-content-wraaper": {
    borderRadius: "20px 20px 0px 0px",
    boxShadow: "none !important",
  },
}));

interface CustomDrawerProps extends DrawerProps {}
const Drawer: React.FC<CustomDrawerProps> = ({ children, ...rest }) => {
  const { styles } = useStyle();
  const token = useTheme();

  const classNames: DrawerClassNames = {
    body: styles["my-drawer-body"],
    mask: styles["my-drawer-mask"],
    header: styles["my-drawer-header"],
    footer: styles["my-drawer-footer"],
    content: styles["my-drawer-content"],
    wrapper: styles["my-drawer-content-wraaper"],
  };
  const drawerStyles: DrawerStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
    content: {
      //   boxShadow: "-10px 0 10px #666",
      borderRadius: "40px 40px 0px 0px",
    },
    header: {
      borderBottom: `0px solid ${token.colorPrimary}`,
    },
    body: {
      fontSize: token.fontSizeLG,
    },
    footer: {
      borderTop: `0px`,
      background: "#F8FAFF",
    },
  };
  return (
    <div>
      <AntdDrawer classNames={classNames} styles={drawerStyles} {...rest}>
        {children}
      </AntdDrawer>
    </div>
  );
};
export default Drawer;
