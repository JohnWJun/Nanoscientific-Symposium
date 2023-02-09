/* eslint-disable react/require-default-props */
import React, { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "components/CommonModal/CommonModal";
import { Input, Slider, Stack, TextField, Typography } from "@mui/material";
import useInput from "hooks/useInput";
import S3Upload from "components/S3Upload/S3Upload";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import useCurrentYear from "hooks/useCurrentYear";
import { useNavigate } from "react-router";
import useAdminStore from "store/AdminStore";

interface WebinarFormProps extends React.ComponentPropsWithoutRef<"div"> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const WebinarForm = ({ open, setOpen, ...rest }: WebinarFormProps) => {
  const webinarId = useInput("");
  const navigate = useNavigate();
  const pathname = usePageViews();
  const currentYear = useCurrentYear();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [checkLoading, setCheckLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await axios.post(
        `/api/zoom/webinar?nation=${pathname}&year=${currentYear}`,
        {
          webinarId: webinarId.value,
        },
      );
      setOpen(false);
      navigate(0);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCheck = async () => {
    try {
      setCheckLoading(true);
      const res = await axios.get(
        `/api/zoom/webinar/${webinarId.value}?nation=${pathname}&year=${currentYear}`,
      );
      alert("The webinar has successfully checked. Press 'Apply'");
      setIsChecked(true);
    } catch (err) {
      console.log(err);
      alert("The webinar is not exist.");
      setIsChecked(false);
    } finally {
      setCheckLoading(false);
    }
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      submitText="Apply"
      onSubmit={handleSubmit}
      submitDisabled={!isChecked}
      loading={submitLoading}
      title="Add a webinar"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label="Webinar ID"
          margin="dense"
          variant="filled"
          required
          size="small"
          type="number"
          {...webinarId}
        />
        <LoadingButton
          loading={checkLoading}
          onClick={handleCheck}
          variant="contained"
        >
          Check
        </LoadingButton>
      </Stack>
    </CommonModal>
  );
};

export default WebinarForm;
