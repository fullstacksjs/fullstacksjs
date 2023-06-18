import SecondaryButton from '@/components/SecondaryButton';

function AuthBtnSkeleton() {
  return (
    <SecondaryButton className="relative overflow-hidden p-4 tablet:p-0">
      <div className="absolute inset-y-0 w-1/2 translate-x-[-200px] skew-x-[-30deg] animate-[skeleton_.9s_infinite] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
      <div className="h-14 w-14 rounded-full bg-fg-muted" />
      <div className="me-2 hidden h-5 w-48 rounded-lg bg-bg-muted tablet:block" />
    </SecondaryButton>
  );
}

export default AuthBtnSkeleton;
