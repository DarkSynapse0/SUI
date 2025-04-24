import { SuiClient } from "@mysten/sui.js/client";

export const getBalance = async (walletAddress: string): Promise<number> => {
  const rpcUrl = "https://fullnode.testnet.sui.io/";
  const suiClient = new SuiClient({ url: rpcUrl });
  const balanceObj = await suiClient.getCoins({
    owner: walletAddress,
    limit: 100,
  });

  const balance = balanceObj.data
    .filter((coinObj) => coinObj.coinType === "0x2::sui::SUI")
    .reduce((acc, obj) => acc + parseInt(obj.balance), 0);
  return balance;
};


