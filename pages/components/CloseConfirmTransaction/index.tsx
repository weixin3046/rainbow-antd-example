import { useState } from "react";
import Drawer from "../Drawer";
import { Button, Col, Row, Space, Typography } from "antd";
import {
  Address,
  formatEther,
  formatGwei,
  formatUnits,
  fromHex,
  parseUnits,
} from "viem";
import { simulateContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import MultiSigBank from "../../../abi/MultiSigBank.json";
import { DataType } from "../Activity";
import { useChains, useConfig, useEstimateGas, useGasPrice } from "wagmi";
import { getSymbol } from "../../../utils";
const { Title, Text, Paragraph } = Typography;

const CloseConfirmTransaction = ({
  data,
  id,
}: {
  data: DataType;
  id: bigint;
}) => {
  const { value, description, destination } = data;
  const symbol = fromHex(description, "string");
  const amount = formatUnits(value, 6);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const transactionId = parseUnits(id);
  const { data: gasData } = useEstimateGas();
  const closeConfirmTransaction = () => {
    setOpen(false);
  };
  const onConfirmTransaction = async () => {
    setLoading(true);
    // confirmTransaction
    try {
      const { request } = await simulateContract(config, {
        abi: MultiSigBank.abi,
        address: MultiSigBank.address as Address,
        functionName: "confirmTransaction",
        args: [id],
      });
      const hash = await writeContract(config, request);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };
  return (
    <>
      <div
        style={{ color: "#205CFF", cursor: "pointer" }}
        onClick={() => setOpen(true)}
      >
        Execute
      </div>
      <Drawer
        title={<div style={{ textAlign: "center" }}>Send</div>}
        height={486}
        closable={false}
        key={"confirmTransaction"}
        placement={"bottom"}
        open={open}
        loading={loading}
        footer={
          <Button
            block
            shape="round"
            type="primary"
            onClick={onConfirmTransaction}
          >
            send
          </Button>
        }
        onClose={closeConfirmTransaction}
      >
        <Space direction="vertical" style={{ width: "100%" }} size={30}>
          <Row justify={"center"}>
            <div style={{ fontSize: 29 }}>
              <Space>
                <div>{amount}</div>
                <div>{symbol}</div>
              </Space>
            </div>
          </Row>
          <Row justify={"space-between"}>
            <Col span={10}>
              <label>To</label>
            </Col>
            <Col span={14}>
              <Text style={{ fontSize: 10 }}>{destination}</Text>
            </Col>
          </Row>
          <Row justify={"space-between"}>
            <Col span={10}>
              <label>Asset</label>
            </Col>
            <Col span={14} style={{ textAlign: "right" }}>
              <Text>{symbol}</Text>
            </Col>
          </Row>
          <Row justify={"space-between"}>
            <Col span={10}>
              <label>Amount</label>
            </Col>
            <Col span={14} style={{ textAlign: "right" }}>
              <Text>{amount}</Text>
            </Col>
          </Row>
          <Row justify={"space-between"}>
            <Col span={10}>
              <label>Network Fee</label>
            </Col>
            <Col span={14} style={{ textAlign: "right" }}>
              <Text>
                {gasData && formatGwei(gasData)} {getSymbol()}
              </Text>
            </Col>
          </Row>
        </Space>
      </Drawer>
    </>
  );
};

export default CloseConfirmTransaction;
