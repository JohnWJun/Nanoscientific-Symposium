import { Button, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import ThumbnailCard from "components/ThumbnailCard/ThumbnailCard";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OnDemandFilter from "components/OnDemandFilter/OnDemandFilter";
import { smallFontSize, xsmallFontSize } from "utils/FontSize";
import { OnDemandContainer } from "./OnDemandStyles";

const OnDemand = () => {
  const theme = useTheme();

  const [videoList, setVideoList] = useState<Common.onDemandVideoType[]>([]);
  const [filteredVideoList, setFilteredVideoList] = useState<
    Common.onDemandVideoType[]
  >([]);
  const [videoListLoading, setVideoListLoading] = useState<boolean>(false);

  const [filterList, setFilterList] = useState<Common.onDemandTagType[]>([]);

  const [yearList, setYearList] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<Common.onDemandTagType[]>(
    [],
  );

  const [regionList, setRegionList] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<
    Common.onDemandTagType[]
  >([]);

  const [languageList, setLanguageList] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<
    Common.onDemandTagType[]
  >([]);

  useEffect(() => {
    getOnDemandList();
    setFilteredVideoList(videoList);
  }, []);

  useEffect(() => {
    setSelectedYear(filterList.filter((f) => f.type === "year"));
    setSelectedRegion(filterList.filter((f) => f.type === "region"));
    setSelectedLanguage(filterList.filter((f) => f.type === "language"));
  }, [filterList]);

  useEffect(() => {
    filterByTag();
  }, [selectedYear, selectedRegion, selectedLanguage]);

  const getOnDemandList = async () => {
    try {
      setVideoListLoading(true);
      const res = await axios.get("/api/page/common/ondemand");
      setVideoList(res.data.result);
      setFilteredVideoList(res.data.result);

      const years = [...new Set(res.data.result.map((v: any) => v.year))];
      setYearList(
        years.map((e) => {
          return { type: "year", value: e };
        }),
      );
      const regions = [...new Set(res.data.result.map((v: any) => v.region))];
      setRegionList(
        regions.map((e) => {
          return { type: "region", value: e };
        }),
      );
      const languages = [
        ...new Set(res.data.result.map((v: any) => v.language)),
      ];
      setLanguageList(
        languages.map((e) => {
          return { type: "language", value: e };
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setVideoListLoading(false);
    }
  };

  const filterByTag = () => {
    let newVideoList = JSON.parse(JSON.stringify(videoList));
    if (selectedYear.length !== 0) {
      newVideoList = newVideoList.filter((v: Common.onDemandVideoType) => {
        return selectedYear.some((y) => v.year.indexOf(y.value) !== -1);
      });
    }
    if (selectedRegion.length !== 0) {
      newVideoList = newVideoList.filter((v: Common.onDemandVideoType) => {
        return selectedRegion.some((y) => v.region.indexOf(y.value) !== -1);
      });
    }
    if (selectedLanguage.length !== 0) {
      newVideoList = newVideoList.filter((v: Common.onDemandVideoType) => {
        return selectedLanguage.some((y) => v.language.indexOf(y.value) !== -1);
      });
    }
    setFilteredVideoList(newVideoList);
  };

  const handleAddTag = (
    e: React.MouseEvent<HTMLButtonElement>,
    t: Common.onDemandTagType,
  ) => {
    const tagRef = document.querySelector(
      `.tag.tag-${t.value.replace(/\s/g, "-")}`,
    );
    let newFilterList = JSON.parse(JSON.stringify(filterList));
    if (filterList.map((f) => f.value).indexOf(t.value) === -1) {
      newFilterList.push(t);
      tagRef.classList.add("active");
    } else {
      newFilterList = newFilterList.filter((f) => f.value !== t.value);
      tagRef.classList.remove("active");
    }
    setFilterList(newFilterList);
  };

  // 삭제 handler
  const handleDeleteEachFilter = (target: Common.onDemandTagType) => {
    // filterList 에서 선택된 것 제거
    let tmpFilterList = JSON.parse(JSON.stringify(filterList));

    tmpFilterList = tmpFilterList.filter((f) => f.value !== target.value);
    setFilterList(tmpFilterList);

    document
      .querySelector(`.tag.tag-${target.value.replace(/\s/g, "-")}`)
      .classList.remove("active");
  };
  const handleClearFilter = () => {
    // filterList를 빈 리스트로 대체.
    setFilterList([]);
    // 모든 tag들의 active 클래스 제거
    document.querySelectorAll(`.tag`).forEach((e) => {
      e.classList.remove("active");
    });
  };

  return (
    <OnDemandContainer>
      <Stack flexDirection="row" justifyContent="center">
        {/* control panel */}
        <Stack className="control-panel" sx={{ p: "8px 12px" }}>
          <Box className="selected-filters">
            <Stack direction="row" justifyContent="space-between">
              <Typography
                fontSize={xsmallFontSize}
                color={theme.palette.grey[600]}
                mb="5px"
              >
                Selected Filters
              </Typography>
              <Typography
                component="button"
                className="clear-btn"
                fontSize={xsmallFontSize}
                color={theme.palette.grey[600]}
                mb="5px"
                onClick={handleClearFilter}
              >
                Clear
              </Typography>
            </Stack>
            {/* selected filter List */}
            <Stack mb={1} direction="row" flexWrap="wrap">
              {filterList.length === 0 ? (
                <Typography
                  color={theme.palette.grey[400]}
                  fontSize={smallFontSize}
                >
                  None
                </Typography>
              ) : (
                filterList.map((f) => (
                  <Typography
                    key={`selected-tag-${f.value}`}
                    className="tag selected"
                    // sx={{ cursor: "default !important" }}
                    onClick={() => {
                      handleDeleteEachFilter(f);
                    }}
                    mb="10px"
                  >
                    {f.value} &times;
                  </Typography>
                ))
              )}
            </Stack>
          </Box>
          <hr className="dashed" />
          <Typography
            fontSize={xsmallFontSize}
            color={theme.palette.grey[600]}
            sx={{ mt: 1 }}
          >
            Filters
          </Typography>
          <OnDemandFilter
            label="Year"
            filterList={yearList}
            selectedFilter={selectedYear}
            handleClick={handleAddTag}
          />
          <hr className="dashed" />
          <OnDemandFilter
            label="Region"
            filterList={regionList}
            selectedFilter={selectedRegion}
            handleClick={handleAddTag}
          />
          <hr className="dashed" />
          <OnDemandFilter
            label="Language"
            filterList={languageList}
            selectedFilter={selectedLanguage}
            handleClick={handleAddTag}
          />
        </Stack>
        {/* videos */}
        <Stack>
          <Typography
            fontSize={xsmallFontSize}
            color={theme.palette.grey[600]}
            textAlign="right"
            mb={1}
          >
            {filteredVideoList.length} results
          </Typography>
          <Stack
            className="video-result"
            flexDirection="row"
            flexWrap="wrap"
            maxHeight="865px"
            overflow="auto"
          >
            {filteredVideoList.map((v, idx) => (
              <ThumbnailCard
                key={`card-${v.id}`}
                video={v}
                getList={getOnDemandList}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </OnDemandContainer>
  );
};

export default OnDemand;
