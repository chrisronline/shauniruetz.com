import React from 'react'
import { render } from 'react-dom'
import loadFonts from './fonts'
import Site from './site'

loadFonts()

render(
  <Site/>,
  document.getElementById('root')
)
