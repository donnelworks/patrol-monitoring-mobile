import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState, useEffect} from 'react';

const generateStyles = (width) => {
  const colWidth = 100 / 12;

  const xs = width > 0 && width < 418;
  const sm = width > 417 && width < 768;
  const md = width > 767 && width < 1024;
  const lg = width > 1023;

  return StyleSheet.create(
    xs
      ? {
          row: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -2.5,
            marginBottom: 5,
          },
          col_1: {
            width: colWidth * 1 + '%',
            paddingHorizontal: 2.5,
          },
          col_2: {
            width: colWidth * 2 + '%',
            paddingHorizontal: 2.5,
          },
          col_3: {
            width: colWidth * 3 + '%',
            paddingHorizontal: 2.5,
          },
          col_4: {
            width: colWidth * 4 + '%',
            paddingHorizontal: 2.5,
          },
          col_5: {
            width: colWidth * 5 + '%',
            paddingHorizontal: 2.5,
          },
          col_6: {
            width: colWidth * 6 + '%',
            paddingHorizontal: 2.5,
          },
          col_7: {
            width: colWidth * 7 + '%',
            paddingHorizontal: 2.5,
          },
          col_8: {
            width: colWidth * 8 + '%',
            paddingHorizontal: 2.5,
          },
          col_9: {
            width: colWidth * 9 + '%',
            paddingHorizontal: 2.5,
          },
          col_10: {
            width: colWidth * 10 + '%',
            paddingHorizontal: 2.5,
          },
          col_11: {
            width: colWidth * 11 + '%',
            paddingHorizontal: 2.5,
          },
          col_12: {
            width: colWidth * 12 + '%',
            paddingHorizontal: 2.5,
          },
        }
      : sm
      ? {
          row: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -3,
            marginBottom: 5,
          },
          col_sm_1: {
            width: colWidth * 1 + '%',
            paddingHorizontal: 3,
          },
          col_sm_2: {
            width: colWidth * 2 + '%',
            paddingHorizontal: 3,
          },
          col_sm_3: {
            width: colWidth * 3 + '%',
            paddingHorizontal: 3,
          },
          col_sm_4: {
            width: colWidth * 4 + '%',
            paddingHorizontal: 3,
          },
          col_sm_5: {
            width: colWidth * 5 + '%',
            paddingHorizontal: 3,
          },
          col_sm_6: {
            width: colWidth * 6 + '%',
            paddingHorizontal: 3,
          },
          col_sm_7: {
            width: colWidth * 7 + '%',
            paddingHorizontal: 3,
          },
          col_sm_8: {
            width: colWidth * 8 + '%',
            paddingHorizontal: 3,
          },
          col_sm_9: {
            width: colWidth * 9 + '%',
            paddingHorizontal: 3,
          },
          col_sm_10: {
            width: colWidth * 10 + '%',
            paddingHorizontal: 3,
          },
          col_sm_11: {
            width: colWidth * 11 + '%',
            paddingHorizontal: 3,
          },
          col_sm_12: {
            width: colWidth * 12 + '%',
            paddingHorizontal: 3,
          },
        }
      : md
      ? {
          row: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -3.5,
            marginBottom: 5,
          },
          col_md_1: {
            width: colWidth * 1 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_2: {
            width: colWidth * 2 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_3: {
            width: colWidth * 3 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_4: {
            width: colWidth * 4 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_5: {
            width: colWidth * 5 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_6: {
            width: colWidth * 6 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_7: {
            width: colWidth * 7 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_8: {
            width: colWidth * 8 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_9: {
            width: colWidth * 9 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_10: {
            width: colWidth * 10 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_11: {
            width: colWidth * 11 + '%',
            paddingHorizontal: 3.5,
          },
          col_md_12: {
            width: colWidth * 12 + '%',
            paddingHorizontal: 3.5,
          },
        }
      : {
          row: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -4,
            marginBottom: 5,
          },
          col_lg_1: {
            width: colWidth * 1 + '%',
            paddingHorizontal: 4,
          },
          col_lg_2: {
            width: colWidth * 2 + '%',
            paddingHorizontal: 4,
          },
          col_lg_3: {
            width: colWidth * 3 + '%',
            paddingHorizontal: 4,
          },
          col_lg_4: {
            width: colWidth * 4 + '%',
            paddingHorizontal: 4,
          },
          col_lg_5: {
            width: colWidth * 5 + '%',
            paddingHorizontal: 4,
          },
          col_lg_6: {
            width: colWidth * 6 + '%',
            paddingHorizontal: 4,
          },
          col_lg_7: {
            width: colWidth * 7 + '%',
            paddingHorizontal: 4,
          },
          col_lg_8: {
            width: colWidth * 8 + '%',
            paddingHorizontal: 4,
          },
          col_lg_9: {
            width: colWidth * 9 + '%',
            paddingHorizontal: 4,
          },
          col_lg_10: {
            width: colWidth * 10 + '%',
            paddingHorizontal: 4,
          },
          col_lg_11: {
            width: colWidth * 11 + '%',
            paddingHorizontal: 4,
          },
          col_lg_12: {
            width: colWidth * 12 + '%',
            paddingHorizontal: 4,
          },
        },
  );
};

const useGridStyles = () => {
  const windowDimensions = useWindowDimensions();
  const [gridStyles, setGridStyles] = useState(
    generateStyles(windowDimensions.width),
  );
  useEffect(() => {
    setGridStyles(generateStyles(windowDimensions.width));
  }, [windowDimensions]);

  return gridStyles;
};

const Row = ({children}) => {
  const gridStyles = useGridStyles();

  return <View style={gridStyles.row}>{children}</View>;
};

const Col = ({children, xs, sm, md, lg}) => {
  const columns_xs = "col_" + xs;
	const columns_sm = "col_sm_" + (sm || xs);
	const columns_md = "col_md_" + (md || sm || xs);
	const columns_lg = "col_lg_" + (lg || md || sm || xs);

  const gridStyles = useGridStyles();

  return (
    <View
			style={[
				gridStyles[columns_xs],
				gridStyles[columns_sm],
				gridStyles[columns_md],
				gridStyles[columns_lg],
			]}>
			{children}
		</View>
  );
};

export {Row, Col};
