import { useReadContract } from "wagmi";
import { abi, MultiSigBank } from "../../../abi/abi";
import { Col, List, Row, Space, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { shortenAddress } from "../../../utils";
import { formatUnits, fromHex } from "viem";
import { MultiSigBankAddress, tokenList } from "../../../config";
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
  const { data: ownerList } = useReadContract({
    abi: MultiSigBank,
    address: MultiSigBankAddress,
    functionName: "getOwners",
  });
  const [isExecute, setIsExecute] = useState(false);
  useEffect(() => {
    if ((ownerList as any[])?.includes(address)) {
      setIsExecute(true);
    } else {
      setIsExecute(false);
    }
  }, [ownerList, address]);
  const {
    data: ActivityData,
    error,
    isLoading,
    isSuccess,
  } = useReadContract({
    abi: MultiSigBank,
    functionName: "getTransactions",
    address: MultiSigBankAddress,
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
      hidden: !isExecute,
      render: (_, data, index) => (
        <Space size="middle">
          {(ActivityData as DataType[][])[1][index] ? (
            <div>View on explorer</div>
          ) : (
            <CloseConfirmTransaction
              data={data}
              id={(ActivityData as bigint[][])[3][index]}
            />
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
        dataSource={(ActivityData as DataType[][])[0]}
        loading={isLoading}
      />
    </>
  );
};

export default ActivityTable;
