const Funnel = ({ size }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} fill="#000000" viewBox="0 0 256 256">
      <path d="M200,128a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,128Zm32-56H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-80,96H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"></path>
    </svg>
  );
};

export default Funnel;
