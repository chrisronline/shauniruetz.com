import React from 'react'
import { render } from 'react-dom'
import Site from './site'

console.log('Rendering site')

render(
  <Site/>,
  document.getElementById('root')
)
