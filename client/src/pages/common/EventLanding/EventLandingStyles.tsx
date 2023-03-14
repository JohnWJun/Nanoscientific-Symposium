import styled from "styled-components";
import { useTheme } from "@mui/material";

export const EventLandingContainer = styled.div`
  background-color: #fff;
  color: #000;

  img.section-logo {
    max-width: 370px;
    margin-right: 20px;
  }
  .banner-section {
    height: 300px;
  }
  .video-section {
    padding-top: 70px;
  }

  .body-container {
    max-width: 1920px;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0px auto;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1024px) {
    .video-section {
      padding-top: 35px;
    }
    img.section-logo {
      max-width: 220px;
      margin-right: 0px;
      margin-bottom: 10px;
    }
    .teaser-video {
      height: auto;
      width: 100%;
    }
  }
  @media screen and (min-width: 1921px) {
    .banner-section {
      height: 600px;
    }
  }
`;
