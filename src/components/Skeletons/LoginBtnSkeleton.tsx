interface IProp {
  isMobile: boolean;
}

function LoginBtnSkeleton({ isMobile }: IProp) {
  return (
    <div className="relative overflow-x-hidden flex gap-4 items-center rounded-lg bg-[rgba(255,255,255,0.1)] text-white px-4 py-3 text-xsm leading-snug">
      <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent translate-x-[-200px] -skew-x-[30deg] animate-[skeleton_.9s_infinite]" />
      <div className="w-14 h-14 bg-[rgba(255,255,255,0.2)] rounded-full" />
      {!isMobile && (
        <div className="w-32 h-7  bg-[rgba(255,255,255,0.2)] rounded-lg" />
      )}
    </div>
  );
}

export default LoginBtnSkeleton;
