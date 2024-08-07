import Link from 'next/link';

const DynamicLink = ({ handleClick,path, children }) => {
  return (
    <Link onClick={handleClick} href={`http://localhost:3000/${path}`}>
      {children}
    </Link>
  );
};

export default DynamicLink;
