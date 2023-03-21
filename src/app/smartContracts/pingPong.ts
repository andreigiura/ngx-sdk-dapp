import {
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  Address,
} from '@multiversx/sdk-core/out';
import { MY_APP_CONFIG } from '../config';

import * as jsonData from './ping-pong.abi.json';

const abiRegistry = AbiRegistry.create(JSON.parse(JSON.stringify(jsonData)));
const abi = new SmartContractAbi(abiRegistry);

export const smartContract = new SmartContract({
  address: new Address(MY_APP_CONFIG.pingPongContractAddress),
  abi,
});
