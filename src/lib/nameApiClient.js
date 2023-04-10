import { Configuration, NamesApi } from "@stacks/blockchain-api-client";

const apiConfig = new Configuration({
  fetchApi: fetch,
  // for mainnet, replace `testnet` with `mainnet`
  basePath: "https://api.mainnet.hiro.so", // defaults to http://localhost:3999
});

export const namesApiClient = new NamesApi(apiConfig);
