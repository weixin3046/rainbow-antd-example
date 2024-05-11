import { Dropdown } from "antd";
import type { ConfigProviderProps, MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";

const items: MenuProps["items"] = [
  {
    key: "zh-CN",
    label: <div>简体中文</div>,
  },
  {
    key: "en",
    label: <div>English</div>,
  },
  // {
  //   key: "3",
  //   label: <div>繁体中文</div>,
  // },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    console.log(router);
    // router.locale = key;
    router.push(router.pathname, undefined, { locale: key });
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <div>
        <GlobalOutlined style={{ fontSize: 25 }} />
      </div>
    </Dropdown>
  );
}
