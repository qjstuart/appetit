import React from "react";

import Logo from "../../assets/logo.jpg";
// import HeaderCartButton from "./HeaderCartButton";
import Button from "../UI/Button";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header id={styles["main-header"]}>
      <div id={styles.title}>
        <img src={Logo} alt="ReactFood logo. Table laid for one." />
        <h1>Appétit</h1>
      </div>
      <Button textButton>Cart (0)</Button>
    </header>
  );
};

export default Header;
