import { IHeaderMenuItem } from "lib/headerMenus";
import React, { ReactElement } from "react";
import styled from "styled-components";

interface HeaderMenuListItemProps {
  menuItem: IHeaderMenuItem;
}

function HeaderMenuListItem({
  menuItem,
}: HeaderMenuListItemProps): ReactElement {
  const { icon, name } = menuItem;

  return (
    <HeaderMenuListItemStyled>
      <MenuLinked href="#">{name}</MenuLinked>
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

export default HeaderMenuListItem;
