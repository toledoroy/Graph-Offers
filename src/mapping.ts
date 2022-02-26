import { BigInt } from "@graphprotocol/graph-ts"
import {
  Offers,
  ApprovalForAll,
  TransferBatch,
  TransferSingle,
  URI,
  _delivery,
  _offer,
  _order,
  _review,
  _sold
} from "../generated/Offers/Offers"
import { ExampleEntity } from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAll): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.account = event.params.account
  entity.operator = event.params.operator

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract._creators(...)
  // - contract._maxSupply(...)
  // - contract.balanceOf(...)
  // - contract.balanceOfBatch(...)
  // - contract.creditOf(...)
  // - contract.exists(...)
  // - contract.existsOrder(...)
  // - contract.isApprovedForAll(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.price(...)
  // - contract.sell(...)
  // - contract.status(...)
  // - contract.status_name(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenDeposits(...)
  // - contract.tokenSupplyAvailable(...)
  // - contract.totalSupply(...)
  // - contract.uri(...)
  // - contract.usedBalanceOf(...)
}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {
  console.warn("URI Evet: ", event);
  let entity = new ExampleEntity(event.params.id);
  entity.uri = event.params.value;
  
  //Save
  entity.save()
}

export function handle_delivery(event: _delivery): void {}

export function handle_offer(event: _offer): void {}

export function handle_order(event: _order): void {}

export function handle_review(event: _review): void {}

export function handle_sold(event: _sold): void {}
