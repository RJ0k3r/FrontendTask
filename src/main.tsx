import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './reset.css'
import './styles.css' 

async function boot() {
  if ((import.meta as any).env?.DEV) {
    try {
      const { worker } = await import('./mocks/browser')
      await worker.start({
        serviceWorker: { url: '/mockServiceWorker.js' }, 
        onUnhandledRequest: 'warn',
      })
      console.info('[MSW] worker started')
      console.info('[Starter] Try in DevTools console: await (await fetch("/products?page=1&limit=8")).json()')
    } catch (err) {
      console.warn('[MSW] failed to start worker', err)
    }
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

boot()
