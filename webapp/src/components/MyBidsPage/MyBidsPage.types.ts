import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Bid } from '../../modules/bid/types'
import {
  fetchBidsByAddressRequest,
  FetchBidsByAddressRequestAction
} from '../../modules/bid/actions'
import { Wallet } from '../../modules/authorization/types'

export type Props = {
  wallet: Wallet | null
  sellerBids: Bid[]
  bidderBids: Bid[]
  archivedBidIds: string[]
  isConnecting: boolean
  isLoading: boolean
  onNavigate: (path: string) => void
  onFetchBids: typeof fetchBidsByAddressRequest
}

export type MapStateProps = Pick<
  Props,
  | 'wallet'
  | 'sellerBids'
  | 'bidderBids'
  | 'archivedBidIds'
  | 'isConnecting'
  | 'isLoading'
>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onFetchBids'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | FetchBidsByAddressRequestAction
>
