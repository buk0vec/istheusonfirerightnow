/*
  index.tsx
  The main page.
*/

import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { ESRIMapProps } from "../components/ESRIMap";
import path from "path";
import { pullToFile } from "../util/pull-to-file";
import { Flex, Heading, Box, Text } from "@chakra-ui/react";
import { BoxProps, FlexProps } from "@chakra-ui/layout";
import Head from "next/head"

//Used to turn SSR off for the ESRIMap. Don't know if it's needed lol
const WebMapWithNoSSR = dynamic(() => import("../components/ESRIMap"), {
  ssr: false,
});

// Hold refresh time
interface IndexProps extends ESRIMapProps {
  date: number;
}

const IndexFlexProps: FlexProps = {
  flexDir: "row",
  overflow: "hidden",
  outline: "20px dashed blue",
  wrap: "nowrap",
  justifyContent: "space-evenly",
  alignItems: "stretch",
  minHeight: "100%",
  h: "100vh",
  width: "100%",
  padding: "0",
  margin: "0",
};

const LeftSectionProps: FlexProps = {
  w: "40%",
  backgroundColor: "white",
  height: "100%",
  alignItems: "center",
  wrap: "nowrap",
  padding: "0",
  margin: "0",
  flexDir: "column",
  justifyContent: "center",
};

const RightSectionProps: FlexProps = {
  w: "60%",
  height: "100%",
  backgroundColor: "#020202",
  alignItems: "center",
  flexDir: "column",
  wrap: "nowrap",
  padding: "0",
  margin: "0",
  justifyContent: "center",
  outline: "3px dashed green",
};

const VerticalCenterProps: FlexProps = {
  direction: "row",
  alignItems: "center",
  outline: "3px dashed green",
};

const VFlex = (props: FlexProps) => (
  <Flex {...VerticalCenterProps} flex={props.flex}>
    {props.children}
  </Flex>
);

// The page. Pretty simple right now.
const Index: NextPage<IndexProps> = ({ date }) => {
  return (
    <Flex {...IndexFlexProps}>
        <Flex {...LeftSectionProps}>
          <Heading color="black" fontSize="9xl" letterSpacing="tight" textAlign="center" fontFamily='Secular One'> Yes, it is. 🔥️‍🔥️‍🔥</Heading>
        </Flex>
        <Flex {...RightSectionProps}>
          <Box width="95%" height="60%" outline="3px dotted orange">
            <WebMapWithNoSSR />
            <Text color="white">Last updated at {new Date(date).toString()}</Text>
          </Box>
        </Flex>
    </Flex>
  );
};

// Get static Map data downloaded only on build
export const getStaticProps: GetStaticProps = async () => {
  // Get time of update
  const date = Date.now();
  // Pull map data to public folders (can't pass this data thru gSP due to size)
  await Promise.all([
    pullToFile(
      "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?where=1%3D1&outFields=IncidentName,OBJECTID&outSR=4326&f=json",
      path.join(process.cwd(), "public/firepoints.json")
    ),
    pullToFile(
      "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Perimeters/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID&outSR=4326&f=json",
      path.join(process.cwd(), "public/fireareas.json")
    ),
  ]);
  // Return update time
  return {
    props: {
      date,
    },
    revalidate: 60 * 60 * 6, // Refresh data every 6 hours
  };
};

export default Index;