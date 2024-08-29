import React from 'react'
import ReactDOM from 'react-dom/client'

import { enableMocking } from './api/mocks'
import { App } from './app.tsx'

enableMocking().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
