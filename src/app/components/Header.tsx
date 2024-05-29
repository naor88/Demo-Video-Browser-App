import React from 'react';

interface Props {
  headerText: string;
}

const Header: React.FC<Props> = ({ headerText }) => {
  return (
    <div className='sticky top-0 z-10 bg-white text-black flex justify-around text-4xl p-8'>
      <h1>{headerText}</h1>
    </div>
  );
};

export default Header;
