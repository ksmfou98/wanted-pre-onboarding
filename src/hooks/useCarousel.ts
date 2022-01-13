import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface CarouselOptions {
  data: any[];
  slideItemWidth: number; // @Note 슬라이드 될 아이템 가로 길이
  slideCount: number; // @Note 슬라이드 넘어가는 개수
}

export default function useCarousel(options: CarouselOptions) {
  const { slideCount, data, slideItemWidth } = options;
  const slideRef = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false); // @Note 이동 버튼 클릭시 버튼 비활성화 시키기 위한 상태
  const [currentSlide, setCurrentSlide] = useState(slideCount); // @Note 현재 슬라이드 값
  const [isAnimation, setIsAnimaion] = useState(true); // @Note 슬라이드 애니메이션 여부 -> 무한 슬라이드 구현 시 인덱스 초기화 시에는 에니메이션 사용X
  const [isFlowing, setIsFlowing] = useState(true); // @Note 이 값이 true 이면 자동 슬라이드 실행
  const [isCenterIndex, setIsCenterIndex] = useState(0); // @Note 중앙에 있는 슬라이드 인덱스 (현재 슬라이드 값 + 처음에 초점 맞춰져 있는 슬라이드 인덱스 - 1) -> 마지막에 -1 하는 이유는 인덱스가 0부터 시작해야해서 -1 해줌
  // @Note 데이터 랜덤하게 섞기
  const [dataList, setDataList] = useState(
    data.sort(() => Math.random() - 0.5)
  );
  const ORIGINAL_IMAGE_LENGTH = data.length; // @Note 원본 배열 길이

  const initialFocusSlideIndex = useMemo(() => {
    // @Note 최초 슬라이드 포커스 된 요소 인덱스
    return Math.floor((ORIGINAL_IMAGE_LENGTH * 3) / 2);
  }, [ORIGINAL_IMAGE_LENGTH]);

  // @Note 최초 이미지 리스트를 [이전] [중앙] [다음] 상태로 넣어줌 -> 무한 슬라이드를 위해서
  useEffect(() => {
    setDataList([...data, ...data, ...data]);
  }, [data]);

  //  @Note 화면이 리사이즈 될 동안에는 애니매이션, 화면 슬라이드 막기
  useEffect(() => {
    const handleResize = () => {
      setIsAnimaion(false);
      setIsFlowing(false);
      setTimeout(() => {
        setIsFlowing(true);
        setIsAnimaion(true);
      }, 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const timer = useRef<NodeJS.Timeout>();

  // @Note 슬라이드 이동 버튼 클릭 시 버튼 비활성화 시키기
  const onDisabledButton = () => {
    setIsDisabled(true);
    timer.current = setTimeout(() => {
      setIsDisabled(false);
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  // @Note 다음 슬라이드 이동 버튼
  const onNextSlide = useCallback(() => {
    onDisabledButton();
    setCurrentSlide(currentSlide + slideCount);
  }, [currentSlide, slideCount]);

  // @Note 이전 슬라이드 이동 버튼
  const onPrevSlide = useCallback(() => {
    onDisabledButton();
    setCurrentSlide(currentSlide - slideCount);
  }, [currentSlide, slideCount]);

  useEffect(() => {
    if (!slideRef.current) return;
    //@Note 현재 슬라이드가 이미지 갯수를 넘어갔을 경우 초기 상태로 몰래 바꿔치기하는 작업
    if (
      currentSlide === ORIGINAL_IMAGE_LENGTH + 1 ||
      currentSlide * -1 === ORIGINAL_IMAGE_LENGTH - 1
    ) {
      setTimeout(() => {
        setIsAnimaion(false); // @Note 바꿔치기할 때 animation을 잠깐 끔 (사용자에게 들키지 않기 위해 )
        if (slideRef.current) {
          slideRef.current.style.left = `${
            initialFocusSlideIndex * slideItemWidth * -1
          }px`;
        }
        setCurrentSlide(slideCount);
      }, 500);
      setTimeout(() => {
        // @Note 바꿔치기 성공한 뒤에 animation을 바로 킴
        setIsAnimaion(true);
      }, 600);
    }

    slideRef.current.style.transform = `translateX(${
      -slideItemWidth * (currentSlide - slideCount)
    }px)`;
  }, [
    currentSlide,
    slideItemWidth,
    slideCount,
    ORIGINAL_IMAGE_LENGTH,
    initialFocusSlideIndex,
  ]);

  // @Note 무한 슬라이드를 위해 setInterval 사용
  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isFlowing) {
      intervalId = setInterval(() => {
        setCurrentSlide(currentSlide + slideCount);
      }, 3500);
    }
    return () => clearTimeout(intervalId);
  }, [isFlowing, currentSlide, slideCount]);

  // @Note 현재 슬라이드가 원본 이미지 길이를 벗어났을 때는 그대로 return 시켜주고 아닐 경우에는 center 상태에 index를 넣어줌
  // @Note 이렇게 하는 이유는 center Index 값을 가지고 있어야 이미지 아래에 information 정보를 보여줄 수 있음
  useEffect(() => {
    if (currentSlide > ORIGINAL_IMAGE_LENGTH) return;
    if (currentSlide <= -1 * ORIGINAL_IMAGE_LENGTH + slideCount) return;

    setIsCenterIndex(currentSlide - 1 + initialFocusSlideIndex);
  }, [currentSlide, ORIGINAL_IMAGE_LENGTH, initialFocusSlideIndex, slideCount]);

  const onChangeFlowing = (value: boolean) => {
    setIsFlowing(value);
  };

  const [touchStartClientX, setTouchStartClientX] = useState(0);
  const [touchEndClientX, setTouchEndClientX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    onChangeFlowing(false);
    setTouchStartClientX(e.touches[0].clientX);
    setTouchEndClientX(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndClientX(e.touches[0].clientX);
  };

  const touchMoveDistance = useMemo(() => {
    return touchEndClientX - touchStartClientX;
  }, [touchEndClientX, touchStartClientX]);

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    onChangeFlowing(true);
    if (touchMoveDistance > 0) {
      onPrevSlide();
    } else {
      onNextSlide();
    }
    setTouchStartClientX(0);
    setTouchEndClientX(0);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    onChangeFlowing(false);
    setTouchStartClientX(e.clientX);
    setTouchEndClientX(e.clientX);
    setIsDragging(true);
    setIsAnimaion(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setTouchEndClientX(e.clientX);
    console.log(touchStartClientX - touchEndClientX);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    onChangeFlowing(true);
    setIsAnimaion(true);
    if (touchMoveDistance > Math.floor(slideItemWidth / 4)) {
      onPrevSlide();
    }
    if (touchMoveDistance < Math.floor(slideItemWidth / 4) * -1) {
      onNextSlide();
    }
    setTouchStartClientX(0);
    setTouchEndClientX(0);
    setIsDragging(false);
  };

  return {
    slideRef,
    isAnimation,
    initialFocusSlideIndex,
    dataList,
    isCenterIndex,
    onPrevSlide,
    onNextSlide,
    onChangeFlowing,
    isDisabled,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    touchMoveDistance,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
}
