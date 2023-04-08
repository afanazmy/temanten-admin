const DotsThree = ({ size }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 16} height={size ?? 16} fill="#000000" viewBox="0 0 256 256">
      <path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128ZM48,100a28,28,0,1,0,28,28A28,28,0,0,0,48,100Zm160,0a28,28,0,1,0,28,28A28,28,0,0,0,208,100Z"></path>
    </svg>
  );
};

export default DotsThree;
