import React, { useState } from 'react';
import { Box, Grid, Container, Divider, Typography, BottomNavigation, BottomNavigationAction, TableRow, TableCell, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CapitalIcon from 'assets/svg/CapitalIcon.svg';
import ReturnIcon from 'assets/svg/ReturnIcon.svg';
import VaultIcon from 'assets/svg/VaultIcon.svg';
import UniIcon from 'assets/svg/UniIcon.svg';
import LinkIcon from 'assets/svg/LinkIcon.svg';
import YFIIcon from 'assets/svg/YFIIcon.svg';
import DaiIcon from 'assets/svg/Dai.svg';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import Moment from 'moment';
import cx from 'classnames';
import { formatNumber } from 'utils/formatNumber';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { PageWithSidebar } from 'layouts';
import { DataTable } from 'components';

const getYieldHeadCells = () => [
  {
    id: 'token',
    numeric: false,
    label: 'Token',
    sortKey: (yieldItem: any) => yieldItem?.symbol,
  },
  {
    id: 'capital',
    numeric: false,
    label: <>Capital<img src={DaiIcon} alt='Dai Icon' /></>,
    sortKey: (yieldItem: any) => yieldItem?.capital,
  },
  {
    id: 'typename',
    numeric: false,
    label: 'Type&name',
    sortKey: (yieldItem: any) => yieldItem?.name,
  },
  {
    id: 'earned',
    numeric: false,
    label: <>Earned<img src={DaiIcon} alt='Dai Icon' /></>,
    sortKey: (yieldItem: any) => yieldItem?.earned,
  },
  {
    id: 'expectedapy',
    numeric: false,
    label: 'Expected APY',
    sortKey: (yieldItem: any) => yieldItem?.apy,
  },
  {
    id: 'action',
    numeric: true,
    label: '',
    sortDisabled: true,
    sortKey: () => 1,
  },
];

const getOptionsHeadCells = () => [
  {
    id: 'token',
    numeric: false,
    label: 'Token',
    sortKey: (yieldItem: any) => yieldItem?.symbol,
  },
  {
    id: 'size',
    numeric: false,
    label: 'Size',
    sortKey: (yieldItem: any) => yieldItem?.size,
  },
  {
    id: 'type',
    numeric: false,
    label: 'Type',
    sortKey: (yieldItem: any) => yieldItem?.type,
  },
  {
    id: 'strike',
    numeric: false,
    label: <>Strike<img src={DaiIcon} alt='Dai Icon' /></>,
    sortKey: (yieldItem: any) => yieldItem?.strike,
  },
  {
    id: 'currentvalue',
    numeric: false,
    label: <>Current Value<img src={DaiIcon} alt='Dai Icon' /></>,
    sortKey: (yieldItem: any) => yieldItem?.value,
  },
  {
    id: 'expiration',
    numeric: false,
    label: 'Expiration',
    sortKey: (yieldItem: any) => yieldItem?.expiration,
  },
  {
    id: 'action',
    numeric: true,
    label: '',
    element: <SellAllButton />,
    sortDisabled: true,
    sortKey: () => 1,
  },
];

const SellAllButton: React.FC = () => {
  return <Button variant='outlined' size='large'>Sell All</Button>
}

const useStyles = makeStyles(({ palette }) => ({
  title: {
    fontSize: 28,
    fontWeight: 700,
  },
  fullWidth: {
    width: '100%'
  },
  yieldBox: {
    width: 38,
    height: 38,
    position: 'relative',
    '& div': {
      opacity: 0.2
    },
    '& img': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  capital: {
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`
  },
  return: {
    background: `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.dark} 118.78%)`    
  },
  price: {
    fontSize: 18,
    lineHeight: 1,
    fontWeight: 700,
    display: 'flex',
    '& img': {
      marginLeft: 4,
      width: 16
    }
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 1,
    marginBottom: 4,
  },
  errorIcon: {
    position: 'absolute',
    top: 0,
    right: 8,
    width: '12px !important',
    '& path': {
      fill: `${palette.error.main} !important`      
    }
  },
  tableCellIcon: {
    marginRight: 4,
    marginBottom: -3,
    filter: 'grayScale(1)'
  },
  typeBox: {
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'capitalize',
    position: 'relative',
    '& div': {
      width: '100%',
      height: '100%',
      opacity: 0.1,
      position: 'absolute',
      borderRadius: 12,
      top: 0,
      left: 0
    },
    '& svg, & img': {
      marginRight: 4,
    },
  },
  vault: {
    color: palette.primary.main,
    '& div': {
      background: palette.primary.main
    },
  },
  call: {
    color: palette.success.dark,
    '& div': {
      background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`
    }
  },
  put: {
    color: palette.error.main,
    '& div': {
      background: `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.dark} 118.78%)`
    },
  },
  expirationCell: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: 14,
      margin: '0 0 0 4px'
    }
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: '0 8px',
    '& img': {
      width: 16,
      marginLeft: 4
    }
  }
}));

const Positions: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const [ yieldFilter, setYieldFilter ] = useState(0);
  const [ optionFilter, setOptionFilter ] = useState(0);

  const yieldHeadCells = getYieldHeadCells();
  const optionsHeadCells = getOptionsHeadCells();

  const yieldData = [
    {
      tokenIcon: UniIcon,
      symbol: 'Uni',
      capital: 15002,
      type: 'vault',
      name: 'Medium Risk',
      earned: 100,
      apy: 24
    },
    {
      tokenIcon: LinkIcon,
      symbol: 'Link',
      capital: 15002,
      option: 'call',
      type: 'pool',
      name: 'Link Call Pool',
      earned: 100,
      apy: 24
    },
    {
      tokenIcon: YFIIcon,
      symbol: 'YFI',
      capital: 15002,
      option: 'put',
      type: 'pool',
      name: 'Uni Put Pool',
      earned: 100,
      apy: 24
    },
    {
      tokenIcon: UniIcon,
      symbol: 'Uni',
      capital: 15002,
      type: 'vault',
      name: 'Low Risk',
      earned: 100,
      apy: 24
    }
  ]

  const optionsData = [
    {
      tokenIcon: UniIcon,
      symbol: 'Uni',
      size: 15002,
      type: 'call',
      strike: 100,
      value: 100,
      expiration: Moment.now()
    },
    {
      tokenIcon: UniIcon,
      symbol: 'Uni',
      size: 15002,
      type: 'call',
      strike: 100,
      value: 100,
      expiration: Moment.now()
    },
    {
      tokenIcon: UniIcon,
      symbol: 'Uni',
      size: 15002,
      type: 'put',
      strike: 100,
      value: 100,
      expiration: Moment.now()
    }
  ]

  return (
    <PageWithSidebar>
      <Grid container alignItems='center' justify='space-between'>
        <Typography
          component='h1'
          color='textPrimary'
          className={classes.title}
        >
          My yield positions
        </Typography>
        <Box mt={tablet ? 2 : 0} width={tablet ? 1 : 700}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={3}>
              <Container fixed>
                <Box width={1} p={1} display='flex' alignItems='center'>
                  <Box className={classes.yieldBox}>
                    <Box width={1} height={1} borderRadius={12} className={classes.capital} />
                    <img src={CapitalIcon} alt='Capital Active' />
                  </Box>
                  <Box ml={1}>
                    <Typography color='textSecondary' className={classes.subtitle}>
                      Capital active
                    </Typography>
                    <Typography color='textPrimary' component='h2' className={classes.price}>
                      124,098
                      <img src={DaiIcon} alt='Dai Icon' />
                    </Typography>
                  </Box>
                </Box>
              </Container>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Container fixed>
                <Box width={1} p={1} display='flex' alignItems='center'>
                  <Box className={classes.yieldBox}>
                    <Box width={1} height={1} borderRadius={12} className={classes.return} />
                    <img src={ReturnIcon} alt='Current Return' />
                  </Box>
                  <Box ml={1}>
                    <Typography color='textSecondary' className={classes.subtitle}>
                      Current return
                    </Typography>
                    <Typography color='textPrimary' component='h2' className={classes.price}>
                      12%
                    </Typography>
                  </Box>
                </Box>
              </Container>
            </Grid>
            <Grid item xs={12} sm={6}>
              <BottomNavigation
                value={yieldFilter}
                className={classes.fullWidth}
                onChange={(event, newValue) => {
                  setYieldFilter(newValue);
                }}
                showLabels={true}
              >
                <BottomNavigationAction label='Today' />
                <BottomNavigationAction label='This week' />
                <BottomNavigationAction label='This month' />
              </BottomNavigation>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Box my={3}>
        {
          mobile
            ? <>
                {yieldData.map((item: any, index) => 
                  <Box mb={2}>
                    <Container fixed>
                      <Box width={1} display='flex' p={1} justifyContent='space-between' alignItems='center'>
                        <Box>
                          <img src={item.tokenIcon} alt={item.symbol} className={classes.tableCellIcon} />{item.symbol}
                        </Box>
                        <Box display='flex' alignItems='center'>
                          {item.name}<Box ml={2} display='flex' alignItems='center'><Box className={cx(classes.typeBox, item.type === 'vault' ? classes.vault : item.option === 'call' ? classes.call : classes.put)}><Box />{item.type === 'vault' ? <img src={VaultIcon} alt='vault' /> : item.option === 'call' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{item.type}</Box></Box>
                        </Box>
                      </Box>
                      <Divider />
                      <Box className={classes.cardRow}>
                        <Box display='flex' alignItems='center'><Typography color='textSecondary'>Capital</Typography><img src={DaiIcon} alt='Dai Icon' /></Box>
                        {formatNumber(item.capital)}
                      </Box>
                      <Box className={classes.cardRow}>
                        <Box display='flex' alignItems='center'><Typography color='textSecondary'>Earned</Typography><img src={DaiIcon} alt='Dai Icon' /></Box>
                        {item.earned}
                      </Box>
                      <Box className={classes.cardRow}>
                        <Box display='flex' alignItems='center'><Typography color='textSecondary'>Expected APY</Typography></Box>
                        {item.apy}
                      </Box>
                      <Box px={1} my={1.5}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Button fullWidth color='primary'>Add</Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button fullWidth variant='outlined'>Remove</Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Container>
                  </Box>
                )}
              </>
            : <DataTable
              headCells={yieldHeadCells}
              data={yieldData}
              rowPerPage={5}
              renderRow={(item: any, index) => {
                return (<TableRow key={index}>
                  <TableCell><img src={item.tokenIcon} alt={item.symbol} className={classes.tableCellIcon} />{item.symbol}</TableCell> 
                  <TableCell><Box ml={2}>{formatNumber(item.capital)}</Box></TableCell>
                  <TableCell><Box ml={2} display='flex' alignItems='center'><Box mr={1} className={cx(classes.typeBox, item.type === 'vault' ? classes.vault : item.option === 'call' ? classes.call : classes.put)}><Box />{item.type === 'vault' ? <img src={VaultIcon} alt='vault' /> : item.option === 'call' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{item.type}</Box>{item.name}</Box></TableCell>
                  <TableCell><Box ml={2}>{item.earned}</Box></TableCell>
                  <TableCell><Box ml={2}>{item.apy}</Box></TableCell>
                  <TableCell><Button color='primary'>Add</Button><Button variant='outlined'>Remove</Button></TableCell>
                </TableRow>);
              }}
            />  
        }
      </Box>
      <Grid container alignItems='center' justify='space-between'>
        <Typography
          component='h1'
          color='textPrimary'
          className={classes.title}
        >
          My option positions
        </Typography>
        <Box mt={mobile ? 2 : 0} width={mobile ? 1 : 'auto'}>
          <BottomNavigation
            value={optionFilter}
            className={cx(mobile && classes.fullWidth)}
            onChange={(event, newValue) => {
              setOptionFilter(newValue);
            }}
            showLabels={true}
          >
            <BottomNavigationAction label='Current' icon={<WatchLaterIcon />} />
            <BottomNavigationAction label='Expired' icon={<><WarningIcon /><ErrorIcon className={classes.errorIcon} /></>} />
          </BottomNavigation>
        </Box>
      </Grid>
      <Box mt={3}>
        {mobile
          ? <>
            {optionsData.map((item: any, index) => 
              <Box mb={2}>
                <Container fixed>
                  <Box width={1} display='flex' p={1} justifyContent='space-between' alignItems='center'>
                    <Box>
                      <img src={item.tokenIcon} alt={item.symbol} className={classes.tableCellIcon} />{item.symbol}
                    </Box>
                    <Box className={cx(classes.typeBox, item.type === 'call' ? classes.call : classes.put)}><Box />{item.type === 'call' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{item.type}</Box>
                  </Box>
                  <Divider />
                  <Box className={classes.cardRow}>
                    <Typography color='textSecondary'>Size</Typography>
                    {formatNumber(item.size)}
                  </Box>
                  <Box className={classes.cardRow}>
                    <Box display='flex' alignItems='center'><Typography color='textSecondary'>Current Value</Typography><img src={DaiIcon} alt='Dai Icon' /></Box>
                    {formatNumber(item.value)}
                  </Box>
                  <Box className={classes.cardRow}>
                    <Box display='flex' alignItems='center'><Typography color='textSecondary'>Strike</Typography><img src={DaiIcon} alt='Dai Icon' /></Box>
                    {formatNumber(item.strike)}
                  </Box>
                  <Box className={classes.cardRow}>
                    <Typography color='textSecondary'>Expiration</Typography>
                    <Box display='flex' alignItems='center'>
                      {Moment(item.expiration).format('DD MMM') }&nbsp;&nbsp;<Typography color='textSecondary'>2 days left</Typography>
                    </Box>
                  </Box>
                  <Box px={1} my={1.5}>
                    <Button fullWidth color='primary'>Sell</Button>
                  </Box>
                </Container>
              </Box>
            )}
          </>
          : <DataTable
              headCells={optionsHeadCells}
              data={optionsData}
              rowPerPage={5}
              renderRow={(item: any, index) => {
                return (<TableRow key={index}>
                  <TableCell><img src={item.tokenIcon} alt={item.symbol} className={classes.tableCellIcon} />{item.symbol}</TableCell>
                  <TableCell><Box ml={1}>{formatNumber(item.size)}</Box></TableCell>
                  <TableCell><Box className={cx(classes.typeBox, item.type === 'call' ? classes.call : classes.put)}><Box />{item.type === 'call' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{item.type}</Box></TableCell>
                  <TableCell><Box ml={1}>{item.strike}</Box></TableCell>
                  <TableCell><Box ml={1}>{item.value}</Box></TableCell>
                  <TableCell><Box ml={1} className={classes.expirationCell}>{Moment(item.expiration).format('DD MMM') } <Typography color='textSecondary'>2 days left</Typography></Box></TableCell>
                  <TableCell><Box ml={1}><Button color='primary'>Sell</Button></Box></TableCell>
                </TableRow>);
              }}
            />
        }
      </Box>
    </PageWithSidebar>
  );
};

export default Positions;
