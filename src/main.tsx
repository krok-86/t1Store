import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//       refetchOnWindowFocus: false,
//       cacheTime: 0,
//       retry: false
//     }
//   }
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* <QueryClientProvider
     client={queryClient}> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </QueryClientProvider> */}
  </BrowserRouter>
)
