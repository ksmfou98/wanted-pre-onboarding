import { NIcon, SearchIcon, BellIcon, EtcIcon } from "assets/icons";
import React, { ReactElement } from "react";
import styled from "styled-components";
import media from "styles/media";

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

        <ButtonItemStyled className="etc">
          <EtcIcon />
        </ButtonItemStyled>

        <ButtonItemStyled className="profile">
          <ProfileBox>
            <ProfileImg src="https://k.kakaocdn.net/dn/LQGNu/btrgBidLBMu/XrVCvlaiOEJObmKuuKFW0K/img_110x110.jpg" />
          </ProfileBox>
        </ButtonItemStyled>

        <CompanyServiceLinkedBox>
          <CompanyServiceLinked href="#">기업 서비스</CompanyServiceLinked>
        </CompanyServiceLinkedBox>
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
  ${media.medium} {
    margin-top: -5px;
  }
  .last {
    margin-right: 10px;
    ${media.xlarge} {
      margin-right: 5px;
    }
  }
  .profile {
    margin-top: 0;
    margin-right: 16px;
    padding: 0;
    ${media.xlarge} {
      margin-right: 0;
    }
    ${media.large} {
      display: none;
    }
  }
  .etc {
    ${media.large} {
      padding-left: 10px;
    }
    ${media.medium} {
      margin-right: 10px;
    }
  }
`;

const ButtonItemStyled = styled.button`
  position: relative;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  padding: 0 10px;
  margin-top: 3px;
  ${media.xlarge} {
    padding: 0 5px;
  }
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

const CompanyServiceLinkedBox = styled.div`
  display: flex;
  align-items: center;
  ${media.large} {
    display: none;
  }
  &::before {
    display: block;
    content: "";
    width: 1px;
    height: 10px;
    background-color: #e1e2e3;
    margin: auto 10px;
  }
`;

const CompanyServiceLinked = styled.a`
  font-size: 13px;
  color: #666;
  line-height: 30px;
  height: 30px;
  border: 1px solid #e1e2e3;
  border-radius: 15px;
  padding: 0 10px;
  margin-left: 15px;
  font-weight: 400;
  ${media.xlarge} {
    margin-left: 0;
  }
`;

export default HeaderButtonGroup;
