import React from "react";

import Logo from "../../assets/logo.jpg";

const Header = () => {
  return (
    <div id="main-header">
      <div id="title">
        <img
          src={Logo}
          alt="ReactFood logo. Graphic of a table laid for one."
        />
        <h1>ReactFood</h1>
        {/* TODO HeaderCartButton */}
      </div>
    </div>
  );
};

export default Header;
