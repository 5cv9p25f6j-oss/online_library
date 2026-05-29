import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import ErrorBoundary from '../components/ErrorBoundary';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Առցանց Գրադարան</title>
        <meta name="description" content="Լավագույն հայկական և համաշխարհային գրականությունը" />
      </Head>
      <Navbar />
      <ErrorBoundary>
        <main>
          <Component {...pageProps} />
        </main>
      </ErrorBoundary>
    </>
  );
}
