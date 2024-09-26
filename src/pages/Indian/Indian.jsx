import React from 'react';
import './Indian.css';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/Titlecards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Indian = () => {
  return (
    <div className='indian'>
      <Navbar />

      <div className="more-cards">

        <TitleCards title={"Hindi Movies"} language={"hi"} />
        <TitleCards title={"Telugu Movies"} language={"te"} />
        <TitleCards title={"Tamil Movies"} language={"ta"} />
      </div>
      <Footer />
    </div>
  );
}

export default Indian;
