import { BlogItemSkeleton } from './+components/BlogItem';

export default function Loading() {
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-6">
        <BlogItemSkeleton width={330} />
        <BlogItemSkeleton width={150} />
        <BlogItemSkeleton width={190} />
        <BlogItemSkeleton width={260} />
        <BlogItemSkeleton width={140} />
      </div>
    </div>
  );
}
