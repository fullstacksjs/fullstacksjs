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
        className="transition-colors opacity-50 group hover:opacity-100 flex items-center justify-between gap-4"
        href={`/blogs/${slug}`}
      >
        <div className="w-0 size-2 rounded-full bg-fg-1 group-hover:w-6 transition-all" />
        {title}
        <div className="flex-1 border-b-1 border-fg-1 border-dashed opacity-15" />
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
        <div className="flex-1 border-b-1 border-fg-1 border-dashed opacity-15" />
        <Skeleton height={14} width={80} rounded />
      </div>
    </div>
  );
};
