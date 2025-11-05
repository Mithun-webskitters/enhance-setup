"use client";
import { useQuery } from "@apollo/client/react";
import React from "react";
import { GET_USER } from "../graphql/queries";

function ApiGraphQl() {
  const { data } = useQuery(GET_USER);
  console.log(data);
  return (
    <div>
      <h1>ldfkgjsdlk</h1>
    </div>
  );
}

export default ApiGraphQl;
