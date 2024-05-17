import Drawer from "../Drawer";
import AccountPreview from "./AccountPreview";
import AddOwner from "./addOwner";

const Owners = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <>
      <Drawer
        open={open}
        placement="bottom"
        // closeIcon={false}
        onClose={onClose}
        height={782}
      >
        <AccountPreview />
        <AddOwner />
      </Drawer>
    </>
  );
};

export default Owners;
