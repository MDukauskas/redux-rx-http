export const RX_HTTP_REQUEST = '@@rx-http/REQUEST'
export const RX_HTTP_SUCCESS = '@@rx-http/SUCCESS'
export const RX_HTTP_ERROR = '@@rx-http/ERROR'
export const RX_HTTP_FINALLY = '@@rx-http/FINALLY'

import {
    RxHttpRequest,
    RxHttpRequestConfig,
    RxHttpRequestBase,
    RxHttpRequestAction,
    RxHttpActionTypes,
} from './interfaces'

export const rxHttp = (request: RxHttpRequest,
                       actionTypes: RxHttpActionTypes,
                       args?: {},
                       key?: string): RxHttpRequestAction => ({
    type: RX_HTTP_REQUEST,
    actionTypes,
    key,
    request,
    args,
})

export const rxHttpGet = (path: string,
                          actionTypes: RxHttpActionTypes,
                          params: {} = {},
                          config: RxHttpRequestConfig = {}): RxHttpRequestAction =>
    rxHttp(
        {
            ...config.request,
            url: path,
            method: 'GET',
            params,
        },
        actionTypes,
        config.args,
        config.key,
    )

export const rxHttpPost = (path: string,
                           actionTypes: RxHttpActionTypes,
                           body?: any,
                           config: RxHttpRequestConfig = {}): RxHttpRequestAction =>
    rxHttp(
        {
            ...config.request,
            url: path,
            method: 'POST',
            body,
        },
        actionTypes,
        config.args,
        config.key,
    )

export const rxHttpPut = (path: string,
                          actionTypes: RxHttpActionTypes,
                          body?: any,
                          config: RxHttpRequestConfig = {}): RxHttpRequestAction =>
    rxHttp(
        {
            ...config.request,
            url: path,
            method: 'PUT',
            body,
        },
        actionTypes,
        config.args,
        config.key,
    )

export const rxHttpPatch = (path: string,
                            actionTypes: RxHttpActionTypes,
                            body?: any,
                            config: RxHttpRequestConfig = {}): RxHttpRequestAction =>
    rxHttp(
        {
            ...config.request,
            url: path,
            method: 'PATCH',
            body,
        },
        actionTypes,
        config.args,
        config.key,
    )

export const rxHttpDelete = (path: string,
                             actionTypes: RxHttpActionTypes,
                             config: RxHttpRequestConfig = {}): RxHttpRequestAction =>
    rxHttp(
        {
            ...config.request,
            url: path,
            method: 'DELETE',
        },
        actionTypes,
        config.args,
        config.key,
    )

export const rxHttpHead = (path: string,
                           actionTypes: RxHttpActionTypes,
                           config: RxHttpRequestConfig = {}): RxHttpRequestAction =>
    rxHttp(
        {
            ...config.request,
            url: path,
            method: 'HEAD',
        },
        actionTypes,
        config.args,
        config.key,
    )
