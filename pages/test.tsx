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
import { useState } from "react";
import { useTranslation } from "next-i18next";
import Drawer from "./components/Drawer";
import { LeftOutlined } from "@ant-design/icons";
import { shortenAddress } from "../utils";

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
interface DataType {
  key: string;
  to: string;
  amount: number;
  symbol: string;
  state: boolean;
}
const Drawertitle: React.CSSProperties = {
  textAlign: "center",
  position: "relative",
};
const columns: TableProps<DataType>["columns"] = [
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: (text) => <a>{shortenAddress(text)}</a>,
  },
  {
    title: "Transaction",
    dataIndex: "transaction",
    key: "transaction",
    align: "right",
    render: (_, { amount, symbol }) => (
      <Space>
        <Text>{amount}</Text>
        <Text>{symbol}</Text>
      </Space>
    ),
  },
  {
    title: "Execute",
    dataIndex: "execute",
    key: "execute",
    align: "right",
    render: (_, { state }) => (
      <Space size="middle">
        {state ? <a>Execute</a> : <a>View on explorer</a>}
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    to: "0x4CD9C1a7898e03B9F202b534f0680089d8eb2694",
    amount: 32,
    symbol: "BNB",
    state: true,
  },
  {
    key: "2",
    to: "0x4CD9C1a7898e03B9F202b534f0680089d8eb2694",
    amount: 132,
    symbol: "BNB",
    state: false,
  },
  {
    key: "3",
    to: "0x4CD9C1a7898e03B9F202b534f0680089d8eb2694",
    amount: 322,
    symbol: "BNB",
    state: true,
  },
];

export default function Page() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drawerBack, setDrawerBack] = useState(false);
  const [form] = Form.useForm();

  const [dataForm, setDataForm] = useState({
    address: "",
    amount: 0,
    symbol: "",
  });
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const onFinish = (values: any) => {
    setDataForm(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDrawerBack(true);
    }, 3000);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
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
              padding: "30px",
              background: "#F8F8FA",
              borderRadius: 24,
              color: "#666",
              width: "100%",
              textAlign: "left",
            }}
          >
            0xCCd989123A1eaB38...
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
            {[1, 2, 3].map((item) => (
              <Flex
                align="center"
                justify="space-between"
                key={item}
                style={{
                  borderRadius: "24px",
                  border: "2px solid #C1D2FF",
                  padding: "15px 15px",
                  marginBottom: 24,
                }}
              >
                <Flex align="center" gap={12}>
                  <Image src="/peg.svg" width={42} height={42} alt="icon" />
                  <Text>PEG</Text>
                </Flex>
                <Text>12,223,516.00</Text>
              </Flex>
            ))}
          </div>
        </div>

        <Drawer
          // title={<div style={{ textAlign: "center" }}>Basic Drawer</div>}
          placement={"bottom"}
          closable={false}
          onClose={onClose}
          open={open}
          key={"bottom"}
          height={486}
          loading={loading}
        >
          <div style={Drawertitle}>
            {drawerBack && (
              <LeftOutlined
                onClick={() => setDrawerBack(false)}
                style={{
                  position: "absolute",
                  left: 0,
                  fontSize: 26,
                }}
              />
            )}

            <Title level={5}>Send</Title>
          </div>
          {drawerBack ? (
            <Space direction="vertical" style={{ width: "100%" }} size={30}>
              <Row justify={"center"}>
                <Title>
                  <Space>
                    <div>{dataForm.amount}</div>
                    <div>{dataForm.symbol}</div>
                  </Space>
                </Title>
              </Row>
              <Row justify={"space-between"}>
                <label>To</label>
                <Text>{dataForm.address}</Text>
              </Row>
              <Row justify={"space-between"}>
                <label>Asset</label>
                <Text>{dataForm.symbol}</Text>
              </Row>
              <Row justify={"space-between"}>
                <label>Amount</label>
                <Text>{dataForm.amount}</Text>
              </Row>
              <Row justify={"space-between"}>
                <label>Network Fee</label>
                <Text>{""}</Text>
              </Row>

              <Button block shape="round">
                send
              </Button>
            </Space>
          ) : (
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
                    <Option value="bnb">BNB</Option>
                    <Option value="eth">ETH</Option>
                    <Option value="peg">PEG</Option>
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
                  <Button block shape="round" htmlType="submit" disabled>
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </Drawer>
        <Title level={3} style={{ textAlign: "left" }}>
          Activity
        </Title>
        <Table columns={columns} dataSource={data} />

        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <Button
            onClick={showModal}
            type="primary"
            block
            shape="round"
            size="large"
          >
            send
          </Button>
          <Button onClick={showModal} block shape="round" size="large">
            Safe Account
          </Button>
        </Space>
      </Typography>
    </div>
  );
}
