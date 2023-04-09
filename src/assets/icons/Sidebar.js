const Sidebar = ({ size }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} fill="#000000" viewBox="0 0 256 256">
      <path d="M88,48V208H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z" opacity="0.2"></path>
      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,152H56a8,8,0,0,0,0-16H40V120H56a8,8,0,0,0,0-16H40V88H56a8,8,0,0,0,0-16H40V56H80V200H40Zm176,48H96V56H216V200Z"></path>
    </svg>
  );
};

export default Sidebar;
