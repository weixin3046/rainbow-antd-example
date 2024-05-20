import { useReadContract } from "wagmi";
import { abi, MultiSigBank } from "../../../abi/abi";
import { Col, List, Row, Space, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { isValidElement, useEffect, useMemo, useState } from "react";
import { shortenAddress } from "../../../utils";
import { formatUnits, fromHex } from "viem";
import { MultiSigBankAddress, tokenList } from "../../../config";
// import CloseConfirmTransaction from "../CloseConfirmTransaction";

const { Title, Text, Paragraph } = Typography;
type ColumnsType<T> = TableProps<T>["columns"];

export interface DataType {
  description: `0x${string}`;
  createTime: number;
  destination: `0x${string}`;
  value: bigint;
  data: `0x${string}`;
  submitter: `0x${string}`;
  executed: boolean;
  hasSecondArray: boolean;
  hasThirdArray: boolean;
  bigIntValue: bigint;
}

const ActivityTable = ({ address }: { address: `0x${string}` }) => {
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

  const [data, setData] = useState<DataType[]>([]);
  const {
    data: issuesData,
    error,
    isLoading,
    isSuccess,
  } = useReadContract({
    abi: MultiSigBank,
    functionName: "getTransactions",
    address: MultiSigBankAddress,
    args: [pagination.pageSize, address],
  });
  useEffect(() => {
    if (issuesData) {
      const [list, secondArray, thirdArray, bigIntValues] = issuesData;
      const mergedData = list.flatMap((issue, index) => {
        return {
          ...issue,
          hasSecondArray: secondArray[index],
          hasThirdArray: thirdArray[index],
          bigIntValue: bigIntValues[index],
        };
      });

      setData(mergedData);
    }
  }, [issuesData]);
  const columns: ColumnsType<DataType> = [
    {
      title: "To",
      dataIndex: "destination",
      key: "destination",
      render: (text: string) => <div>{shortenAddress(text)}</div>,
    },
    {
      title: "Transaction",
      dataIndex: "value",
      key: "value",
      align: "right",
      render: (_, { value, description }) => {
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
      render: (_, data, index) => {
        return (
          <Space size="middle">
            {data.hasSecondArray ? (
              <div>View on explorer</div>
            ) : (
              <div>test</div>
              // <CloseConfirmTransaction data={data} id={data.bigIntValue} />
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        // size="small"
        pagination={false}
        dataSource={data}
        loading={isLoading}
        rowKey={(record) => record.description}
      />
    </>
  );
};

export default ActivityTable;
