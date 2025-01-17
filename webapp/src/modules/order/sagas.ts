import { put, call, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  CREATE_ORDER_REQUEST,
  CreateOrderRequestAction,
  createOrderFailure,
  createOrderSuccess,
  EXECUTE_ORDER_REQUEST,
  BUY_ORDER_REQUEST,
  buyOrderSuccess,
  buyOrderFailure,
  executeOrderSuccess,
  executeOrderFailure,
  ExecuteOrderRequestAction,
  CANCEL_ORDER_REQUEST,
  CancelOrderRequestAction,
  cancelOrderSuccess,
  cancelOrderFailure,
  BuyOrderRequestAction
} from './actions'
import { getWallet } from '../wallet/selectors'
import { locations } from '../routing/locations'
import { VendorFactory, Vendor } from '../vendor/VendorFactory'
import { VendorName } from '../vendor'

export function* orderSaga() {
  yield takeEvery(CREATE_ORDER_REQUEST, handleCreateOrderRequest)
  yield takeEvery(EXECUTE_ORDER_REQUEST, handleExecuteOrderRequest)
  yield takeEvery(BUY_ORDER_REQUEST, handleBuyOrderRequest)
  yield takeEvery(CANCEL_ORDER_REQUEST, handleCancelOrderRequest)
}

function* handleCreateOrderRequest(action: CreateOrderRequestAction) {
  const { nft, price, expiresAt } = action.payload
  try {
    const { orderService } = VendorFactory.build(nft.vendor)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const txHash: string = yield call(() =>
      orderService.create(wallet, nft, price, expiresAt)
    )
    yield put(createOrderSuccess(nft, price, expiresAt, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(createOrderFailure(nft, price, expiresAt, error.message))
  }
}

function* handleBuyOrderRequest(action: BuyOrderRequestAction) {
  const { order, nft } = action.payload
  try {
    // if (nft.id !== order.nftId) {
    //   throw new Error('The order does not match the NFT')
    // }
    if (nft.vendor !== VendorName.SPECIES) {
      throw new Error('Only creationToken can let you own species')
    }
    const { orderService } = VendorFactory.build(VendorName.SPECIES)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const txHash: string = yield call(() =>
      orderService.buySpecie!(wallet, nft, order)
    )

    yield put(buyOrderSuccess(order, nft, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(buyOrderFailure(order, nft, error.message))
  }
}

function* handleExecuteOrderRequest(action: ExecuteOrderRequestAction) {
  const { order, nft } = action.payload
  try {
    if (nft.id !== order.nftId) {
      throw new Error('The order does not match the NFT')
    }
    const { orderService } = VendorFactory.build(nft.vendor)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const txHash: string = yield call(() =>
      orderService.execute(wallet, nft, order)
    )

    yield put(executeOrderSuccess(order, nft, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(executeOrderFailure(order, nft, error.message))
  }
}

function* handleCancelOrderRequest(action: CancelOrderRequestAction) {
  const { order, nft } = action.payload
  try {
    if (order.nftId !== nft.id) {
      throw new Error('The order does not match the NFT')
    }
    const { orderService } = VendorFactory.build(nft.vendor)

    const wallet: ReturnType<typeof getWallet> = yield select(getWallet)
    const txHash: string = yield call(() => orderService.cancel(wallet, nft))
    yield put(cancelOrderSuccess(order, nft, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(cancelOrderFailure(order, nft, error.message))
  }
}
