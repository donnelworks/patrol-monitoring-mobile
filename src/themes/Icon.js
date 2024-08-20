import React from 'react';
import Svg, { G, Path } from "react-native-svg";

// Icon Library URL = https://www.streamlinehq.com/icons/core-duo-free

export const Location = ({strokeColor = '#aaa', fillColor = 'none', size = 14, onPress}) => (
    <Svg 
        onPress={onPress}
        fill="none"
        viewBox="0 0 14 14"
        height={size}
        width={size}>
          <G strokeWidth={1}>
            <Path
              fill={fillColor}
              d="M.519 6.713c0 3.25 3.5 6.75 4.75 6.75s4.75-3.5 4.75-6.75a4.75 4.75 0 10-9.5 0z"
            />
            <Path
              fill="#fff"
              d="M3.519 6.713a1.75 1.75 0 103.5 0 1.75 1.75 0 10-3.5 0"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.519 6.713a1.75 1.75 0 103.5 0 1.75 1.75 0 10-3.5 0"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.629 8.707c-.948 2.541-3.366 4.756-4.36 4.756-1.25 0-4.75-3.5-4.75-6.75a4.75 4.75 0 015.19-4.73"
            />
            <Path
              fill="#fff"
              d="M7.696 3.803c-.334-.058-.334-.537 0-.595a3.02 3.02 0 002.433-2.33l.02-.092c.072-.33.542-.332.617-.003l.024.107a3.036 3.036 0 002.44 2.316c.335.058.335.54 0 .598a3.036 3.036 0 00-2.44 2.316l-.024.107c-.075.33-.545.327-.617-.003l-.02-.092a3.02 3.02 0 00-2.433-2.33z"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.696 3.803c-.334-.058-.334-.537 0-.595a3.02 3.02 0 002.433-2.33l.02-.092c.072-.33.542-.332.617-.003l.024.107a3.036 3.036 0 002.44 2.316c.335.058.335.54 0 .598a3.036 3.036 0 00-2.44 2.316l-.024.107c-.075.33-.545.327-.617-.003l-.02-.092a3.02 3.02 0 00-2.433-2.33z"
            />
          </G>
    </Svg>
);

export const Square = ({strokeColor = '#aaa', fillColor = 'none', size = 14, onPress}) => (
    <Svg 
        onPress={onPress}
        fill="none"
        viewBox="0 0 14 14"
        height={size}
        width={size}>
          <G strokeWidth={1}>
            <Path
              fill={fillColor}
              d="M10.5.5h-7a3 3 0 00-3 3v7a3 3 0 003 3h7a3 3 0 003-3v-7a3 3 0 00-3-3z"
              display="inline"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5.5h-7a3 3 0 00-3 3v7a3 3 0 003 3h7a3 3 0 003-3v-7a3 3 0 00-3-3z"
              display="inline"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.917 4.75l-4 5-2-1.5"
              display="none"
            />
          </G>
    </Svg>
);

export const MinSquare = ({strokeColor = '#aaa', fillColor = 'none', size = 14, onPress}) => (
    <Svg 
        onPress={onPress}
        fill="none"
        viewBox="0 0 14 14"
        height={size}
        width={size}>
          <G strokeWidth={1}>
            <Path
              fill={fillColor}
              d="M10.5.5h-7a3 3 0 00-3 3v7a3 3 0 003 3h7a3 3 0 003-3v-7a3 3 0 00-3-3z"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5.5h-7a3 3 0 00-3 3v7a3 3 0 003 3h7a3 3 0 003-3v-7a3 3 0 00-3-3zM4 7h6"
            />
          </G>
    </Svg>
);

export const CheckSquare = ({strokeColor = '#aaa', fillColor = 'none', size = 14, onPress}) => (
    <Svg 
        onPress={onPress}
        fill="none"
        viewBox="0 0 14 14"
        height={size}
        width={size}>
          <G strokeWidth={1}>
            <Path
              fill={fillColor}
              d="M10.5.5h-7a3 3 0 00-3 3v7a3 3 0 003 3h7a3 3 0 003-3v-7a3 3 0 00-3-3z"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5.5h-7a3 3 0 00-3 3v7a3 3 0 003 3h7a3 3 0 003-3v-7a3 3 0 00-3-3z"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.917 4.75l-4 5-2-1.5"
            />
          </G>
    </Svg>
);

export const Circle = ({strokeColor = '#aaa', fillColor = 'none', size = 14, onPress}) => (
    <Svg 
        onPress={onPress}
        fill="none"
        viewBox="0 0 14 14"
        height={size}
        width={size}>
          <G strokeWidth={1}>
            <Path fill={fillColor} d="M7 13.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 13.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"
            />
          </G>
    </Svg>
);

export const VisibleEye = ({strokeColor = '#aaa', fillColor = 'none', size = 14, onPress}) => (
    <Svg 
        onPress={onPress}
        fill="none"
        viewBox="0 0 14 14"
        height={size}
        width={size}>
          <G strokeWidth={1}>
            <Path
              fill={fillColor}
              fillRule="evenodd"
              d="M13.488 7a1.21 1.21 0 00-.258-.754C12.18 4.975 9.79 2.5 7 2.5 4.21 2.5 1.82 4.975.77 6.246A1.208 1.208 0 00.512 7c0 .279.092.547.258.754C1.82 9.025 4.21 11.5 7 11.5c2.79 0 5.18-2.475 6.23-3.746.166-.207.258-.475.258-.754zM9 7a2 2 0 11-4 0 2 2 0 014 0z"
              clipRule="evenodd"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.23 6.246c.166.207.258.476.258.754 0 .279-.092.547-.258.754C12.18 9.025 9.79 11.5 7 11.5c-2.79 0-5.18-2.475-6.23-3.746A1.208 1.208 0 01.512 7c0-.278.092-.547.258-.754C1.82 4.975 4.21 2.5 7 2.5c2.79 0 5.18 2.475 6.23 3.746z"
            />
            <Path fill="#fff" d="M7 9a2 2 0 100-4 2 2 0 000 4z" />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 9a2 2 0 100-4 2 2 0 000 4z"
            />
          </G>
    </Svg>
);

export const InvisibleEye = ({strokeColor = '#aaa', fillColor = 'none', size = 14, onPress}) => (
    <Svg 
        onPress={onPress}
        fill="none"
        viewBox="0 0 14 14"
        height={size}
        width={size}>
          <G strokeWidth={1}>
            <Path
              fill={fillColor}
              fillRule="evenodd"
              d="M13.488 7c0-.278-.092-.547-.258-.754C12.18 4.975 9.79 2.5 7 2.5 4.21 2.5 1.82 4.975.77 6.246.604 6.453.512 6.722.512 7s.092.547.258.754C1.82 9.025 4.21 11.5 7 11.5s5.18-2.475 6.23-3.746c.166-.207.258-.475.258-.754zM7 5a2 2 0 011.414 3.414L5.586 5.586A1.994 1.994 0 017 5z"
              clipRule="evenodd"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.63 3.624C4.621 2.98 5.771 2.5 7 2.5c2.79 0 5.18 2.475 6.23 3.746.166.207.258.476.258.754s-.092.547-.258.754c-.579.7-1.565 1.767-2.8 2.583m-1.93.933c-.482.146-.984.23-1.5.23-2.79 0-5.18-2.475-6.23-3.746C.604 7.547.512 7.279.512 7s.092-.547.258-.754c.333-.402.8-.926 1.372-1.454"
            />
            <Path fill="#fff" d="M7 9a2 2 0 100-4 2 2 0 000 4z" />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.414 8.414a2 2 0 00-2.828-2.828M13.5 13.5L.5.5"
            />
          </G>
    </Svg>
);

export const Envelope = ({strokeColor = '#aaa', fillColor = 'none', size = 14, onPress}) => (
    <Svg 
        onPress={onPress}
        fill="none"
        viewBox="0 0 14 14"
        height={size}
        width={size}>
          <G strokeWidth={1}>
            <Path
              fill={fillColor}
              d="M12.5 1.75h-11a1 1 0 00-1 1v8.5a1 1 0 001 1h11a1 1 0 001-1v-8.5a1 1 0 00-1-1z"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.5 1.75h-11a1 1 0 00-1 1v8.5a1 1 0 001 1h11a1 1 0 001-1v-8.5a1 1 0 00-1-1z"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M.5 3l5.86 5a1 1 0 001.28 0l5.86-5"
            />
          </G>
    </Svg>
);

export const Lock = ({strokeColor = '#aaa', fillColor = 'none', size = 14, onPress}) => (
    <Svg 
        onPress={onPress}
        fill="none"
        viewBox="0 0 14 14"
        height={size}
        width={size}>
          <G strokeWidth={1}>
            <Path
              fill={fillColor}
              d="M11 5.5H3a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1v-6a1 1 0 00-1-1z"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5.5H3a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1v-6a1 1 0 00-1-1zM10.5 5.5V4a3.5 3.5 0 10-7 0v1.5"
            />
            <Path
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 10a.5.5 0 100-1 .5.5 0 000 1z"
            />
          </G>
    </Svg>
);

