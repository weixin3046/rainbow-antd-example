import { useReadContract } from "wagmi";
import { abi, MultiSigBank } from "../../../abi/abi";
import { Col, List, Row, Space, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { shortenAddress } from "../../../utils";
import { formatUnits, fromHex } from "viem";
import { tokenList } from "../../../config";
import CloseConfirmTransaction from "../CloseConfirmTransaction";

const { Title, Text, Paragraph } = Typography;

export interface DataType {
  createTime: number;
  data: string;
  description: `0x${string}`;
  destination: string;
  executed: boolean;
  submitter: string;
  value: bigint;
  id?: bigint;
  isExecuted?: boolean;
}

const ActivityTable = ({ address }: { address: `0x${string}` | undefined }) => {
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: bigint;
  }>({
    current: 1,
    pageSize: BigInt(10),
  });
  const {
    data: ActivityData,
    error,
    isLoading,
    isSuccess,
  } = useReadContract({
    abi: MultiSigBank,
    functionName: "getTransactions",
    address: `0xCaFCA685891A2CeFbf78F89BeA3EaA9B096d377B`,
    args: [pagination.pageSize, address],
  });
  console.log(ActivityData);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "To",
      dataIndex: "destination",
      key: "destination",
      render: (text) => <div>{shortenAddress(text)}</div>,
    },
    {
      title: "Transaction",
      dataIndex: "value",
      key: "value",
      align: "right",
      render: (_, { value, submitter, description }) => {
        const symbol = fromHex(description, "string");

        let result = tokenList.find((obj) => obj.symbol === symbol);
        return (
          <Space>
            <div>{formatUnits(value, result?.decimals || 6)}</div>
            <div>{symbol}</div>
          </Space>
        );
      },
    },
    {
      title: "Execute",
      dataIndex: "execute",
      key: "execute",
      align: "right",
      render: (_, data, index) => (
        <Space size="middle">
          {ActivityData[1][index] ? (
            <div>View on explorer</div>
          ) : (
            <CloseConfirmTransaction data={data} id={ActivityData[3][index]} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        // size="small"
        pagination={false}
        dataSource={ActivityData && ActivityData[0]}
        loading={isLoading}
      />
    </>
  );
};

export default ActivityTable;
