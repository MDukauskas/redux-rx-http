import { AjaxResponse } from 'rxjs'

export interface RxHttpConfig {
    headers?: object
    baseUrl?: string
}

export interface RxHttpActionTypes {
    REQUEST: symbol | string
    SUCCESS: symbol | string
    ERROR: symbol | string
    CANCEL: symbol | string
}

export interface QueryParams {
    [key: string]: any
}

export interface RxHttpRequestAction {
    type: '@@rx-http/REQUEST' | '@@rx-http/_REQUEST'
    actionTypes: RxHttpActionTypes
    request: RxHttpRequest
    key?: string
    args?: {}
}

export interface RxHttpRequest {
    method: string
    url: string
    params?: QueryParams
    body?: object
    headers?: object
}
