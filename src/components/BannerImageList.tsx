import { ArrowLeftIcon, ArrowRightIcon } from "assets/icons";
import { bannerImages } from "lib/bannerImages";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import BannerImageListItem from "./BannerImageListItem";

interface IButtonDirection {
  direction: "left" | "right";
}

function BannerImageList(): ReactElement {
  const [bannerImageList, setBannerImageList] = useState(
    bannerImages.sort(() => Math.random() - 0.5)
  );

  useEffect(() => {
    setBannerImageList([...bannerImages, ...bannerImages, ...bannerImages]);
  }, []);

  const slideRef = useRef<HTMLDivElement>(null);
  const SHOW_SLIDE_LENGTH = 1;
  const [currentSlide, setCurrentSlide] = useState(SHOW_SLIDE_LENGTH);

  const onNextSlide = () => {
    // bannerImageList의 맨 앞에 요소를 지우고 맨 뒤에 요소로 추가한다.

    setCurrentSlide(currentSlide + SHOW_SLIDE_LENGTH);

    // setTimeout(() => {
    //   setBannerImageList([...bannerImageList.slice(1), bannerImageList[0]]);
    // }, 1000);
  };

  const onBackSlide = () => {
    // bannerImageList의 맨 뒤에 요소를 지우고 맨 앞에 요소로 추가한다.
    // setTimeout(() => {
    //   setBannerImageList([
    //     bannerImageList[bannerImageList.length - 1],
    //     ...bannerImageList.slice(0, bannerImageList.length - 1),
    //   ]);
    // }, 1000);

    setCurrentSlide(currentSlide - SHOW_SLIDE_LENGTH);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(${
        -1084 * (currentSlide - SHOW_SLIDE_LENGTH)
      }px)`;
    }
    console.log(-1084 * (currentSlide - SHOW_SLIDE_LENGTH));
  }, [currentSlide]);

  return (
    <>
      <BannerImageListBlock ref={slideRef}>
        <ImageList>
          {bannerImageList.map((image, index) => (
            <BannerImageListItem key={index} imageItem={image} />
          ))}
        </ImageList>
      </BannerImageListBlock>

      <ArrowButtonStyled direction="left" onClick={onBackSlide}>
        <IconBox>
          <ArrowLeftIcon />
        </IconBox>
      </ArrowButtonStyled>

      <ArrowButtonStyled direction="right" onClick={onNextSlide}>
        <IconBox>
          <ArrowRightIcon />
        </IconBox>
      </ArrowButtonStyled>
    </>
  );
}

const BannerImageListBlock = styled.div`
  width: 100%;
  position: absolute;
  width: 100%;
  left: -9756px;
`;

const ImageList = styled.div`
  display: flex;
`;

const ArrowButtonStyled = styled.button<IButtonDirection>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 120px;
  width: 30px;
  height: 60px;
  opacity: 0.5;
  border-radius: 15px;
  background-color: #fff;
  font-size: 16px;
  ${(props) =>
    props.direction === "left"
      ? css`
          left: calc((100% - 1210px) / 2);
        `
      : css`
          right: calc((100% - 1200px) / 2);
        `}
`;

const IconBox = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: inherit;
  svg {
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    fill: currentColor;
    flex-shrink: 0;
    font-size: inherit;
  }
`;

export default BannerImageList;
