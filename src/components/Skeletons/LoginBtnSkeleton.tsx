interface Props {
  isMobile: boolean;
}

function LoginBtnSkeleton({ isMobile }: Props) {
  return (
    <div className="relative flex items-center gap-4 overflow-x-hidden rounded-lg bg-bg-muted px-4 py-3 text-xsm leading-snug text-white">
      <div className="absolute inset-y-0 w-1/2 translate-x-[-200px] skew-x-[-30deg] animate-[skeleton_.9s_infinite] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
      <div className="h-14 w-14 rounded-full bg-[rgba(112,78,78,0.2)]" />
      {!isMobile && <div className="h-7 w-32  rounded-lg bg-fg-muted" />}
    </div>
  );
}

export default LoginBtnSkeleton;
