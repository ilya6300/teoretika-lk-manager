import React, { useLayoutEffect } from "react";
import { useParams } from "react-router";

export const ClientCard = () => {
  const { mast_id } = useParams();
  useLayoutEffect(() => {
    console.log(mast_id);
  }, []);
  return <div>ClientCard</div>;
};
