import React from "react";

import Logo from "../../assets/logo.jpg";
import HeaderCartButton from "./HeaderCartButton";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div id={styles["main-header"]}>
      <div id={styles.title}>
        <img src={Logo} alt="ReactFood logo. Table laid for one." />
        <h1>Appétit</h1>
      </div>
      <HeaderCartButton />
    </div>
  );
};

export default Header;
