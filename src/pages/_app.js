import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Առցանց Գրադարան</title>
        <meta name="description" content="Լավագույն հայկական և համաշխարհային գրականությունը" />
      </Head>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
