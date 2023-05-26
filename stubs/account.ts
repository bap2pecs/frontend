import type { PublicTag, AddressTag, TransactionTag, ApiKey, CustomAbi } from 'types/api/account';
import type { TWatchlistItem } from 'types/client/account';

import { ADDRESS_PARAMS, ADDRESS_HASH } from './addressParams';
import { TX_HASH } from './tx';

export const PRIVATE_TAG_ADDRESS: AddressTag = {
  address: ADDRESS_PARAMS,
  address_hash: ADDRESS_HASH,
  id: '4',
  name: 'placeholder',
};

export const PRIVATE_TAG_TX: TransactionTag = {
  id: '1',
  name: 'placeholder',
  transaction_hash: TX_HASH,
};

export const PUBLIC_TAG: PublicTag = {
  additional_comment: 'my comment',
  addresses: [ ADDRESS_HASH ],
  addresses_with_info: [ ADDRESS_PARAMS ],
  company: 'Blockscout',
  email: 'john.doe@example.com',
  full_name: 'name',
  id: 1,
  is_owner: true,
  tags: 'placeholder',
  website: 'example.com',
};

export const WATCH_LIST_ITEM_WITH_TOKEN_INFO: TWatchlistItem = {
  address: ADDRESS_PARAMS,
  address_balance: '7072643779453701031672',
  address_hash: ADDRESS_HASH,
  exchange_rate: '0.00099052',
  id: '18',
  name: 'placeholder',
  notification_methods: {
    email: false,
  },
  notification_settings: {
    'ERC-20': {
      incoming: true,
      outcoming: true,
    },
    'ERC-721': {
      incoming: true,
      outcoming: true,
    },
    'native': {
      incoming: true,
      outcoming: true,
    },
  },
  tokens_count: 42,
};

export const API_KEY: ApiKey = {
  api_key: '9c3ecf44-a1ca-4ff1-b28e-329e8b65f652',
  name: 'placeholder',
};

export const CUSTOM_ABI: CustomAbi = {
  abi: [
    {
      constant: false,
      payable: false,
      inputs: [ { name: 'target', type: 'address' } ],
      name: 'unknownWriteMethod',
      outputs: [ { name: 'result', type: 'address' } ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  contract_address: ADDRESS_PARAMS,
  contract_address_hash: ADDRESS_HASH,
  id: '1',
  name: 'placeholder',
};