import { keyBy } from 'lodash'
import { stringify } from 'qs'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'

import {
    RxHttpActionTypes,
    RxHttpRequest,
    RxHttpResponse,
    RxHttpDependencies,
    RxHttpError,
    RxHttpRequestConfigured,
} from './interfaces'

const makeAction = (base: string, action: string) =>
    `@@rx-http/${`${base}_${action}`.toUpperCase()}`

export const createRxHttpActionTypes = (
    base: string,
    actions: (keyof RxHttpActionTypes)[] = [
        'ERROR',
        'REQUEST',
        'SUCCESS',
        'CANCEL',
        'FINALLY',
    ],
): RxHttpActionTypes =>
    actions.reduce(
        (acc: any, action: string) => ({
            ...acc,
            [action]: makeAction(base, action),
        }),
        {},
    )

export const JSON_PARSE_ERROR = 'Error parsing JSON'

const getJsonFromResponse = async (response: Response, json: boolean) => {
    try {
        return json ? await response.json() : response.body
    } catch (parseError) {
        if (json) {
            const error: RxHttpError = {
                response,
                body: JSON_PARSE_ERROR,
            }
            throw error
        }
        return response.body
    }
}

export const rxHttpFetch = (
    rxHttpRequest: RxHttpRequestConfigured,
    { fetch }: RxHttpDependencies,
): Observable<RxHttpResponse> =>
    Observable.from(
        (async (): Promise<RxHttpResponse> => {
            try {
                const {
                    url,
                    method,
                    query,
                    body,
                    mode,
                    cache,
                    json,
                } = rxHttpRequest

                const headers = new Headers(rxHttpRequest.headers)

                const urlWithParams =
                    query && Object.keys(query).length > 0
                        ? `${url}?${stringify(query)}`
                        : url

                const request = new Request(urlWithParams, {
                    body: json ? JSON.stringify(body) : body,
                    method,
                    headers,
                    mode,
                    cache,
                })

                const response = await fetch(request)
                const data = await getJsonFromResponse(response, json)

                if (!response.ok) {
                    const error: RxHttpError = {
                        response,
                        body: data,
                    }
                    throw error
                }

                return {
                    response,
                    data,
                }
            } catch (err) {
                console.error(err)
                throw err
            }
        })(),
    )
