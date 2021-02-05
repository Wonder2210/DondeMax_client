import { Skeleton, Stack } from "@chakra-ui/core";
import React from "react";

const SkeletonLoader = () => {
  return (
    <Stack spacing={3} width="100%" paddingX="2em" marginTop="4em">
      <Skeleton marginBottom="1em" width="20%" height="25px" />
      <Skeleton height="25px" />
      <Skeleton height="25px" />
      <Skeleton height="25px" />
      <Skeleton height="25px" />
      <Skeleton height="25px" />
    </Stack>
  );
};

export default SkeletonLoader;
