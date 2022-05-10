import { BigInt } from "@graphprotocol/graph-ts"
import {
  ss,
  DailyLimitChange,
  Confirmation,
  Revocation,
  Submission,
  Execution,
  ExecutionFailure,
  Deposit,
  OwnerAddition,
  OwnerRemoval,
  RequirementChange
} from "../generated/ss/ss"
import { ExampleEntity } from "../generated/schema"

export function handleDailyLimitChange(event: DailyLimitChange): void {
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
  entity.dailyLimit = event.params.dailyLimit

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
  // - contract.owners(...)
  // - contract.isOwner(...)
  // - contract.confirmations(...)
  // - contract.calcMaxWithdraw(...)
  // - contract.getTransactionCount(...)
  // - contract.dailyLimit(...)
  // - contract.lastDay(...)
  // - contract.isConfirmed(...)
  // - contract.getConfirmationCount(...)
  // - contract.transactions(...)
  // - contract.getOwners(...)
  // - contract.getTransactionIds(...)
  // - contract.getConfirmations(...)
  // - contract.transactionCount(...)
  // - contract.submitTransaction(...)
  // - contract.MAX_OWNER_COUNT(...)
  // - contract.required(...)
  // - contract.spentToday(...)
}

export function handleConfirmation(event: Confirmation): void {}

export function handleRevocation(event: Revocation): void {}

export function handleSubmission(event: Submission): void {}

export function handleExecution(event: Execution): void {}

export function handleExecutionFailure(event: ExecutionFailure): void {}

export function handleDeposit(event: Deposit): void {}

export function handleOwnerAddition(event: OwnerAddition): void {}

export function handleOwnerRemoval(event: OwnerRemoval): void {}

export function handleRequirementChange(event: RequirementChange): void {}
