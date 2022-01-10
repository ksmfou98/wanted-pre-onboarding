import { IHeaderMenuItem } from "lib/headerMenus";
import React, { ReactElement } from "react";
import styled from "styled-components";
import HeaderMenuIcon from "./HeaderMenuIcon";

interface HeaderMenuListItemProps {
  menuItem: IHeaderMenuItem;
}

function HeaderMenuListItem({
  menuItem,
}: HeaderMenuListItemProps): ReactElement {
  const { icon, name } = menuItem;

  return (
    <HeaderMenuListItemStyled>
      <MenuLinked href="#">
        {name}
        <MenuIcon isBeta={icon === "beta"}>
          <HeaderMenuIcon icon={icon} />
        </MenuIcon>
      </MenuLinked>
    </HeaderMenuListItemStyled>
  );
}

const HeaderMenuListItemStyled = styled.li`
  height: inherit;
  display: inline-block;
`;

const MenuLinked = styled.a`
  position: relative;
  vertical-align: middle;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  padding: 15px;
  display: inline-block;
  color: #444444;
`;

const MenuIcon = styled.div<{ isBeta: boolean }>`
  position: absolute;
  top: 10px;
  right: ${({ isBeta }) => (isBeta ? "-7px" : "-5px")};
`;

export default HeaderMenuListItem;
