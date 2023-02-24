
import React from 'react';
import { Image } from 'react-bootstrap';


const Preloader = (props) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      <Image className="loader-element animate__animated animate__jackInTheBox" src={`${process.env.PUBLIC_URL}/images/wait-loading.gif`} height={150} />
    </div>
  );
};

export default Preloader;
