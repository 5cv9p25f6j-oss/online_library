import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Առցանց Գրադարան | Գլխավոր</title>
      </Head>
      <div className="hero">
        <h1>Բարի գալուստ Առցանց Գրադարան</h1>
        <p>
          Բացահայտեք հայկական և համաշխարհային գրականության գոհարները մեր հարուստ հավաքածուում: 
          Կարդացեք, սովորեք և ոգեշնչվեք մեզ հետ:
        </p>
        <Link href="/books" className="btn-primary">
          Դիտել Գրքերը
        </Link>
      </div>
    </>
  );
}
