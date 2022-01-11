# 원티드 프리 온보딩 코스 프론트 엔드

## 구현 요구사항 분석

- 슬라이드(캐러샐) 기능
  - 슬라이드 되어야할 이미지가 항상 페이지의 정중앙에 유지되도록 설정
  - 정확하진 않지만 측정해본 결과 3~4초 마다 이미지가 자동 슬라이드 되고있음. (개발 완성 되고 비교해서 시간 똑같이 맞출 예정)
  - 이미지에 마우스 hover시에 이미지 슬라이드 멈춤.
  - 이미지가 무한 반복됨
    - 브라우저 배율을 500%로 원티드 페이지 분석해보니 이미지가 계속 무한으로 되고 있음
    - 슬라이드가 1개 넘어갈 때마다 맨앞 이미지들을 맨뒤로 이동 시켜야함
  - 페이지를 새로 고침 할 때마다 나오는 이미지가 다름
    - 랜더링 할 때 이미지 배열을 랜덤으로 수정

<br />

## 이슈 사항

- 개발자 도구에서 메인 로고의 폰트를 도저히 못찾겠어서 최대한 비슷한 roboto 폰트를 이용했습니다 ..
