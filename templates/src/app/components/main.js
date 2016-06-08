import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from '../stores/main'

let reactElement = document.getElementById('app')

render(
  < Provider store={store} >

  </Provider>,
  reactElement
)
