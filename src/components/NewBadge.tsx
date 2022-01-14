import { NIcon } from "assets/icons";
import React, { ReactElement } from "react";
import styled from "styled-components";

interface NewBadgeProps {
  top: number;
  left: number;
}

// 알림 아이콘, 프로필 아이콘 위에 N 뱃지를 보여주는 컴포넌트
function NewBadge({ left, top }: NewBadgeProps): ReactElement {
  return (
    <NewBadgeStyled top={top} left={left}>
      <NIcon />
    </NewBadgeStyled>
  );
}

const NewBadgeStyled = styled.div<NewBadgeProps>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: rgb(51, 102, 255);
  width: 13px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export default NewBadge;
