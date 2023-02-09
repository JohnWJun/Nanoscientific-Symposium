import { Stack, Typography, useTheme } from "@mui/material";
import axios from "axios";
import Loading from "components/Loading/Loading";
import SpeakerImage from "components/SpeakerImage/SpeakerImage";
import usePageViews from "hooks/usePageViews";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "components/Link/LinkWithSearch";
import useNSSType from "hooks/useNSSType";
import {
  mainFontSize,
  smallFontSize,
  subHeadingFontSize,
} from "utils/FontSize";
import InnerHTML from "dangerously-set-html-content";
import LandingSection from "components/Section/LandingSection";
import { globalData } from "utils/GlobalData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SpeakerDetailContainer } from "./SpeakerDetailStyles";

const SpeakerDetail = () => {
  const { id } = useParams();
  const pathname = usePageViews();
  const nssType = useNSSType();
  const theme = useTheme();

  const [speakerData, setSpeakerData] =
    useState<Speaker.speakerDetailType>(null);
  const [speakerLoading, setSpeakerLoading] = useState<boolean>(true);
  const nationData = globalData.get(nssType) as Common.globalDataType;

  const { speakerBannerURL } = globalData.get(
    "common",
  ) as Common.globalDataType;

  const getSpeakerDetailById = () => {
    setSpeakerLoading(true);
    axios
      .get(`/api/page/common/speakers/detail?nation=${pathname}&id=${id}`)
      .then((res) => setSpeakerData(res.data.result))
      .catch((err) => console.log(err))
      .finally(() => {
        setSpeakerLoading(false);
      });
  };

  useEffect(() => {
    getSpeakerDetailById();
  }, []);

  return (
    <SpeakerDetailContainer className="body-fit">
      {speakerLoading && <Loading />}
      {!speakerLoading && (
        <Stack className="layout">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Link to={`/${pathname}/speakers`} className="p0">
              <ArrowBackIcon className="btn-alpha" />
            </Link>
          </Stack>
          <Stack
            mb={2}
            sx={{
              flexDirection: {
                mobile: "column",
                laptop: "row",
              },
              alignItems: {
                mobile: "center",
                laptop: "initial",
              },
            }}
          >
            <SpeakerImage
              src={speakerData.image_path}
              alt={speakerData.name}
              className="speaker-image-container"
            />
            <Stack>
              <Typography
                fontSize={subHeadingFontSize}
                mb={2}
                sx={{
                  display: "flex",
                  flexDirection: { mobile: "column", tablet: "row" },
                }}
              >
                <span
                  style={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    marginRight: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {speakerData.name}:{" "}
                </span>
                <InnerHTML html={speakerData.title} />
              </Typography>
              <Typography className="editor-content" fontSize={mainFontSize}>
                <InnerHTML html={speakerData.belong} />
              </Typography>
            </Stack>
          </Stack>
          <Typography
            className="editor-content"
            fontSize={smallFontSize}
            lineHeight={1.7}
            color={theme.palette.grey[600]}
          >
            <InnerHTML html={speakerData.description} />
          </Typography>
        </Stack>
      )}
    </SpeakerDetailContainer>
  );
};

export default SpeakerDetail;
