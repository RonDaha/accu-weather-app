import React from 'react'
import ReactDOM from 'react-dom'
import './scss/main.scss'
import { App } from './App'
import Store from './store'

ReactDOM.render(
    <Store>
        <App />
    </Store>, document.getElementById('root')
)

