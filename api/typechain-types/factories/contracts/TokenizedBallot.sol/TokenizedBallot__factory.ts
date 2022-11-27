/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TokenizedBallot,
  TokenizedBallotInterface,
} from "../../../contracts/TokenizedBallot.sol/TokenizedBallot";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proposalNames",
        type: "bytes32[]",
      },
      {
        internalType: "address",
        name: "_myToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "myToken",
    outputs: [
      {
        internalType: "contract IMyToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "votePower",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winnerName",
    outputs: [
      {
        internalType: "bytes32",
        name: "winnerName_",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winningProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "winningProposal_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000d3838038062000d38833981810160405281019062000037919062000340565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060005b82518110156200010e5760026040518060400160405280858481518110620000a757620000a6620003a6565b5b602002602001015181526020016000815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050808062000105906200040e565b9150506200007a565b5050506200045b565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200017b8262000130565b810181811067ffffffffffffffff821117156200019d576200019c62000141565b5b80604052505050565b6000620001b262000117565b9050620001c0828262000170565b919050565b600067ffffffffffffffff821115620001e357620001e262000141565b5b602082029050602081019050919050565b600080fd5b6000819050919050565b6200020e81620001f9565b81146200021a57600080fd5b50565b6000815190506200022e8162000203565b92915050565b60006200024b6200024584620001c5565b620001a6565b90508083825260208201905060208402830185811115620002715762000270620001f4565b5b835b818110156200029e57806200028988826200021d565b84526020840193505060208101905062000273565b5050509392505050565b600082601f830112620002c057620002bf6200012b565b5b8151620002d284826020860162000234565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200030882620002db565b9050919050565b6200031a81620002fb565b81146200032657600080fd5b50565b6000815190506200033a816200030f565b92915050565b600080604083850312156200035a576200035962000121565b5b600083015167ffffffffffffffff8111156200037b576200037a62000126565b5b6200038985828601620002a8565b92505060206200039c8582860162000329565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000819050919050565b60006200041b8262000404565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000450576200044f620003d5565b5b600182019050919050565b6108cd806200046b6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063013cf08b14610067578063609ff1bd14610098578063b384abef146100b6578063b8fcf937146100d2578063e2ba53f0146100f0578063e490e6991461010e575b600080fd5b610081600480360381019061007c919061045e565b61013e565b60405161008f9291906104b3565b60405180910390f35b6100a0610172565b6040516100ad91906104dc565b60405180910390f35b6100d060048036038101906100cb91906104f7565b6101fa565b005b6100da6102db565b6040516100e791906105b6565b60405180910390f35b6100f86102ff565b60405161010591906105d1565b60405180910390f35b6101286004803603810190610123919061062a565b610333565b60405161013591906104dc565b60405180910390f35b6002818154811061014e57600080fd5b90600052602060002090600202016000915090508060000154908060010154905082565b6000806000905060005b6002805490508110156101f557816002828154811061019e5761019d610657565b5b90600052602060002090600202016001015411156101e257600281815481106101ca576101c9610657565b5b90600052602060002090600202016001015491508092505b80806101ed906106b5565b91505061017c565b505090565b8061020433610333565b1015610245576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023c9061075a565b60405180910390fd5b806002838154811061025a57610259610657565b5b9060005260206000209060020201600101600082825461027a919061077a565b9250508190555080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546102d0919061077a565b925050819055505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600261030b610172565b8154811061031c5761031b610657565b5b906000526020600020906002020160000154905090565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205460008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633a46b1a88460016040518363ffffffff1660e01b81526004016103d19291906107f8565b602060405180830381865afa1580156103ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104129190610836565b61041c9190610863565b9050919050565b600080fd5b6000819050919050565b61043b81610428565b811461044657600080fd5b50565b60008135905061045881610432565b92915050565b60006020828403121561047457610473610423565b5b600061048284828501610449565b91505092915050565b6000819050919050565b61049e8161048b565b82525050565b6104ad81610428565b82525050565b60006040820190506104c86000830185610495565b6104d560208301846104a4565b9392505050565b60006020820190506104f160008301846104a4565b92915050565b6000806040838503121561050e5761050d610423565b5b600061051c85828601610449565b925050602061052d85828601610449565b9150509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061057c61057761057284610537565b610557565b610537565b9050919050565b600061058e82610561565b9050919050565b60006105a082610583565b9050919050565b6105b081610595565b82525050565b60006020820190506105cb60008301846105a7565b92915050565b60006020820190506105e66000830184610495565b92915050565b60006105f782610537565b9050919050565b610607816105ec565b811461061257600080fd5b50565b600081359050610624816105fe565b92915050565b6000602082840312156106405761063f610423565b5b600061064e84828501610615565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006106c082610428565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036106f2576106f1610686565b5b600182019050919050565b600082825260208201905092915050565b7f4e6f7420656e6f75676820766f746520706f7765720000000000000000000000600082015250565b60006107446015836106fd565b915061074f8261070e565b602082019050919050565b6000602082019050818103600083015261077381610737565b9050919050565b600061078582610428565b915061079083610428565b92508282019050808211156107a8576107a7610686565b5b92915050565b6107b7816105ec565b82525050565b6000819050919050565b60006107e26107dd6107d8846107bd565b610557565b610428565b9050919050565b6107f2816107c7565b82525050565b600060408201905061080d60008301856107ae565b61081a60208301846107e9565b9392505050565b60008151905061083081610432565b92915050565b60006020828403121561084c5761084b610423565b5b600061085a84828501610821565b91505092915050565b600061086e82610428565b915061087983610428565b925082820390508181111561089157610890610686565b5b9291505056fea2646970667358221220039a23db75dae725cf743f2f3f581f30089ed555cadc95cae5050cb231fe323564736f6c63430008110033";

type TokenizedBallotConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenizedBallotConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenizedBallot__factory extends ContractFactory {
  constructor(...args: TokenizedBallotConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    proposalNames: PromiseOrValue<BytesLike>[],
    _myToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TokenizedBallot> {
    return super.deploy(
      proposalNames,
      _myToken,
      overrides || {}
    ) as Promise<TokenizedBallot>;
  }
  override getDeployTransaction(
    proposalNames: PromiseOrValue<BytesLike>[],
    _myToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(proposalNames, _myToken, overrides || {});
  }
  override attach(address: string): TokenizedBallot {
    return super.attach(address) as TokenizedBallot;
  }
  override connect(signer: Signer): TokenizedBallot__factory {
    return super.connect(signer) as TokenizedBallot__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenizedBallotInterface {
    return new utils.Interface(_abi) as TokenizedBallotInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenizedBallot {
    return new Contract(address, _abi, signerOrProvider) as TokenizedBallot;
  }
}