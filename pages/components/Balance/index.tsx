import { useAccount, useBalance, useReadContract } from "wagmi";
import { Address } from "viem";

const TokenBalance = ({ token }: { token: string }) => {
  const { address } = useAccount();
  const { data: balance, status } = useBalance({
    address: address,
    token: token as Address,
  });
  return <>{balance ? balance.formatted : "0"}</>;
};

export default TokenBalance;

// function ReadContract() {

//   return (
//     <div>Balance: {balance?.toString()}</div>
//   )
// }
