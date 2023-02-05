import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Layout from 'components/Layout'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import GlobalProvider from 'providers/GlobalProvider'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <GlobalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalProvider>
      </Provider>
    </SessionProvider>
  )
}