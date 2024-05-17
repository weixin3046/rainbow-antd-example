import { Flex, Row, Col, Space } from "antd";
import styles from "../../../styles/Form.module.css";

const AccountPreview = () => {
  return (
    <>
      <div className={styles.preview_title}>Your Safe Account preview</div>
      <div className={styles.preview_box}>
        <Row
          align={"middle"}
          justify={"space-between"}
          className={styles.preview_box_row}
        >
          <Col>Network</Col>
          <Col>RaQuantum</Col>
        </Row>
        <Row align={"middle"} justify={"space-between"}>
          <Col>Network</Col>
          <Col>RaQuantum Safe Wallet</Col>
        </Row>
      </div>
    </>
  );
};

export default AccountPreview;
