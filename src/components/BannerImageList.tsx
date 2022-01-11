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
  const [bannerImageList, setBannerImageList] = useState(
    bannerImages.sort(() => Math.random() - 0.5)
  );
  const [isAnimation, setIsAnimaion] = useState(true);
  const [isFlowing, setIsFlowing] = useState(false);

  useEffect(() => {
    setBannerImageList([...bannerImages, ...bannerImages, ...bannerImages]);
  }, []);

  const slideRef = useRef<HTMLDivElement>(null);
  const SHOW_SLIDE_LENGTH = 1;
  const [currentSlide, setCurrentSlide] = useState(SHOW_SLIDE_LENGTH);

  const onNextSlide = useCallback(() => {
    setCurrentSlide(currentSlide + SHOW_SLIDE_LENGTH);
  }, [currentSlide]);

  const onBackSlide = useCallback(() => {
    setCurrentSlide(currentSlide - SHOW_SLIDE_LENGTH);
  }, [currentSlide]);

  // const onAutoSlide = useCallback(() => {
  //   console.log("dd");
  //   if (timer === undefined) {
  //     setTimer(
  //       setInterval(() => {
  //         onNextSlide();
  //       }, 3000)
  //     );
  //   }
  // }, [onNextSlide, timer]);

  // const onStopAutoSlide = useCallback(() => {
  //   console.log("xx");
  //   clearInterval(timer);
  //   setTimer(undefined);
  // }, [timer]);

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
      -1084 * (currentSlide - SHOW_SLIDE_LENGTH)
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

  return (
    <BannerImageListContainer>
      <ImageListBox
        ref={slideRef}
        isAnimation={isAnimation}
        onMouseEnter={() => setIsFlowing(false)}
        onMouseLeave={() => setIsFlowing(true)}
      >
        <ImageList>
          {bannerImageList.map((image, index) => (
            <BannerImageListItem key={index} imageItem={image} />
          ))}
        </ImageList>
      </ImageListBox>

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

const ImageListBox = styled.div<{ isAnimation: boolean }>`
  width: 100%;
  position: absolute;
  left: -17344px;
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
