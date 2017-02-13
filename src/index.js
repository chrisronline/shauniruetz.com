import React from 'react'
import { render } from 'react-dom'
import loadFonts from './fonts'
import prefetch from './prefetch'
import Site from './site'

loadFonts()
prefetch()

render(
  <Site/>,
  document.getElementById('root')
)
