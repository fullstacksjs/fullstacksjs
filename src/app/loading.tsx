// ISSUE: This is a workaround for Next.JS + next-intl integration [https://github.com/amannn/next-intl/issues/1493]
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-bg-0 text-fg-0" />
  );
}
