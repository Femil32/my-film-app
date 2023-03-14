import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import store from './store/store'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
