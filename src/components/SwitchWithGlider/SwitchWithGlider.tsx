import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useDarkModeManager } from 'state/user/hooks';

const useStyles = makeStyles(({ palette }) => ({
  container: {
    display: 'flex',
    border: palette.background.paper,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  glider: {
    transition: 'all 0.4s ease-out',
    position: 'absolute',
    borderRadius: '10px',
    backgroundColor: palette.primary.dark,
  },
  elementFront: {
    transition: 'border 0.4s ease-in-out',
    boxSizing: 'border-box',
    position: 'absolute',
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    borderRadius: '10px',
    cursor: 'pointer',
    '&:hover': {
      border: `1px solid ${palette.divider}`,
    },
    '&:active': {
      borderRadius: '10px',
    },
  },
}));

export interface GliderDimentions {
  width: String;
  height: String;
}

export interface SwitchWithGliderProps {
  elements: Array<React.FC>;
  positions: Array<Number>;
  clickFuncs: Array<() => void>;
  start: Number;
  gliderHeight: Number;
  gliderWidth: Number;
  alignedRight?: boolean;
}

const SwitchWithGlider: React.FC<SwitchWithGliderProps> = ({
  elements,
  positions,
  clickFuncs,
  start,
  gliderHeight,
  gliderWidth,
  alignedRight,
}) => {
  const classes = useStyles();
  const [gliderPosition, setGliderPosition] = React.useState<any>(start);
  const theme = useTheme();
  const [dark] = useDarkModeManager();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    if (mobile && dark) {
      setGliderPosition(window.innerWidth - 183);
    }
  }, [mobile, dark]);

  const mappedClickFuncs = [
    () => {
      console.log('positions[0]', positions[0]);
      setGliderPosition(positions[0]);
      clickFuncs[0]();
    },
    () => {
      console.log('positions[1]', positions[1]);
      setGliderPosition(positions[1]);
      clickFuncs[1]();
    },
    () => {
      console.log('positions[2]', positions[2]);
      setGliderPosition(positions[2]);
      clickFuncs[2]();
    },
  ];

  const mappedElements = elements.map((item, index) => (
    <Box>
      <Box
        className={classes.elementFront}
        width={gliderWidth}
        height={gliderHeight}
        onClick={mappedClickFuncs[index]}
      />
      <Box>{item}</Box>
    </Box>
  ));

  return (
    <Box className={classes.container}>
      {mappedElements}
      {!alignedRight ? (
        <Box
          className={classes.glider}
          left={gliderPosition}
          width={gliderWidth}
          height={gliderHeight}
        />
      ) : (
        <Box
          className={classes.glider}
          right={gliderPosition}
          width={gliderWidth}
          height={gliderHeight}
        />
      )}
    </Box>
  );
};

export default SwitchWithGlider;