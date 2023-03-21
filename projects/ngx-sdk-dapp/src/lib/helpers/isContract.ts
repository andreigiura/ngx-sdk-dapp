import { Address, TransactionPayload } from '@multiversx/sdk-core/out';
import { addressIsValid } from './addressIsValid';
import { isStringBase64 } from './base64Utils';

export enum TypesOfSmartContractCallsEnum {
  MultiESDTNFTTransfer = 'MultiESDTNFTTransfer',
  ESDTNFTTransfer = 'ESDTNFTTransfer',
}

export const ESDTTransferTypes = [
  'ESDTNFTTransfer',
  'ESDTNFTBurn',
  'ESDTNFTAddQuantity',
  'ESDTNFTCreate',
  'MultiESDTNFTTransfer',
  'ESDTTransfer',
  'ESDTBurn',
  'ESDTLocalMint',
  'ESDTLocalBurn',
  'ESDTWipe',
  'ESDTFreeze',
];

export function isContract(
  receiver: string,
  sender?: string,
  data = ''
): boolean {
  const isValid = addressIsValid(receiver);

  if (!isValid) {
    return false;
  }

  const isContract = new Address(receiver).isContractAddress();

  if (isContract) {
    return true;
  }

  const extractedAddress = getAddressFromDataField({ receiver, data });

  if (!extractedAddress) {
    return false;
  }

  const isExtractedAddressContractCall = new Address(
    extractedAddress
  ).isContractAddress();

  return (
    isExtractedAddressContractCall || isSelfESDTContract(receiver, sender, data)
  );
}

export function isSelfESDTContract(
  receiver: string,
  sender?: string,
  data?: string
) {
  const parts = data?.split('@');
  if (parts == null) {
    return false;
  }
  const [type, ...restParts] = parts;
  const isSelfTransaction =
    sender != null && receiver != null && receiver === sender;
  const isCorrectESDTType = ESDTTransferTypes.includes(type);
  const areDataPartsValid = restParts.every(
    (part) => isHexValidCharacters(part) && isHexValidLength(part)
  );
  return isSelfTransaction && isCorrectESDTType && areDataPartsValid;
}

const isHexValidCharacters = (str: string) => {
  return str.toLowerCase().match(/[0-9a-f]/g);
};
const isHexValidLength = (str: string) => {
  return str.length % 2 === 0;
};

export function getAddressFromDataField({
  receiver,
  data,
}: {
  receiver: string;
  data: string;
}) {
  try {
    if (!data) {
      return receiver;
    }
    const parsedData = isStringBase64(data)
      ? TransactionPayload.fromEncoded(data).toString()
      : data;

    const addressIndex = getAddressIndex(parsedData);

    const parts = parsedData.split('@');
    return addressIndex > -1 ? parts[addressIndex] : receiver;
  } catch (err) {
    console.log(err);
    return;
  }
}

function getAddressIndex(data: string) {
  if (data.includes(TypesOfSmartContractCallsEnum.MultiESDTNFTTransfer)) {
    return 1;
  }
  if (data.includes(TypesOfSmartContractCallsEnum.ESDTNFTTransfer)) {
    return 4;
  }
  return -1;
}
