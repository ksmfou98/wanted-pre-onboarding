import { ArrowLeftIcon, ArrowRightIcon } from "assets/icons";
import { bannerImages } from "lib/bannerImages";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import BannerImageListItem from "./BannerImageListItem";

interface IButtonDirection {
  direction: "left" | "right";
}

function BannerImageList(): ReactElement {
  const SLIDE_ITEM_WIDTH = 1084; // @Note 슬라이드 할 요소 가로 길이
  const SHOW_SLIDE_LENGTH = 1; // @Note 슬라이드 할 요소 개수
  const INITIAL_FOCUS_SLIDE_INDEX = 16; // @Note 처음에 초점 맞춰져 있는 슬라이드 인덱스
  const ORIGINAL_IMAGE_LENGTH = bannerImages.length; // @Note 원본 이미지 개수

  const [bannerImageList, setBannerImageList] = useState(
    bannerImages.sort(() => Math.random() - 0.5)
  );
  const [isAnimation, setIsAnimaion] = useState(true);
  const [isFlowing, setIsFlowing] = useState(true);
  const [isCenterIndex, setIsCenterIndex] = useState(0);

  useEffect(() => {
    setBannerImageList([...bannerImages, ...bannerImages, ...bannerImages]);
  }, []);

  const slideRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(SHOW_SLIDE_LENGTH);

  const onNextSlide = useCallback(() => {
    setCurrentSlide(currentSlide + SHOW_SLIDE_LENGTH);
  }, [currentSlide]);

  const onBackSlide = useCallback(() => {
    setCurrentSlide(currentSlide - SHOW_SLIDE_LENGTH);
  }, [currentSlide]);

  useEffect(() => {
    if (!slideRef.current) return;
    if (
      currentSlide === bannerImages.length + 1 ||
      currentSlide * -1 === bannerImages.length - 1
    ) {
      setTimeout(() => {
        setIsAnimaion(false);
        if (slideRef.current) {
          slideRef.current.style.left = "-17344px";
        }
        setCurrentSlide(SHOW_SLIDE_LENGTH);
      }, 500);
      setTimeout(() => {
        setIsAnimaion(true);
      }, 600);
    }

    slideRef.current.style.transform = `translateX(${
      -SLIDE_ITEM_WIDTH * (currentSlide - SHOW_SLIDE_LENGTH)
    }px)`;
  }, [currentSlide]);

  useLayoutEffect(() => {
    let intervalId: any;
    if (isFlowing) {
      intervalId = setInterval(() => {
        setCurrentSlide(currentSlide + SHOW_SLIDE_LENGTH);
      }, 3500);
    }
    return () => clearTimeout(intervalId);
  }, [isFlowing, currentSlide]);

  // @Note
  useEffect(() => {
    if (currentSlide > ORIGINAL_IMAGE_LENGTH) return;
    if (currentSlide <= -1 * ORIGINAL_IMAGE_LENGTH + SHOW_SLIDE_LENGTH) return;

    setIsCenterIndex(currentSlide - 1);
  }, [currentSlide, ORIGINAL_IMAGE_LENGTH]);

  console.log(currentSlide);

  return (
    <BannerImageListContainer>
      <ImageListBox
        ref={slideRef}
        isAnimation={isAnimation}
        initialLeft={SLIDE_ITEM_WIDTH * -1 * INITIAL_FOCUS_SLIDE_INDEX}
        onMouseEnter={() => setIsFlowing(false)}
        onMouseLeave={() => setIsFlowing(true)}
      >
        <ImageList>
          {bannerImageList.map((image, index) => (
            <BannerImageListItem
              key={index}
              imageItem={image}
              isCenter={index - INITIAL_FOCUS_SLIDE_INDEX === isCenterIndex}
            />
          ))}
        </ImageList>
      </ImageListBox>

      <ArrowButtonStyled
        direction="left"
        onClick={onBackSlide}
        onMouseEnter={() => setIsFlowing(false)}
        onMouseLeave={() => setIsFlowing(true)}
      >
        <IconBox>
          <ArrowLeftIcon />
        </IconBox>
      </ArrowButtonStyled>

      <ArrowButtonStyled
        direction="right"
        onClick={onNextSlide}
        onMouseEnter={() => setIsFlowing(false)}
        onMouseLeave={() => setIsFlowing(true)}
      >
        <IconBox>
          <ArrowRightIcon />
        </IconBox>
      </ArrowButtonStyled>
    </BannerImageListContainer>
  );
}

const BannerImageListContainer = styled.div`
  padding-top: 25px;
  width: 1084px;
  margin: 0 auto;
  position: relative;
  height: 350px;
`;

const ImageListBox = styled.div<{ isAnimation: boolean; initialLeft: number }>`
  width: 100%;
  position: absolute;
  left: ${(props) => props.initialLeft}px;
  ${({ isAnimation }) => isAnimation && "transition: all 0.5s ease-in-out"};
`;

const ImageList = styled.div`
  display: flex;
`;

const ArrowButtonStyled = styled.button<IButtonDirection>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 145px;
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
