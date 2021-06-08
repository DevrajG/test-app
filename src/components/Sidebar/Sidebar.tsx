import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';

import { useDarkModeManager } from 'state/user/hooks';

import SidebarItem from './SidebarItem';
import MainLogo from 'assets/svg/MainLogo.svg';
import MainLogoBlack from 'assets/svg/MainLogoBlack.svg';
import { ReactComponent as DocumentationIcon } from 'assets/svg/DocumentationIcon.svg';
import { ReactComponent as CareerIcon } from 'assets/svg/CareerIcon.svg';
import { ReactComponent as PositionsIcon } from 'assets/svg/PositionsIcon.svg';
import { ReactComponent as VaultsIcon } from 'assets/svg/VaultIcon.svg';
import { ReactComponent as OptionsIcon } from 'assets/svg/OptionsIcon.svg';
import { ReactComponent as StakeIcon } from 'assets/svg/StakeIcon.svg';
import { ReactComponent as SwapIcon } from 'assets/svg/SwapIcon.svg';

import { SwitchWithGlider, ThemeSwitch, SwapModal } from 'components';

const insights = [
  {
    title: 'Documentation',
    link: 'https://premia.medium.com',
    Icon: <DocumentationIcon />,
    href: true,
  },
  {
    title: 'Careers',
    link: 'https://solidity.finance/audits/Premia/',
    Icon: <CareerIcon />,
    href: true,
  },
];

const useStyles = makeStyles(({ palette }) => ({
  rightBorder: {
    borderRight: `1px solid ${palette.divider}`,
  },

  subtitle: {
    marginBottom: 8,
    marginLeft: '1rem',
    fontSize: 10,
    color: palette.text.secondary,
  },

  light: {
    background: palette.background.paper,
  },

  switchContainer: {
    marginTop: '18px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: palette.background.paper,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '180px',
    height: '251px',
  },
  switchContainerMobile: {
    display: 'flex',
    marginBottom: '4px',
    flexDirection: 'column',
    backgroundColor: palette.background.paper,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    height: '251px',
  },
}));

export interface SidebarProps {
  mobile?: boolean;
  onHide?: () => void;
}

interface PageIndexing {
  [key: string]: number;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile, onHide }) => {
  const [darkMode] = useDarkModeManager();
  const classes = useStyles();
  const location = useLocation<{ previous: string }>();
  const { pathname } = location;
  const pageIndexes: PageIndexing = {
    '/positions': 0,
    '/vaults': 1,
    '/options': 2,
    '/stake': 3,
  };
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [deviceWidth, setDeviceWidth] = React.useState(window.innerWidth);
  const state = location.state ? location.state.previous : false;
  const startIndex = state ? pageIndexes[state] : pageIndexes[pathname] || 0;
  const [pageNavigationIndex, setPageNavigationIndex] =
    React.useState(startIndex);

  React.useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const currentPage = pageIndexes[pathname];
    setPageNavigationIndex(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navigation = [
    {
      title: 'My positions',
      link: '/positions',
      Icon: <PositionsIcon />,
    },
    {
      title: 'Vaults',
      link: '/vaults',
      Icon: <VaultsIcon />,
    },
    {
      title: 'Options',
      link: '/options',
      Icon: <OptionsIcon />,
    },
    {
      title: 'Stake',
      link: '/stake',
      Icon: <StakeIcon />,
    },
    {
      title: 'Swap',
      onClick: () => setShowSwapModal(true),
      Icon: <SwapIcon />,
    },
  ];

  const navigationItems = navigation.map(
    ({ title, link, Icon, onClick }, i) => (
      <SidebarItem
        key={i}
        title={title}
        link={link}
        Icon={Icon}
        onHide={onHide}
        onClick={onClick}
        activeCondition={!onClick ? link === pathname : showSwapModal}
      />
    ),
  );

  return (
    <Box
      clone
      width={1}
      px={{ sm: 0, md: '15px' }}
      pt={{ sm: 3, md: '30px' }}
      pb={{ sm: 1, md: '15px' }}
      position='relative'
      height={mobile ? 'auto' : '100vh'}
      className={cx({
        [classes.rightBorder]: !mobile,
        [classes.light]: !darkMode,
      })}
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        style={{ overflowY: 'auto' }}
      >
        <SwapModal
          open={showSwapModal}
          onClose={() => setShowSwapModal(false)}
        />
        <Box>
          {!mobile && (
            <Grid container component={Link} to='/'>
              <Box pb={3}>
                <img
                  src={darkMode ? MainLogo : MainLogoBlack}
                  alt='Logo'
                  style={{ marginLeft: '15px' }}
                />
              </Box>
            </Grid>
          )}
          <Box
            className={
              !mobile ? classes.switchContainer : classes.switchContainerMobile
            }
          >
            {!mobile ? (
              <SwitchWithGlider
                elements={[...navigationItems]}
                defaultIndex={pageNavigationIndex}
                marginBetweenSwitches={4}
                gliderWidth={180}
                gliderHeight={47}
                verticalGlider
              />
            ) : (
              <SwitchWithGlider
                elements={navigationItems}
                defaultIndex={pageNavigationIndex}
                marginBetweenSwitches={4}
                gliderWidth={deviceWidth - 20}
                gliderHeight={47}
                verticalGlider
              />
            )}
          </Box>
        </Box>

        <Box>
          <Box mb={mobile ? 0 : 2}>
            {insights.map(({ href, title, link, Icon }, i) => (
              <SidebarItem
                key={i}
                href={href}
                title={title}
                link={link}
                Icon={Icon}
              />
            ))}
          </Box>
          {!mobile && <ThemeSwitch />}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
