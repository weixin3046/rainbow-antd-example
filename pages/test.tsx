import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import Image from "next/image";
import type { TableProps } from "antd";
import { useMemo, useState } from "react";
import Drawer from "./components/Drawer";
import { LeftOutlined } from "@ant-design/icons";
import { shortenAddress } from "../utils";
import {
  useAccount,
  useEstimateGas,
  useReadContract,
  useSendTransaction,
} from "wagmi";
import {
  Address,
  parseEther,
  parseUnits,
  getAddress,
  parseAbiParameters,
  encodeAbiParameters,
  stringToBytes,
  encodeFunctionData,
  erc20Abi,
  toHex,
  formatUnits,
  parseGwei,
  formatGwei,
  fromHex,
} from "viem";
import TokenBalance from "./components/Balance";
import MultiSigBank from "../abi/MultiSigBank.json";
import { config, tokenList } from "../config";
import { simulateContract, writeContract, getToken } from "@wagmi/core";
import { abi } from "../abi/abi";
import ActivityTable from "./components/Activity";
import Owners from "./components/Owners";

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
interface DataType {
  destination: string;
  value: bigint;
  executed: boolean;
  submitter: Address;
  description: `0x${string}`;
}

export default function Page() {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drawerBack, setDrawerBack] = useState(false);
  const [form] = Form.useForm();
  const [previewModal, setPreviewModal] = useState(false);
  const [dataForm, setDataForm] = useState({
    address: "",
    amount: "0",
    symbol: "",
  });
  // const { data: gasData, status } = useEstimateGas();
  // console.log(status === "success" && formatGwei(gasData));

  const showModal = () => {
    setOpen(true);
  };
  const showPreview = () => {
    setPreviewModal(true);
  };

  const onFinish = async (values: any) => {
    setDataForm(values);
    setLoading(true);
    const token = tokenList.find((obj) => obj.address === values.symbol);
    const description = toHex(token!.symbol, { size: 32 });
    try {
      const { decimals } = await getToken(config, {
        address: values.symbol,
      });
      const amount = parseUnits(values.amount.toString(), decimals);

      const address = values.address;
      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [address, amount],
      });
      const { request } = await simulateContract(config, {
        abi: MultiSigBank.abi,
        address: MultiSigBank.address as Address,
        functionName: "submitTransaction",
        args: [address, amount, data, description],
      });

      const hash = await writeContract(config, request);
      console.log(hash);
      setDrawerBack(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onClose = () => {
    setOpen(false);
  };
  // confirmTransaction 确认提案

  //revokeConfirmation 取消提案
  const revokeConfirmation = async ({ id }: { id: number }) => {
    // messageApi.open({
    //   key,
    //   type: 'loading',
    //   content: 'Loading...',
    // });
    try {
      const { request } = await simulateContract(config, {
        abi: MultiSigBank.abi,
        address: MultiSigBank.address as Address,
        functionName: "revokeConfirmation",
        args: [id],
      });
      const hash = await writeContract(config, request);
      console.log(hash);
    } catch (error) {
      console.log(error);
    }
  };

  //executeTransaction 执行提案
  const executeTransaction = async ({ id }: { id: number }) => {
    // messageApi.open({
    //   key,
    //   type: 'loading',
    //   content: 'Loading...',
    // });
    try {
      const { request } = await simulateContract(config, {
        abi: MultiSigBank.abi,
        address: MultiSigBank.address as Address,
        functionName: "executeTransaction",
        args: [id],
      });
      const hash = await writeContract(config, request);
      console.log(hash);
    } catch (error) {
      console.log(error);
    }
  };

  // 提案发布者废弃提案：discardTransaction

  return (
    <div
      style={{
        padding: "15px",
      }}
    >
      <Typography>
        <Flex vertical align="flex-start">
          <Title level={3}>Wallet Address</Title>
          <Paragraph
            copyable
            style={{
              padding: "15px",
              background: "#F8F8FA",
              borderRadius: 12,
              color: "#666",
              width: "100%",
              textAlign: "left",
            }}
          >
            {address}
          </Paragraph>
        </Flex>

        <div>
          <Title
            level={3}
            style={{
              textAlign: "left",
            }}
          >
            Introduction
          </Title>
          <div>
            {tokenList.map((item) => (
              <Flex
                align="center"
                justify="space-between"
                key={item.address}
                style={{
                  borderRadius: 12,
                  border: "1px solid #C1D2FF",
                  padding: "12px 15px",
                  marginBottom: 12,
                }}
              >
                <Flex align="center" gap={12}>
                  <Image src="/peg.svg" width={22} height={22} alt="icon" />
                  <Text>{item.symbol}</Text>
                </Flex>
                <Text>
                  <TokenBalance token={item.address} />
                </Text>
              </Flex>
            ))}
          </div>
        </div>

        <div style={{ paddingBottom: 25 }}>
          <Title level={3} style={{ textAlign: "left" }}>
            Activity
          </Title>
          <ActivityTable address={address} />
        </div>

        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <Button onClick={showModal} type="primary" block shape="round">
            send
          </Button>
          <Button onClick={showPreview} block shape="round">
            Safe Account
          </Button>
        </Space>
        {/* <Button
          block
          onClick={() => revokeConfirmation({ id: 0 })}
          shape="round"
        >
          取消 Test
        </Button>
        <Button
          block
          onClick={() => executeTransaction({ id: 1 })}
          shape="round"
        >
          执行 Test
        </Button> */}

        <Owners open={previewModal} onClose={() => setPreviewModal(false)} />

        <Drawer
          title={<div style={{ textAlign: "center" }}>Send</div>}
          placement={"bottom"}
          closable={false}
          onClose={onClose}
          open={open}
          key={"submitTransaction"}
          height={486}
          loading={loading}
        >
          <div>
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Address"
                name={"address"}
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input
                  count={{
                    show: true,
                    max: 42,
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Asset"
                name={"symbol"}
                rules={[
                  { required: true, message: "Please select your Asset!" },
                ]}
              >
                <Select placeholder="Please select">
                  {tokenList.map((token) => (
                    <Option key={token.address} value={token.address}>
                      {token.symbol}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Amount"
                name={"amount"}
                rules={[
                  { required: true, message: "Please input your amount!" },
                ]}
              >
                <InputNumber
                  placeholder="Asset Amount"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item>
                <Button block shape="round" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Drawer>
      </Typography>
    </div>
  );
}
