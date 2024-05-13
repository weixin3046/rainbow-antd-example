import { Button, Flex, Modal, Space, Table, Typography } from "antd";
// import Image from "next/image";
import type { TableProps } from "antd";
import { useState } from "react";
import { useTranslation } from "next-i18next";

const { Title, Text } = Typography;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <div color={color} key={tag}>
              {tag.toUpperCase()}
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default function Page() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("common");
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

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Typography>
        <Title>{t("title")}</Title>
        <Button type="primary" onClick={showModal}>
          Open Modal with customized footer
        </Button>

        <Title level={2}>Introduction</Title>
        <Space
          direction="vertical"
          style={{ width: "100%", paddingLeft: 15, paddingRight: 15 }}
        >
          {[1, 2, 3].map((item) => (
            <Flex
              key={item}
              align="center"
              justify="space-between"
              style={{
                height: 60,
                background: "#F3F2F8",
                borderRadius: 10,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              <div>
                {/* <Image src="" alt="" /> */}
                <Text>PEG</Text>
              </div>
              <Text>12,223,516.00</Text>
            </Flex>
          ))}
        </Space>

        <Table columns={columns} dataSource={data} />
      </Typography>
    </>
  );
}
