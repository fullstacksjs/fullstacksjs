import useIsDeviceTablet from '../hooks/useDeviceSize';
import SecondaryButton from './SecondaryButton';

function AuthBtnSkeleton() {
  const [isMobile] = useIsDeviceTablet();

  return (
    <SecondaryButton
      className={`relative overflow-hidden ${isMobile ? '!p-4' : ''}`}
    >
      <div className="absolute inset-y-0 w-1/2 translate-x-[-200px] skew-x-[-30deg] animate-[skeleton_.9s_infinite] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
      <div className="h-14 w-14 rounded-full bg-fg-muted" />
      {!isMobile && <div className="mr-2 h-5  w-48 rounded-lg bg-bg-muted" />}
    </SecondaryButton>
  );
}

export default AuthBtnSkeleton;
