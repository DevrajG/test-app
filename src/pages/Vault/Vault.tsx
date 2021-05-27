import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { LineChart, RadialChart, SearchTabs, TooltipPan } from 'components';
import { Help, ExpandMore } from '@material-ui/icons';
import { ReactComponent as BasicIcon } from 'assets/svg/BasicIcon.svg';
import { ReactComponent as ProIcon } from 'assets/svg/ProIcon.svg';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as CallUpIcon } from 'assets/svg/CallUpIcon.svg';
import { ReactComponent as PoolDownIcon } from 'assets/svg/PoolDownIcon.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';
import { ReactComponent as WBTCIcon } from 'assets/svg/wBTCIcon.svg';
import { ReactComponent as ETHIcon } from 'assets/svg/EthIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { useIsDarkMode } from 'state/user/hooks';
import BasicVault from './BasicVault';

import { PageWithSidebar } from 'layouts';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '27.5px',
    marginBottom: 36,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  topTab: {
    marginBottom: 20,

    [theme.breakpoints.down('md')]: {
      marginTop: 20,
    },
  },
  mainContent: {},
  subtitle: {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      width: 18,
      height: 18,

      '& path': {
        fill: (props: any) => (props.dark ? 'white' : 'black'),
      },
    },
  },
  header: {
    display: 'flex',
    marginBottom: 20,
    alignItems: 'center',

    '& h1': {
      marginRight: 8,
    },

    '& svg': {
      marginRight: 8,
    },
  },
  topSector: {
    padding: 28,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  bottomSector: {
    padding: '28px 28px 0 28px',

    '& h1': {
      fontWeight: 'bold',
    },
  },
  content: {
    display: 'flex',
  },
  rightPanel: {
    display: 'flex',
    width: 'calc(100% - 200px)',

    '& svg': {
      position: 'relative',
      top: -2,
      width: 20,
      height: 20,
    },

    '& > div > h2': {
      fontWeight: 'bold',
      lineHeight: '18px',
      fontSize: 16,
      marginBottom: 8,
    },

    '& h2': {
      lineHeight: '24px',
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  box: {
    width: 'calc(100% - 286px)',
    position: 'relative',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& svg': {
      marginRight: 8,
      width: 16,
      height: 16,
    },
  },
  col: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 22,
  },
  elementHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
  },
  readMore: {
    color: theme.palette.primary.main,
    fontSize: 14,
    lineHeight: '18px',
    marginTop: 6,
  },
}));

const tabItems = [
  {
    image: WBTCIcon,
    label: 'wBTC',
  },
  {
    image: UniswapIcon,
    label: 'Uni',
    highlight: true,
  },
  {
    image: LinkIcon,
    label: 'Link',
  },
  {
    image: YFIIcon,
    label: 'YFI',
    highlight: true,
  },
  {
    image: ETHIcon,
    label: 'ETH',
  },
];

const ProVault: React.FC = () => {
  const dark = useIsDarkMode();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles({ dark });
  const theme = useTheme();
  const [value, setValue] = useState(
    new URLSearchParams(location.search).get('tab') === 'pro' ? 1 : 0,
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [coin, setCoin] = useState<any>(null);
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const handeLeave = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const coin = event.target.value;
    setCoin(coin);
  };

  return (
    <PageWithSidebar>
      <Grid container direction='column'>
        <Box width={1}>
          <Typography
            component='h1'
            variant='h3'
            color='textPrimary'
            className={classes.title}
          >
            Vaults
          </Typography>
          <Grid container direction='row' className={classes.topTab}>
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                history.push({
                  pathname: '/vaults',
                  search: `?tab=${newValue === 0 ? 'basic' : 'pro'}`,
                });
              }}
              showLabels={true}
              style={{
                marginRight: mobile ? '0' : '16px',
                width: mobile ? '100%' : '',
              }}
            >
              <BottomNavigationAction label='Basic' icon={<BasicIcon />} />
              <BottomNavigationAction label='Pro' icon={<ProIcon />} />
            </BottomNavigation>
            {!mobile && value === 1 && (
              <Box component='div' className={classes.box}>
                <SearchTabs
                  items={tabItems}
                  value={tabIndex}
                  onChange={(ev, index) => {
                    setTabIndex(index);
                  }}
                />
              </Box>
            )}
            {mobile && value === 1 && (
              <>
                <Box className={classes.col}>
                  <Box
                    display='flex'
                    style={{
                      margin: '0 8px 2px',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography
                      component='p'
                      color='textPrimary'
                      className={classes.elementHeader}
                    >
                      Pool
                    </Typography>
                  </Box>
                </Box>
                <Box width='100%' height='46px'>
                  <FormControl variant='outlined' fullWidth>
                    <Select
                      IconComponent={() => {
                        return <ExpandMore />;
                      }}
                      value={coin}
                      onChange={handleChange}
                      inputProps={{
                        name: 'age',
                      }}
                    >
                      <MenuItem className={classes.menuItem} value='wBTC'>
                        <WBTCIcon />
                        <Typography component='span' color='textSecondary'>
                          Uni
                        </Typography>
                      </MenuItem>
                      <MenuItem className={classes.menuItem} value='Uni'>
                        <UniswapIcon />
                        <Typography component='span' color='textSecondary'>
                          Uni
                        </Typography>
                      </MenuItem>
                      <MenuItem className={classes.menuItem} value='Link'>
                        <LinkIcon />
                        <Typography component='span' color='textSecondary'>
                          Link
                        </Typography>
                      </MenuItem>
                      <MenuItem className={classes.menuItem} value='YFI'>
                        <YFIIcon />
                        <Typography component='span' color='textSecondary'>
                          YFI
                        </Typography>
                      </MenuItem>
                      <MenuItem className={classes.menuItem} value='ETH'>
                        <ETHIcon />
                        <Typography component='span' color='textSecondary'>
                          Eth
                        </Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </>
            )}
          </Grid>
          {value === 0 && <BasicVault />}
          {value === 1 && (
            <Grid container direction='row' spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <Paper>
                  <Box component='div' className={classes.topSector}>
                    <Box component='div' className={classes.header}>
                      <CallUpIcon />
                      <Typography
                        variant='h6'
                        component='h1'
                        color='textPrimary'
                      >
                        Call Pool
                      </Typography>
                      <Typography
                        variant='body1'
                        component='h2'
                        color='textSecondary'
                      >
                        78% Utilization
                      </Typography>
                    </Box>
                    <Grid
                      container
                      direction={!mobile ? 'row' : 'column'}
                      alignItems={!mobile ? 'flex-start' : 'center'}
                    >
                      <RadialChart
                        color='#5294FF'
                        secondaryColor='#1EFF78'
                        width={200}
                        height={200}
                        data={[67]}
                      >
                        <UniswapIcon />
                        Pool size in Uni
                        <Typography
                          component='h5'
                          variant='body2'
                          color='textSecondary'
                        >
                          211305
                        </Typography>
                      </RadialChart>
                      <Grid
                        item
                        direction='column'
                        justify='space-between'
                        className={classes.rightPanel}
                      >
                        <Grid container direction='column'>
                          <Typography
                            variant='body2'
                            component='h2'
                            color='textPrimary'
                          >
                            My P&L
                          </Typography>
                          <Grid container direction='row'>
                            <Grid container xs={6} alignItems='center'>
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textSecondary'
                              >
                                My total capital
                              </Typography>
                            </Grid>
                            <Grid
                              container
                              xs={6}
                              direction='row'
                              justify='flex-end'
                              alignItems='center'
                            >
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textPrimary'
                              >
                                10000
                              </Typography>
                              <UniswapIcon />
                            </Grid>
                          </Grid>
                          <Grid container direction='row'>
                            <Grid container xs={6} alignItems='center'>
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textSecondary'
                              >
                                Fees earned
                              </Typography>
                            </Grid>
                            <Grid
                              container
                              xs={6}
                              direction='row'
                              justify='flex-end'
                              alignItems='center'
                            >
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textPrimary'
                              >
                                100
                              </Typography>
                              <DaiIcon />
                            </Grid>
                          </Grid>
                          <Grid container direction='row'>
                            <Grid container xs={6} alignItems='center'>
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textSecondary'
                              >
                                % of capital active
                              </Typography>
                            </Grid>
                            <Grid
                              container
                              xs={6}
                              direction='row'
                              justify='flex-end'
                              alignItems='center'
                            >
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textPrimary'
                              >
                                46%
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container direction='row' spacing={2}>
                          <Grid item xs={6}>
                            <Button
                              size='large'
                              color='primary'
                              variant='contained'
                              fullWidth
                            >
                              Add
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              size='large'
                              color='secondary'
                              variant='outlined'
                              fullWidth
                            >
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box component='div' className={classes.bottomSector}>
                    <Typography
                      variant='body1'
                      component='h1'
                      color='textSecondary'
                    >
                      Call pool price level
                    </Typography>
                    <Box component='div' className={classes.subtitle}>
                      <Typography
                        variant='body2'
                        component='h2'
                        color='textSecondary'
                      >
                        Last 7 days
                      </Typography>
                      <IconButton
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                      >
                        <Help />
                      </IconButton>
                      <TooltipPan open={open} anchorEl={anchorEl}>
                        <b>Premia pools</b> use state of the art liquidity-aware
                        pricing models. When there is excess capital available,
                        options become cheaper. When capital starts to dry up,
                        price of options increases. The price level updates
                        after every trade.
                        <Typography className={classes.readMore}>
                          Read more
                        </Typography>
                      </TooltipPan>
                    </Box>
                    <LineChart
                      color='#14A887'
                      data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
                      categories={[
                        '2021/5/24',
                        '2021/5/25',
                        '2021/5/26',
                        '2021/5/27',
                        '2021/5/28',
                        '2021/5/29',
                        '2021/5/30',
                      ]}
                      width='100%'
                      height={200}
                    />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Paper>
                  <Box component='div' className={classes.topSector}>
                    <Box component='div' className={classes.header}>
                      <PoolDownIcon />
                      <Typography
                        variant='h6'
                        component='h1'
                        color='textPrimary'
                      >
                        Put Pool
                      </Typography>
                      <Typography
                        variant='body1'
                        component='h2'
                        color='textSecondary'
                      >
                        78% Utilization
                      </Typography>
                    </Box>
                    <Grid
                      container
                      direction={!mobile ? 'row' : 'column'}
                      alignItems={!mobile ? 'flex-start' : 'center'}
                    >
                      <RadialChart
                        color='#EB4A97'
                        secondaryColor='#8C43F6'
                        width={200}
                        height={200}
                        data={[67]}
                      >
                        <UniswapIcon />
                        Pool size in Uni
                        <Typography
                          component='h5'
                          variant='body2'
                          color='textSecondary'
                        >
                          211305
                        </Typography>
                      </RadialChart>
                      <Grid
                        item
                        direction='column'
                        justify='space-between'
                        className={classes.rightPanel}
                      >
                        <Grid container direction='column'>
                          <Typography
                            variant='body2'
                            component='h2'
                            color='textPrimary'
                          >
                            My P&L
                          </Typography>
                          <Grid container direction='row'>
                            <Grid container xs={6} alignItems='center'>
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textSecondary'
                              >
                                My total capital
                              </Typography>
                            </Grid>
                            <Grid
                              container
                              xs={6}
                              direction='row'
                              justify='flex-end'
                              alignItems='center'
                            >
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textPrimary'
                              >
                                10000
                              </Typography>
                              <UniswapIcon />
                            </Grid>
                          </Grid>
                          <Grid container direction='row'>
                            <Grid container xs={6} alignItems='center'>
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textSecondary'
                              >
                                Fees earned
                              </Typography>
                            </Grid>
                            <Grid
                              container
                              xs={6}
                              direction='row'
                              justify='flex-end'
                              alignItems='center'
                            >
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textPrimary'
                              >
                                100
                              </Typography>
                              <DaiIcon />
                            </Grid>
                          </Grid>
                          <Grid container direction='row'>
                            <Grid container xs={6} alignItems='center'>
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textSecondary'
                              >
                                % of capital active
                              </Typography>
                            </Grid>
                            <Grid
                              container
                              xs={6}
                              direction='row'
                              justify='flex-end'
                              alignItems='center'
                            >
                              <Typography
                                variant='body2'
                                component='h2'
                                color='textPrimary'
                              >
                                46%
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container direction='row' spacing={2}>
                          <Grid item xs={6}>
                            <Button
                              size='large'
                              color='secondary'
                              variant='contained'
                              fullWidth
                            >
                              Add
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              size='large'
                              color='secondary'
                              variant='outlined'
                              fullWidth
                            >
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box component='div' className={classes.bottomSector}>
                    <Typography
                      variant='body1'
                      component='h1'
                      color='textSecondary'
                    >
                      Put pool price level
                    </Typography>
                    <Box component='div' className={classes.subtitle}>
                      <Typography
                        variant='body2'
                        component='h2'
                        color='textSecondary'
                      >
                        Last 7 days
                      </Typography>
                      <IconButton
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                      >
                        <Help />
                      </IconButton>
                      <TooltipPan open={open} anchorEl={anchorEl}>
                        <b>Premia pools</b> use state of the art liquidity-aware
                        pricing models. When there is excess capital available,
                        options become cheaper. When capital starts to dry up,
                        price of options increases. The price level updates
                        after every trade.
                        <Typography className={classes.readMore}>
                          Read more
                        </Typography>
                      </TooltipPan>
                    </Box>
                    <LineChart
                      color='#BF47C3'
                      data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
                      categories={[
                        '2021/5/24',
                        '2021/5/25',
                        '2021/5/26',
                        '2021/5/27',
                        '2021/5/28',
                        '2021/5/29',
                        '2021/5/30',
                      ]}
                      width='100%'
                      height={200}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>
    </PageWithSidebar>
  );
};

export default ProVault;
