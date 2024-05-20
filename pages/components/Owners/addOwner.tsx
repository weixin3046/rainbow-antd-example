import React, { useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Space, message } from "antd";
import { MultiSigBank } from "../../../abi/abi";
import { useAccount, useReadContract } from "wagmi";
import { MultiSigBankAddress, config } from "../../../config";
import styles from "../../../styles/Form.module.css";
import { simulateContract, writeContract } from "@wagmi/core";
import { toHex, encodeFunctionData } from "viem";

const AddOwner: React.FC = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [newAddress, setNewAddress] = useState("");
  const { data, error, isLoading } = useReadContract({
    abi: MultiSigBank,
    address: MultiSigBankAddress,
    functionName: "getOwners",
  });
  const onSubmit = async () => {
    setLoading(true);
    const description = toHex("addOwner", { size: 32 });
    const data = encodeFunctionData({
      abi: MultiSigBank,
      functionName: "addOwner",
      args: [newAddress as `0x${string}`],
    });
    try {
      const { request } = await simulateContract(config, {
        abi: MultiSigBank,
        address: MultiSigBankAddress,
        functionName: "submitTransaction",
        args: [address as `0x${string}`, BigInt(0), data, description],
      });
      const hash = await writeContract(config, request);
      console.log(hash);
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRemove = async (list: `0x${string}`) => {
    messageApi.open({
      type: "loading",
      content: "removeOwner ...",
      duration: 0,
    });
    const description = toHex("remove", { size: 32 });
    const data = encodeFunctionData({
      abi: MultiSigBank,
      functionName: "removeOwner",
      args: [list],
    });
    try {
      const { request } = await simulateContract(config, {
        abi: MultiSigBank,
        address: MultiSigBankAddress,
        functionName: "submitTransaction",
        args: [address as `0x${string}`, BigInt(0), data, description],
      });
      const hash = await writeContract(config, request);
      console.log(hash);
      // setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      messageApi.destroy();
      // setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.signer_list}>
        <Space size={12} direction="vertical">
          {isLoading && "loading"}
          {data?.map((item, index) => (
            <Row align={"middle"} key={item}>
              <Col span={2}>
                <MinusCircleFilled
                  style={{
                    color: "#FF5600",
                  }}
                  onClick={() => onRemove(item)}
                />
              </Col>
              <Col span={6}>Signer {index + 1}</Col>
              <Col span={16} className={styles.customInput}>
                <span className={styles.address}>{item}</span>
              </Col>
            </Row>
          ))}
        </Space>
        <Button
          type="link"
          block
          style={{ textAlign: "left" }}
          onClick={() => setOpen(true)}
        >
          <MinusCircleOutlined /> <PlusOutlined /> Add New Signer
        </Button>
        <Modal
          open={open}
          title="Add new signer"
          onCancel={() => setOpen(false)}
          footer={[
            <Button key={"center"} onClick={() => setOpen(false)}>
              Center
            </Button>,
            <Button
              key={"submit"}
              type="primary"
              onClick={onSubmit}
              loading={loading}
            >
              Submit
            </Button>,
          ]}
        >
          <Input
            placeholder="new signer"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </Modal>
      </div>
    </>
  );
};

export default AddOwner;
