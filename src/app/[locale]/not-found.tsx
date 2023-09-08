import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-96 flex-col items-center justify-center">
      <span>Page not found</span>
      <Link className="text-accent-0" href="/">
        Go Home
      </Link>
    </div>
  );
}
