import Image from 'next/image';
import Link from 'next/link';

function Contributor({
  name,
  avatar,
  url,
}: {
  name: string;
  avatar: string;
  url: string;
}) {
  return (
    <div>
      <Link href={url} target="_blank">
        <Image
          height={80}
          width={80}
          alt={name}
          className="rounded-full hover:scale-110 inline-block grayscale-100 hover:grayscale-0 transition-all duration-300"
          src={avatar}
          title={name}
        />
      </Link>
    </div>
  );
}

export default Contributor;
