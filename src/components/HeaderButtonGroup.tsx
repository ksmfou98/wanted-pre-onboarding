import { NIcon, SearchIcon, BellIcon } from "assets/icons";
import React, { ReactElement } from "react";
import styled from "styled-components";

function HeaderButtonGroup(): ReactElement {
  return (
    <HeaderButtonGroupBlock>
      <ButtonListStyled>
        <ButtonItemStyled>
          <SearchIcon />
        </ButtonItemStyled>
        <ButtonItemStyled>
          <BellIcon />
          <NewCircleStyled>
            <NIcon />
          </NewCircleStyled>
        </ButtonItemStyled>
      </ButtonListStyled>
    </HeaderButtonGroupBlock>
  );
}

const HeaderButtonGroupBlock = styled.aside`
  padding: 9px 0;
`;

const ButtonListStyled = styled.div``;

const ButtonItemStyled = styled.button`
  position: relative;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  padding: 0 10px;
  margin-top: 5px;
`;

const NewCircleStyled = styled.span`
  position: absolute;
  top: -6px;
  left: 24px;
  background-color: rgb(51, 102, 255);
  width: 13px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export default HeaderButtonGroup;
