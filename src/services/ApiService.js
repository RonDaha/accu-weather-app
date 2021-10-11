import { HttpService } from './HttpService'

const urls = {
    base: 'http://localhost:3001/api',
    fiveDaysForecasts: '/weather/five-days-forecast',
    autoComplete: '/weather/auto-complete',
}

export const ApiService = {
    async getAutoCompleteData(q) {
        try {
            const requestUrl = `${urls.base + urls.autoComplete}?q=${q}`
            return HttpService.makeGetRequest(requestUrl)
        } catch (e) {
            console.error(e)
            return []
        }
    },
    async getFiveDaysForecasts(locationKey) {
        try {
            const requestUrl = `${urls.base + urls.fiveDaysForecasts}?locationKey=${locationKey}`
            return HttpService.makeGetRequest(requestUrl)
        } catch (e) {
            console.error(e)
            return {}
        }
    },
}
