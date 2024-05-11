import { Flex, Typography } from "antd";
// import Image from "next/image";

const { Title, Text } = Typography;

export default function Page() {
  return (
    <>
      <Typography>
        <Title>Introduction</Title>
        <Flex>
          <Flex>
            <div>
              {/* <Image src="" alt="" /> */}
              <Text>PEG</Text>
            </div>
            <div>12,223,516.00</div>
          </Flex>
        </Flex>
      </Typography>
    </>
  );
}
