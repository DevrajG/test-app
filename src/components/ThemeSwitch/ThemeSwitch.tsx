import React from 'react';
import { ReactComponent as DayIcon } from 'assets/svg/DayIcon.svg';
import { ReactComponent as NightIcon } from 'assets/svg/NightIcon.svg';
import { Typography, Box, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useWeb3 } from 'state/application/hooks';
import { useDarkModeManager } from 'state/user/hooks';
import { useDeviceWidth } from 'hooks';

import { SwitchWithGlider } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  activeMode: {
    borderRadius: 10,
    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: palette.primary.main,
    },
    '& .MuiTypography-root': {
      fontWeight: 700,
      fontSize: '14px',
      color: palette.primary.main,
    },
  },
  inactiveMode: {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: palette.secondary.main,
    },
    '& .MuiTypography-root': {
      fontWeight: 400,
      fontSize: '14px',
      color: palette.secondary.main,
    },
    '&:hover': {
      '& svg path': {
        fill: palette.text.primary,
      },
      '& .MuiTypography-root': {
        fontWeight: 400,
        fontSize: '14px',
        color: palette.text.primary,
      },
    },
  },
}));

const ThemeSwitch: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkModeManager();
  const { onboard } = useWeb3();
  const classes = useStyles();
  const theme = useTheme();
  const deviceWidth = useDeviceWidth();
  const { palette } = theme;
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDayClick = () => {
    setTimeout(() => {
      setDarkMode(false);
      onboard?.config({
        darkMode: false,
      });
    }, 0);
  };

  const handleNightClick = () => {
    setTimeout(() => {
      setDarkMode(true);
      onboard?.config({
        darkMode: true,
      });
    }, 0);
  };

  const DayButton = () => (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      className={!darkMode ? classes.activeMode : classes.inactiveMode}
      width={!mobile ? '80px' : deviceWidth / 2 - 16}
      height={!mobile ? '30px' : '36px'}
      onClick={handleDayClick}
    >
      <DayIcon />
      <Typography>Day</Typography>
    </Box>
  );

  const NightButton = () => (
    <Box
      display='flex'
      width={!mobile ? '80px' : deviceWidth / 2 - 16}
      height={!mobile ? '30px' : '36px'}
      alignItems='center'
      justifyContent='center'
      className={darkMode ? classes.activeMode : classes.inactiveMode}
      onClick={handleNightClick}
    >
      <NightIcon />
      <Typography>Night</Typography>
    </Box>
  );

  return (
    <Box
      display='flex'
      padding={!mobile ? '0 6px' : '0'}
      justifyContent='space-between'
      style={{ backgroundColor: palette.background.paper }}
    >
      {!mobile ? (
        <SwitchWithGlider
          elements={[DayButton, NightButton]}
          defaultIndex={!darkMode ? 0 : 1}
          marginBetweenSwitches={7}
          gliderWidth={80}
          gliderHeight={30}
        />
      ) : (
        <SwitchWithGlider
          elements={[DayButton, NightButton]}
          defaultIndex={!darkMode ? 0 : 1}
          gliderWidth={deviceWidth / 2 - 16}
          marginBetweenSwitches={8}
          gliderHeight={36}
        />
      )}
    </Box>
  );
};

export default ThemeSwitch;
