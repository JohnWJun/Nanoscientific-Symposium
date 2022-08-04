import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

const BREAK_POINT_SMALL_MOBILE = 513;
const BREAK_POINT_MOBILE = 768;
const BREAK_POINT_TABLET = 886;
const BREAK_POINT_SMALL_PC = 1190;
const Break_POINT_BIG_PC = 1540;

export const PosterTitle = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.1;
  background-color: #1d2088;
  color: #fff;
  padding: 9px 5px;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  overflow: hidden;
  // max-height: 64px;
  height: 64px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-family: "Noto Serif", serif;
  font-weight: 700;
  position: relative;
  text-align: center;
  vertical-align: center;

  @media only screen and (max-width: ${BREAK_POINT_SMALL_PC}px) {
    font-size: 11px;
    line-height: 12px;
    height: 43px;
    padding: 6px 5px 9px 5px;
  }

  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 10px;
    line-height: 12px;
    height: 43px;
    padding: 5px 5px 9px 5px px;
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 16px;
    height: 64px;
    line-height: 1.1;
    padding: 9px 5px;
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_MOBILE}px) {
    font-size: 15px;
    height: 60px;
    line-height: 1.1;
    padding: 9px 5px;
  }
`;

export const PosterAuthor = styled.div`
  font-size: 0.625rem;
`;

export const DividedLine = styled.div`
  width: 100%;
  min-height: 3px;
  background: linear-gradient(45deg, transparent, #1d2088, transparent);
`;

export const PosterSubTitle = styled.div`
  font-size: 0.5rem;
  line-height: 1.2;
  margin: 8px 0;
`;

export const ImageContainer = styled.div`
  max-width: 100%;
  margin: auto 0;
`;

export const Photos = styled.img`
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-right: 0;
  height: 310px;
`;

export const PosterOverlay = styled.div`
  position: absolute;
  opacity: 0;
  top: 0;
  /*display: none; */
  width: 100%;
  height: 534px;
  background-color: rgba(46, 132, 206, 0.7);
  transition: opacity 0.4s ease;
  cursor: pointer;
`;

export const StyledButton = styled(IconButton)`
  position: absolute;
  cursor: pointer;

  &.ZoomIn {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }

  &.Close {
    left: 50%;
    transform: translateX(-50%);
    bottom: -4%;
    color: rgba(32, 33, 36, 0.6);
    &:hover {
      color: rgba(32, 33, 36, 0.8);
    }
    cursor: pointer;
    height: 34px;
    width: 34px;
  }
`;

export const PdfContainer = styled.div`
  visibility: hidden; /* opacity:0 */
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  &.is--open {
    visibility: visible;
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_MOBILE}px) {
    height: 65%;
  }
`;

// iframe
export const PdfInner = styled.iframe`
  width: 100%;
  height: 100%;
`;

// 가장 바깥쪽 -> 그림자 비추는 효과 x
export const PosterInner = styled.div`
  width: 100%;
  height: 534px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // 변경
  align-items: center;
  background: #ffffff;
  text-align: center;
  padding: 12px 10px;
  /* -webkit-box-reflect: below 0.01px */
  /* linear-gradient(transparent, transparent, #0006); */
  box-shadow: 0px 5px 11px #9fb4d4cf;
`;

export const PosterContainer = styled.div`
  min-height: calc(100vh - 64px - 110px);
  // width: 70%;
  width: 1536px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  // padding: 0 20%;

  .mySwiper {
    height: 100%;
    padding: 72px 0;
  }

  @media only screen and (max-width: ${Break_POINT_BIG_PC}px) {
    width: 1188px;

    ${Photos} {
      height: auto;
    }
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_PC}px) {
    width: 869px;

    ${PosterInner} {
      height: 436px;
    }

    ${PosterOverlay} {
      height: 436px;
    }
  }

  @media only screen and (max-width: 1140px) {
    min-height: calc(100vh - 64px - 67px);
  }

  @media only screen and (max-width: 1023.33px) {
    min-height: calc(100vh - 64px - 58px);
  }

  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    width: 745px;

    ${PosterInner} {
      height: 367px;
    }

    ${PosterOverlay} {
      height: 367px;
    }
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    // width: 400px;
    width: 100%;

    ${PosterInner} {
      height: 100%;
    }

    ${Photos} {
      width: 100%;
      height: 321px;
    }

    ${PosterOverlay} {
      height: 100%;
    }

    .mySwiper {
      padding: 72px 60px;
    }
  }

  @media only screen and (max-width: ${BREAK_POINT_SMALL_MOBILE}px) {
    width: 100%;

    ${Photos} {
      width: 100%;
      height: 277px;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #1d2088;
  }

  font-family: "Noto Serif", serif;

  //   스왑할 때, transition과 충돌나기때문에 사용x
  //   .swiper-slide {
  //     transition-duration: 300ms !important;
  //   }

  .swiper-slide.swiper-slide-active {
    /* pointer-events: auto; */
    &:hover {
      ${PosterOverlay} {
        opacity: 1;
      }
    }
  }
  .swiper-slide:not(.swiper-slide-active) {
    /* pointer-events: none; */
    &:hover {
      ${PosterOverlay} {
        opacity: 0;
      }
    }
  }
`;

export const PosterPageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  background: black;
  visibility: hidden;
  opacity: 0.5;

  &.is--open {
    visibility: visible;
  }
`;

export const PosterBackground = styled.div`
  background-image: url(https://d25unujvh7ui3r.cloudfront.net/latam/posters_pdf/background.png);
  background-size: cover;
  background-position: center;
`;