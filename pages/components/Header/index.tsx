import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Space } from "antd";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";

const boxStyle: React.CSSProperties = {
  width: "100%",
  height: 64,
  borderRadius: 6,
};

const Logo = {
  width: " 30px",
  height: "30px",

  background:
    "radial-gradient(50% 50% at 50% 50%, rgba(254, 231, 185, 0) 0%, #DBECFF 100%)",
};

export default function Header() {
  return (
    <Flex align="center" justify="space-between" style={boxStyle}>
      <div>
        {/* <Image src="" alt="" /> */}
        <Link href={"/"}>
          <div style={Logo}></div>
        </Link>
      </div>

      <Space align="center">
        <ConnectButton />
        <LanguageSwitcher />
      </Space>
    </Flex>
  );
}
