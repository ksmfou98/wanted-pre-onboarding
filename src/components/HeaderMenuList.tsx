import { headerMenus } from "lib/headerMenus";
import React, { ReactElement } from "react";
import styled from "styled-components";
import HeaderMenuListItem from "./HeaderMenuListItem";

function HeaderMenuList(): ReactElement {
  return (
    <HeaderMenuListBlock>
      {headerMenus.map((menu) => (
        <HeaderMenuListItem menuItem={menu} key={menu.id} />
      ))}
    </HeaderMenuListBlock>
  );
}

const HeaderMenuListBlock = styled.ul``;

export default HeaderMenuList;
