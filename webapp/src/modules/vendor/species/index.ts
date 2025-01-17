import { BidService } from './BidService'
import { ContractService } from './ContractService'
import { NFTService } from './NFTService'
import { OrderService } from './OrderService'

export const VendorName = 'decentraland' as const

export * from './bid'
export * from './nft'
export * from './order'
export * from './routing'

export * from './BidService'
export * from './ContractService'
export * from './NFTService'
export * from './OrderService'

export const services = {
  BidService,
  ContractService,
  NFTService,
  OrderService
}
