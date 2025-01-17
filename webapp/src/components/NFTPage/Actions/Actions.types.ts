import { NFT } from '../../../modules/nft/types'
import { Order } from '../../../modules/order/types'
import { Bid } from '../../../modules/bid/types'
import { Wallet } from '../../../modules/authorization/types'

export type Props = {
  wallet: Wallet | null
  nft: NFT
  order: Order | null
  bids: Bid[]
}

export type MapStateProps = Pick<Props, 'wallet' | 'order' | 'bids'>
export type MapDispatchProps = {}
export type MapDispatch = {}
export type OwnProps = Pick<Props, 'nft'>
