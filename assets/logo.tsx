import * as React from "react";
import Svg, { Circle, Path, G } from "react-native-svg";

export default function Logo() {
  return (
    <Svg width={200} height={200} viewBox="0 0 200 200">
      <Circle cx={100} cy={100} r={90} fill="#2f95dc" />
      <G fill="#fff">
        <Path d="M100 50c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 90c-22.091 0-40-17.909-40-40s17.909-40 40-40 40 17.909 40 40-17.909 40-40 40z" />
        <Path d="M100 70c-16.569 0-30 13.431-30 30 0 16.569 13.431 30 30 30 16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30zm0 50c-11.046 0-20-8.954-20-20s8.954-20 20-20 20 8.954 20 20-8.954 20-20 20z" />
        <Path d="M100 90c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z" />
      </G>
    </Svg>
  );
} 