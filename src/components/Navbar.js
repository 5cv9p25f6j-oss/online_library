import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">Առցանց Գրադարան</Link>
      <ul className="nav-links">
        <li>
          <Link href="/books" className="nav-link">Գրքեր</Link>
        </li>
        <li>
          <Link href="/readers" className="nav-link">Ընթերցողներ</Link>
        </li>
        <li>
          <Link href="/authors" className="nav-link">Հեղինակներ</Link>
        </li>
        <li>
          <Link href="/genres" className="nav-link">Ժանրեր</Link>
        </li>
      </ul>
    </nav>
  );
}
