import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Space } from "antd";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";

export default function Header() {
  return (
    <Flex align="center" gap={6} justify="space-between" vertical={false}>
      {/* <Image src="" alt="" /> */}
      <Link href={"/"}>
        <Flex align="center" justify="space-between" gap={6}>
          <Image src={"/logo.png"} alt="logo" width={56} height={56} />
          <div>Safe Wallet</div>
        </Flex>
      </Link>

      <Flex flex={1} align="center" gap={6} justify="flex-end">
        <div>
          <ConnectButton chainStatus="none" />
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </Flex>
    </Flex>
  );
}
