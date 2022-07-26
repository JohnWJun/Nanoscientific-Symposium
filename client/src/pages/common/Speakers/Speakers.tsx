import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import { globalData } from "utils/GlobalData";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import LandingSection from "components/Section/LandingSection";
import ComingSoon from "components/ComingSoon/ComingSoon";
import useMenuStore from "store/MenuStore";
import { useAuthState } from "context/AuthContext";
import { editorRole } from "utils/Roles";
import { SpeakersContainer } from "./SpeakersStyles";

const Speakers = () => {
  const { currentMenu } = useMenuStore();
  const authState = useAuthState();
  const [speakersState, setSpeakersState] = useState<Speaker.speakerType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePageViews();

  // console.log(`hi`);

  useEffect(() => {
    const config = {
      params: {
        nation: pathname,
      },
    };
    const getSpeakers = async () => {
      setLoading(true);
      const speakers = await axios.get(`/api/page/common/speakers`, config);
      console.log(`nation: ${speakers}`);
      setSpeakersState(speakers.data);
      console.log(setSpeakersState);
      setLoading(false);
    };
    getSpeakers();
  }, []);

  const { speakerBannerURL } = globalData.get(
    "common",
  ) as Common.globalDataType;
  const nationData = globalData.get(pathname) as Common.globalDataType;

  if (loading) {
    return <Loading />;
  }

  return (
    <SpeakersContainer className="body-fit">
      <Box sx={{ flexGrow: 1 }} className="layout">
        {((currentMenu &&
          currentMenu.is_published === 0 &&
          !editorRole.includes(authState.role)) ||
          speakersState.length === 0) && <ComingSoon />}
        {((currentMenu && currentMenu.is_published === 1) ||
          editorRole.includes(authState.role)) && (
          <Grid
            container
            spacing={{ xs: 4, md: 7 }}
            columns={{ xs: 1, sm: 8, md: 16 }}
          >
            {speakersState.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </Grid>
        )}
      </Box>
    </SpeakersContainer>
  );
};

export default Speakers;
