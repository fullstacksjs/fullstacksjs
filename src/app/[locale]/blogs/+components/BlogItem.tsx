import { Skeleton } from '@/components/Skeleton';
import { Link } from '@/i18n/routing';

interface Props {
  slug: string;
  title: string;
  createdAt: Date;
}

export const BlogItem = ({ createdAt, slug, title }: Props) => {
  return (
    <li className="mt-4">
      <Link
        className="group flex items-center justify-between gap-4 opacity-50 transition-colors hover:opacity-100"
        href={`/blogs/${slug}`}
      >
        <div className="size-2 w-0 rounded-full bg-fg-1 transition-all group-hover:w-6" />
        {title}
        <div className="flex-1 border-b border-dashed border-fg-1 opacity-15" />
        <div className="text-sm text-fg-1 opacity-70">
          {createdAt.toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </Link>
    </li>
  );
};

export const BlogItemSkeleton = ({ width }: { width: number }) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Skeleton height={20} width={width} rounded />
        <div className="flex-1 border-b border-dashed border-fg-1 opacity-15" />
        <Skeleton height={14} width={80} rounded />
      </div>
    </div>
  );
};
