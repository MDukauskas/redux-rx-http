import { Dispatch } from 'redux'
import { RxApiConfig, RxApiRequestAction, Action } from './interfaces'
import { API_REQUEST, API_REQUEST_CONFIGURED } from './actions'

const configured = (config: RxApiConfig, action: RxApiRequestAction): RxApiRequestAction => ({
    ...action,
    type: API_REQUEST_CONFIGURED,
    apiRequest: {
        ...action.apiRequest,
        url: `${config.baseUrl}${action.apiRequest.url}`,
        headers: {
            ...config.headers,
            ...action.apiRequest.headers,
        },
    },
})

export const createRxApiMiddleware = (config: RxApiConfig) =>
    (store: any) => (next: any) => (action: any) => action.type === API_REQUEST
        ? configured(config, action)
        : next(action)
