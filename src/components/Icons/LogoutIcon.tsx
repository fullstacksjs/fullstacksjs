interface Props {
  className: string;
}

function LogoutIcon({ className }: Props) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10.166 19H7.49935C7.14573 19 6.80659 18.8595 6.55654 18.6095C6.30649 18.3594 6.16602 18.0203 6.16602 17.6667V8.33333C6.16602 7.97971 6.30649 7.64057 6.55654 7.39052C6.80659 7.14048 7.14573 7 7.49935 7H10.166" />
      <path d="M14.8327 16.3334L18.166 13.0001L14.8327 9.66675" />
      <path d="M18.166 13H10.166" />
    </svg>
  );
}

export default LogoutIcon;
