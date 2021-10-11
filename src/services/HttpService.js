const makeHttpRequest = (requestUrl, requestMethod, requestHeaders, requestBody, handleResponse = 'json') => {
    return fetch(requestUrl, { method: requestMethod, headers: requestHeaders, body: requestBody })
        .then((response) => {
            switch (handleResponse) {
                case 'json':
                    return response.json()
                case 'buffer':
                    return response.buffer()
            }
        return response
    })
}

export const HttpService = {
    makeGetRequest(url) {
        return makeHttpRequest(url, 'GET', {}, undefined, 'json')
    }
}
