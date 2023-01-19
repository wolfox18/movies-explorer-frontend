import React from "react";
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from './Portfolio/Portfolio';
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Main({isNavTabOpened, onCloseNavTab, isLoggedIn, onBurgerclick}) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} onBurgerclick={onBurgerclick} />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Navigation isOpened={isNavTabOpened} onCloseNavTab={onCloseNavTab}/>
      <Footer />
    </>
  );
}

export default Main;
