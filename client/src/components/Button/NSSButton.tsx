/* eslint-disable react/require-default-props */
import { CircularProgress, Typography, useTheme } from "@mui/material";
import Loading from "components/Loading/Loading";
import React from "react";
import { mainFontSize } from "utils/FontSize";
import { NSSButtonContainer } from "./NSSButtonStyles";

interface NSSButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: JSX.Element | JSX.Element[] | string | string[];
  variant: "gradient" | "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  fontSize?: string;
  fontWeight?: number;
}
const NSSButton = (props: NSSButtonProps) => {
  const {
    children,
    variant,
    loading,
    disabled,
    fontSize,
    fontWeight,
    ...rest
  } = props;
  let className =
    rest.className !== undefined
      ? `${variant} ${rest.className}`
      : `${variant}`;
  className += disabled ? " disabled" : "";
  const theme = useTheme();
  return (
    <NSSButtonContainer type="button" {...rest} className={className}>
      {loading ? (
        <CircularProgress size="24px" />
      ) : (
        <Typography
          fontSize={fontSize || mainFontSize}
          fontWeight={fontWeight || theme.typography.fontWeightMedium}
        >
          {children}
        </Typography>
      )}
    </NSSButtonContainer>
  );
};
export default NSSButton;
