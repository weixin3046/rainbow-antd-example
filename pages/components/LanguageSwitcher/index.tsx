import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation("common");

  const items: MenuProps["items"] = [
    {
      key: "zh-CN",
      label: <div onClick={() => i18n.changeLanguage("zh")}>简体中文</div>,
    },
    {
      key: "en",
      label: <div onClick={() => i18n.changeLanguage("en")}>English</div>,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <div>
        <GlobalOutlined style={{ fontSize: 25 }} />
      </div>
    </Dropdown>
  );
}
