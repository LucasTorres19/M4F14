import '../styles/globals.css'
import Layout from '../components/Layout'

export function reportWebVitals(metric) {
 //metrics;
}
function MyApp({ Component, pageProps }) {

  return <Layout>
    <Component {...pageProps} />
  </Layout>

}

export default MyApp
