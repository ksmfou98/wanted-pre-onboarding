import { bannerImages } from "lib/bannerImages";
import React, { ReactElement } from "react";
import styled from "styled-components";
import BannerImageListItem from "./BannerImageListItem";

function BannerImageList(): ReactElement {
  return (
    <BannerImageListBlock>
      <ImageList>
        {bannerImages.map((image) => (
          <BannerImageListItem key={image.id} imageItem={image} />
        ))}
      </ImageList>
    </BannerImageListBlock>
  );
}

const BannerImageListBlock = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 50px;
`;

const ImageList = styled.div`
  width: 57024px;
`;

export default BannerImageList;
