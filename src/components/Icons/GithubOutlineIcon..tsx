interface IProps {
  className: string;
}

function GithubOutlineIcon({ className }: IProps) {
  return (
    <svg
      className={className}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.55492 14.2672C2.58695 15.3711 2.58695 12.4273 0.999756 12.0593M12.1101 16.4751V13.6269C12.1399 13.276 12.0887 12.9232 11.9601 12.592C11.8315 12.2608 11.6283 11.9588 11.3641 11.706C13.856 11.4484 16.4749 10.5726 16.4749 6.55422C16.4746 5.52667 16.0484 4.53854 15.2845 3.79433C15.6462 2.89534 15.6206 1.90167 15.213 1.01972C15.213 1.01972 14.2766 0.762129 12.1101 2.10896C10.2912 1.65179 8.37383 1.65179 6.55492 2.10896C4.38841 0.762129 3.45196 1.01972 3.45196 1.01972C3.04435 1.90167 3.01878 2.89534 3.38054 3.79433C2.61085 4.54406 2.18421 5.54113 2.19015 6.5763C2.19015 10.5653 4.80901 11.4411 7.3009 11.7281C7.0398 11.9783 6.83844 12.2767 6.70991 12.6038C6.58139 12.931 6.52858 13.2796 6.55492 13.6269V16.4751"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export default GithubOutlineIcon;
