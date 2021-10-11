import { useContext, useState } from 'react'
import { Context } from './store'
import { SearchBar } from './components/SearchBar'
import { Loader } from './components/Loader'

export const App = () => {

    const [globalState, dispatch] = useContext(Context)
    const [celTemp, setCelTemp] = useState(false)

    let cards = null

    if (globalState.forecastsData && globalState.forecastsData.DailyForecasts) {
        cards = globalState.forecastsData.DailyForecasts.map((daily, i) => {
            return (
                <div key={i} className="card">
                    <div className="day-part">
                        <div className="head">Day</div>
                        <div className="temp">{daily.Day.IconPhrase} - {celTemp ? daily.tempC.max : daily.tempF.max}</div>
                    </div>
                    <div className="day-part">
                        <div className="head">Night</div>
                        <div className="temp">{daily.Night.IconPhrase} - {celTemp ? daily.tempC.min : daily.tempF.min}</div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="App">
            {globalState.isLoading ? <Loader /> : null }
            <div className="title">
                Choose Your Location
            </div>
            <SearchBar/>

            <div className="sub-title">
                {globalState.location ? `${globalState.location.LocalizedName}, ${globalState.location.Country.LocalizedName}` : null}
                {globalState.error ? globalState.error : null}
            </div>

            <div className="cards-container">
                {cards}
            </div>

            {cards ? <div className="temp-switch">
                    <span onClick={() => setCelTemp(false)} className={`${celTemp ? '' : 'active'}`}>F</span>
                    <span onClick={() => setCelTemp(true)} className={`${celTemp ? 'active' : ''}`}>C</span>
                </div> : null}

        </div>
      )
}

