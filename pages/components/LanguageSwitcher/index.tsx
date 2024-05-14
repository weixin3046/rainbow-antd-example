import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation("common");
  const router = useRouter();
  const { pathname, asPath, query } = router;
  console.log(router);

  const items: MenuProps["items"] = [
    {
      key: "zh-CN",
      // label: <div onClick={() => i18n.changeLanguage("zh")}>简体中文</div>,
      label: (
        <div
          onClick={() =>
            router.push({ pathname, query }, asPath, { locale: "zh-CN" })
          }
        >
          简体中文
        </div>
      ),
    },
    {
      key: "en",
      // label: <div onClick={() => i18n.changeLanguage("en")}>English</div>,
      label: (
        <div
          onClick={() =>
            router.push({ pathname, query }, asPath, { locale: "en" })
          }
        >
          English
        </div>
      ),
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
