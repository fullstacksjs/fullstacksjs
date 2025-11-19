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
          title={name}
          src={avatar}
          alt={name}
          width={80}
          height={80}
          className="rounded-full hover:scale-110 inline-block grayscale-100 hover:grayscale-0 transition-all duration-300"
        />
      </Link>
    </div>
  );
}

export default Contributor;
