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

        <ButtonItemStyled className="last">
          <BellIcon />
          <NewCircleStyled>
            <NIcon />
          </NewCircleStyled>
        </ButtonItemStyled>

        <ButtonItemStyled className="profile">
          <ProfileBox>
            <ProfileImg src="https://k.kakaocdn.net/dn/LQGNu/btrgBidLBMu/XrVCvlaiOEJObmKuuKFW0K/img_110x110.jpg" />
          </ProfileBox>
        </ButtonItemStyled>
      </ButtonListStyled>
    </HeaderButtonGroupBlock>
  );
}

const HeaderButtonGroupBlock = styled.aside`
  padding: 9px 0;
`;

const ButtonListStyled = styled.div`
  display: flex;
  align-items: center;
  .last {
    margin-right: 10px;
  }
  .profile {
    margin-top: 0;
    margin-right: 11px;
    padding: 0;
  }
`;

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
  top: -9px;
  left: 24px;
  background-color: rgb(51, 102, 255);
  width: 13px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ProfileBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e1e2e3;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

export default HeaderButtonGroup;
