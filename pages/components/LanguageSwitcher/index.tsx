import { Dropdown, Space } from "antd";
import type { ConfigProviderProps, MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import zhTW from "antd/locale/zh_TW";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { LanguageContext } from "../LanguageProvider";
// import { useLanguage } from "../../Hooks/useLanguage";

type Locale = ConfigProviderProps["locale"];

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <div>简体中文</div>,
  },
  {
    key: "2",
    label: <div>English</div>,
  },
  {
    key: "3",
    label: <div>繁体中文</div>,
  },
];

export default function LanguageSwitcher() {
  //   const [locale, setLocale] = useState<Locale>(enUS);
  // const { language, toggleLanguage } = useLanguage();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    // toggleLanguage(key);
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <div>
        <GlobalOutlined style={{ fontSize: 25 }} />
      </div>
    </Dropdown>
  );
}
