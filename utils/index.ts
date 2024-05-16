import { isAddress } from "viem";
import { config } from "../config";
import { getChainId } from "@wagmi/core";

export function shortenAddress(
  address = "",
  charsStart = 4,
  charsEnd = 4
): string {
  const parsed = isAddress(address);
  if (!parsed) {
    return "";
  }
  return ellipseAddressAdd0x(address, charsStart, charsEnd);
}

/**
 * Shorten an address and add 0x to the start if missing
 * @param targetAddress
 * @param charsStart amount of character to shorten (from both ends / in the beginning)
 * @param charsEnd amount of characters to shorten in the end
 * @returns formatted string
 */
function ellipseAddressAdd0x(
  targetAddress: string,
  charsStart = 4,
  charsEnd = 4
): string {
  const hasPrefix = targetAddress.startsWith("0x");
  const prefix = hasPrefix ? "" : "0x";
  return ellipseMiddle(prefix + targetAddress, charsStart + 2, charsEnd);
}

/**
 * Shorten a string with "..." in the middle
 * @param target
 * @param charsStart amount of character to shorten (from both ends / in the beginning)
 * @param charsEnd amount of characters to shorten in the end
 * @returns formatted string
 */
export function ellipseMiddle(
  target: string,
  charsStart = 4,
  charsEnd = 4
): string {
  return `${target.slice(0, charsStart)}...${target.slice(
    target.length - charsEnd
  )}`;
}

export function getSymbol() {
  const chainId = getChainId(config);
  let symbol;
  switch (chainId) {
    case 56:
    case 97:
    case 204:
    case 5611:
      symbol = "BNB";
      break;
    default:
      symbol = "Unknown";
  }
  return symbol;
}
