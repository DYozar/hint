import Link from 'next/link';

const DynamicLink = ({ handleClick,path, children }) => {
  return (
    <Link onClick={handleClick} href={`https://nuttynook.com/${path}`}>
      {children}
    </Link>
  );
};

export default DynamicLink;
