import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  ButtonBase,
  Typography,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  useMediaQuery,
  Tooltip,
} from '@material-ui/core';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import moment from 'moment';
import cn from 'classnames';

import { ERC2612PermitMessage, signERC2612Permit } from 'eth-permit/eth-permit';
import { RSV } from 'eth-permit/rpc';

import { useWeb3 } from 'state/application/hooks';
import { useTransact, useIsHardwareWallet, useApproval } from 'hooks';
import { formatNumber } from 'utils/formatNumber';
import { formatBigNumber } from 'utils/formatNumber';
import { useStakingBalances } from 'state/staking/hooks';
import { useDarkModeManager } from 'state/user/hooks';

import { ContainedButton, Loader, SwitchWithGlider } from 'components';
import { ReactComponent as CalendarIcon } from 'assets/svg/CalendarIcon.svg';
import { ReactComponent as PremiaWhite } from 'assets/svg/NewLogoWhiteSmall.svg';
import { ReactComponent as CustomCheckBox } from 'assets/svg/CheckBox.svg';
import { ReactComponent as InfoIcon } from 'assets/svg/TooltipQuestionmark.svg';
import { ReactComponent as ApprovedIcon } from 'assets/svg/ApprovedTick.svg';
import LockPremiaIcon from 'assets/images/LockPremia-icon2x.png';
import LockPremiaMobile from 'assets/images/LockPremiaMobile-icon2x.png';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '710px',
    width: '384px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    margin: '12px',
  },
  wrapperMobile: {
    width: '335px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    margin: '12px 12px 50px',
  },
  borderedCard: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '384px',
    height: '645px',
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
  },
  borderedCardMobile: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    width: '335px',
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
  },
  lockImg: {
    position: 'relative',
    top: 82,
    left: 143,
    width: '99px',
    height: '136px',
    zIndex: 2,
  },
  titleBox: {
    marginTop: '98px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  titleBoxMobile: {
    marginTop: '24px',
    display: 'flex',
    height: '130px',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
  },
  secondaryTitle: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '18px',
    margin: '7px 0 9px',
  },
  subTitle: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
  },
  smallInfoText: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '24px',
  },
  col: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  horizontalBox: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '330px',
    padding: '0 16px 12px',
    margin: '22px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 8px 12px',
    margin: '22px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  borderedBox: {
    boxSizing: 'border-box',
    height: '46px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '3px',
    '&:hover': {
      backgroundColor: palette.primary.dark,
      border: `1px solid ${palette.primary.main}`,
      '& .MuiTypography-root': {
        color: palette.primary.main,
      },
      '& svg path': {
        fill: palette.primary.main,
      },
    },
  },
  borderedInput: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    height: '46px',
    width: '100%',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '13px 50px 13px 40px',
    color: palette.text.primary,
    zIndex: 2,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: palette.primary.dark,
      border: `1px solid ${palette.primary.main}`,
      color: palette.primary.main,
    },
    '&:focus': {
      borderColor: palette.primary.main,
      outline: 'none',
      boxShadow: 'none',
      borderWidth: '1px',
    },
  },
  inputIcon: {
    '& svg ': {
      position: 'relative',
      top: -30,
      left: 14,
      zIndex: 1,
    },
    '&:hover': {
      '& svg path': {
        fill: palette.primary.main,
      },
    },
  },
  maxButton: {
    width: '74px',
    position: 'relative',
    top: -63,
    right: -269,
    zIndex: 3,
  },
  maxButtonMobile: {
    width: '74px',
    position: 'relative',
    top: -62,
    right: -236,
    zIndex: 3,
  },
  elementHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 16px',
    height: '158px',
  },
  botSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 20px',
  },
  progressBarAndTime: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  progressContainer: {
    display: 'flex',
    height: '5px',
    background: 'rgb(141, 151, 160, 0.4)',
    borderRadius: '5px',
    marginRight: '10px',
  },
  progressBar: {
    display: 'flex',
    height: '5px',
    background: '#FF9152',
    boxShadow: '0px 0px 11px rgba(255, 139, 63, 0.767701)',
    borderRadius: '5px',
  },
  selectionItem: {
    color: palette.text.secondary,
    fontSize: '14px',
    height: '44px',
    lineHeight: '18px',
    borderBottom: `1px ${palette.divider} solid`,
    '&:hover': {
      color: palette.text.primary,
    },
  },
  selectionItemLast: {
    color: palette.text.secondary,
    fontSize: '14px',
    height: '44px',
    lineHeight: '18px',
    '&:hover': {
      color: palette.text.primary,
    },
  },
  checkbox: {
    margin: '2px 10px 2px 0',
    padding: '0',
    '&:hover': {
      backgroundColor: palette.primary,
    },
  },
  hardwareWalletApprovalText: {
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '24px',
  },
  switchButton: {
    borderRadius: 10,
    height: 40,

    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: palette.text.secondary,
    },
    '& .MuiTypography-root': {
      fontWeight: 700,
      fontSize: '14px',
      color: palette.text.secondary,
    },
    '&:hover': {
      '& .MuiTypography-root': {
        color: palette.text.primary,
      },
    },
  },
  switchButtonLeft: {
    marginRight: 7,
  },
  activeSwitch: {
    cursor: 'default',
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
    '&:hover': {
      '& .MuiTypography-root': {
        color: palette.primary.main,
      },
    },
  },
}));

interface PermitState {
  permit?: ERC2612PermitMessage & RSV;
  permitDeadline?: number;
}

const LockPremiaCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { palette } = theme;
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [darkMode] = useDarkModeManager();
  const { web3, account, contracts } = useWeb3();
  const isHardwareWallet = useIsHardwareWallet();
  const transact = useTransact();

  const [checkIsOn, setCheckIsOn] = useState(isHardwareWallet);
  const [shouldApprove] = useState(isHardwareWallet);
  const [lockingMode, setLockingMode] = useState(true);
  const [signedAlready, setSignedAlready] = useState(false);
  const [approvedAlready, setApprovedAlready] = useState(false);
  const [permitState, setPermitState] = useState<PermitState>({});
  const [lockAmount, setLockAmount] = useState('');
  const [lockupMonths, setLockupMonths] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const {
    xPremiaLocked,
    xPremiaLockedUntil,
    xPremiaBalance,
    xPremiaFeeDiscount,
    xPremiaStakeWithBonus,
    xPremiaStakePeriod,
  } = useStakingBalances();

  const progress = useMemo(
    () =>
      xPremiaLockedUntil &&
      xPremiaStakePeriod &&
      xPremiaLockedUntil.toNumber() !== 0
        ? (moment.unix(xPremiaLockedUntil.toNumber()).diff(moment(), 'days') /
            (xPremiaStakePeriod.toNumber() / 86400)) *
          100
        : 0,
    [xPremiaLockedUntil, xPremiaStakePeriod],
  );

  const lockPeriodIsOver = useMemo(
    () =>
      xPremiaLockedUntil && xPremiaLockedUntil.toNumber() !== 0
        ? xPremiaLockedUntil.toNumber() * 1000 < Date.now()
        : false,
    [xPremiaLockedUntil],
  );

  const lockedXPremia = useMemo(
    () => (xPremiaLocked ? Number(formatBigNumber(xPremiaLocked)) : false),
    [xPremiaLocked],
  );

  const { allowance: lockingAllowance, onApprove: onApproveLocking } =
    useApproval(
      contracts?.PremiaStaking?.address as string,
      contracts?.PremiaFeeDiscount?.address as string,
    );

  useEffect(() => {
    if (!lockingAllowance) {
      setApprovedAlready(false);
    } else if (
      lockAmount &&
      parseFloat(lockAmount) !== 0 &&
      lockingAllowance &&
      lockingAllowance >= parseFloat(lockAmount)
    ) {
      setApprovedAlready(true);
    }
  }, [lockingAllowance, lockAmount]);

  const StakeButton = useCallback(
    () => (
      <Box
        clone
        height={30}
        width={165}
        display='flex'
        alignItems='center'
        justifyContent='center'
        className={cn(classes.switchButton, classes.switchButtonLeft, {
          [classes.activeSwitch]: lockingMode,
        })}
        onClick={() => {
          setLockingMode(true);
          setLockAmount('');
        }}
      >
        <ButtonBase>
          <Typography>Lock</Typography>
        </ButtonBase>
      </Box>
    ),
    [lockingMode, classes],
  );

  const UnstakeButton = useCallback(
    () => (
      <Box
        clone
        height={30}
        width={165}
        display='flex'
        alignItems='center'
        justifyContent='center'
        className={cn(classes.switchButton, {
          [classes.activeSwitch]: !lockingMode,
        })}
        onClick={() => {
          setLockingMode(false);
          setLockAmount('');
          setLockupMonths(null);
        }}
      >
        <ButtonBase>
          <Typography>Unlock</Typography>
        </ButtonBase>
      </Box>
    ),
    [lockingMode, classes],
  );

  const handleOpenSelector = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleSetLockupMonths = useCallback((months: number) => {
    setLockupMonths(months);
    setAnchorEl(null);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleChangeLockAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      let paddedValue = value.replace(/[^0-9.]/g, '');
      if (paddedValue === '') {
        setLockAmount('');
        return;
      }
      if (paddedValue === '.') {
        setLockAmount('0.');
        return;
      }
      if (paddedValue === '0') {
        setLockAmount('0');
        return;
      }
      if (paddedValue.startsWith('0') && paddedValue[1] !== '.') {
        const last = paddedValue.length;
        paddedValue = paddedValue.slice(1, last);
      }
      if (paddedValue) {
        setLockAmount(paddedValue);
      }
    },
    [],
  );

  const handleMax = useCallback(() => {
    if (lockingMode) {
      if (xPremiaBalance) {
        setLockAmount(formatEther(xPremiaBalance));
      }
    } else {
      if (xPremiaLocked) {
        setLockAmount(formatEther(xPremiaLocked));
      }
    }
  }, [xPremiaBalance, xPremiaLocked, lockingMode]);

  const handleToggleCheck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckIsOn(!checkIsOn);
    },
    [checkIsOn],
  );

  const signPermit = useCallback(async () => {
    if (!lockAmount) return;
    const token = contracts?.PremiaStaking?.address as string;
    const spender = contracts?.PremiaFeeDiscount.address as string;
    const amount = parseEther(lockAmount);
    const deadline = Math.floor(new Date().getTime() / 1000 + 3600);

    const permit = await signERC2612Permit(
      web3,
      token,
      account,
      spender,
      amount.toString(),
      deadline,
    );
    if (permit && permit.r) {
      setPermitState({ permit, permitDeadline: deadline });
      setSignedAlready(true);
    }
  }, [contracts, account, lockAmount, web3]);

  const handleLockWithApproval = useCallback(async () => {
    if (!lockAmount || parseFloat(lockAmount) === 0 || !lockupMonths) return;
    const amount = parseEther(lockAmount);
    await transact(
      contracts?.PremiaFeeDiscount?.stake(
        amount,
        lockupMonths * 30 * 24 * 3600,
      ),
      {
        description: `Lock ${formatBigNumber(
          amount,
        )} xPREMIA for fee discounts`,
      },
    );
  }, [contracts, transact, lockAmount, lockupMonths]);

  const handleLockWithPermit = useCallback(async () => {
    if (
      !permitState.permit ||
      !lockupMonths ||
      !permitState.permitDeadline ||
      !lockAmount ||
      parseFloat(lockAmount) === 0
    )
      return;
    const dateNow = Date.now();
    const expirationDate = permitState.permitDeadline * 1000;
    if (dateNow > expirationDate) {
      setPermitState({});
      setSignedAlready(false);
      return;
    }
    const amount = parseEther(lockAmount);
    await transact(
      contracts?.PremiaFeeDiscount?.stakeWithPermit(
        amount,
        lockupMonths * 30 * 24 * 3600,
        permitState.permitDeadline,
        permitState.permit.v,
        permitState.permit.r,
        permitState.permit.s,
      ),
      {
        description: `Lock ${formatBigNumber(
          amount,
        )} xPREMIA for fee discounts`,
      },
    );
    setSignedAlready(false);
  }, [contracts, transact, permitState, lockAmount, lockupMonths]);

  const handleUnlock = useCallback(async () => {
    if (!lockAmount || parseFloat(lockAmount) === 0) return;
    if (!lockPeriodIsOver) return;

    const amount = parseEther(lockAmount);

    transact(contracts?.PremiaFeeDiscount?.unstake(lockAmount), {
      description: `Unlock ${formatBigNumber(amount)} locked xPREMIA`,
    });
  }, [contracts?.PremiaFeeDiscount, lockAmount, lockPeriodIsOver, transact]);

  const appovalAction = useMemo(() => {
    if (shouldApprove || checkIsOn) {
      return onApproveLocking;
    }
    return signPermit;
  }, [checkIsOn, onApproveLocking, shouldApprove, signPermit]);

  const lockingMethod = useMemo(() => {
    if (
      !lockupMonths ||
      !lockAmount ||
      Number(lockAmount) === 0 ||
      !xPremiaBalance ||
      !xPremiaBalance.gte(parseEther(lockAmount))
    ) {
      return () => {};
    }
    if (lockingAllowance && approvedAlready) {
      return handleLockWithApproval;
    }
    return handleLockWithPermit;
  }, [
    lockupMonths,
    lockAmount,
    xPremiaBalance,
    lockingAllowance,
    approvedAlready,
    handleLockWithPermit,
    handleLockWithApproval,
  ]);

  const authorizationButtonLabel = useMemo(() => {
    if (lockingAllowance || signedAlready) {
      return 'Approved';
    }
    if (shouldApprove || checkIsOn) {
      return 'Approve 1/2';
    }
    return 'Sign permit 1/2';
  }, [lockingAllowance, signedAlready, shouldApprove, checkIsOn]);

  const authorizationTooltip = useMemo(() => {
    if (shouldApprove || checkIsOn) {
      return 'You must give Premia permission to use your xPremia. You only have to do this once per token.';
    }
    return 'You need to sign a permit to enable locking xPremia';
  }, [shouldApprove, checkIsOn]);

  const lockingLabel = useMemo(() => {
    if (!lockupMonths) {
      return 'Select lock period';
    }

    if (!lockAmount || parseFloat(lockAmount) === 0) {
      return 'Enter amount';
    }

    if (xPremiaBalance && parseEther(lockAmount).gt(xPremiaBalance)) {
      return 'Not enough xPremia';
    }
    return 'Lock xPremia';
  }, [lockupMonths, lockAmount, xPremiaBalance]);

  const unlockingLabel = useMemo(() => {
    if (!lockedXPremia) {
      return 'No xPremia to unlock';
    }

    if (lockedXPremia && !lockPeriodIsOver) {
      return 'Still locked';
    }

    if (!lockAmount || parseFloat(lockAmount) === 0) {
      return 'Enter amount';
    }

    if (lockedXPremia && parseEther(lockAmount).gt(xPremiaLocked)) {
      return 'Enter valid amount';
    }

    return 'Unlock';
  }, [lockAmount, lockPeriodIsOver, lockedXPremia, xPremiaLocked]);

  return (
    <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
      {!mobile && (
        <img
          src={LockPremiaIcon}
          alt='Lock xPremia'
          className={classes.lockImg}
        />
      )}
      <Box
        className={!mobile ? classes.borderedCard : classes.borderedCardMobile}
        style={
          darkMode
            ? {}
            : {
                borderColor: 'transparent',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
              }
        }
      >
        <Box className={!mobile ? classes.titleBox : classes.titleBoxMobile}>
          {mobile && (
            <img
              src={LockPremiaMobile}
              alt='Lock xPremia'
              style={{ height: '80px', width: '58.24px' }}
            />
          )}
          <Box>
            <Typography
              component='h2'
              color='textPrimary'
              className={classes.title}
            >
              Lock xPremia
            </Typography>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.subTitle}
            >
              Reduce your transaction costs
            </Typography>
          </Box>
        </Box>
        <Box
          className={!mobile ? classes.topSection : classes.topSectionMobile}
        >
          <Box
            width={1}
            marginBottom={!mobile ? 'auto' : 2}
            borderRadius={10}
            padding='5px'
            border={`1px solid ${theme.palette.divider}`}
          >
            <SwitchWithGlider
              gliderWidth={!mobile ? 165 : 152}
              gliderHeight={40}
              marginBetweenSwitches={!mobile ? 7 : 0}
              defaultIndex={lockingMode ? 0 : 1}
              elements={[StakeButton, UnstakeButton]}
            />
          </Box>

          {lockingMode && (
            <Box className={classes.col}>
              <Box
                display='flex'
                style={{ margin: '0 8px 2px', justifyContent: 'flex-start' }}
              >
                <Typography
                  component='p'
                  color='textPrimary'
                  className={classes.elementHeader}
                >
                  Lock period
                </Typography>
              </Box>
              <Box className={classes.borderedBox} onClick={handleOpenSelector}>
                <Typography
                  component='p'
                  color={lockupMonths ? 'textPrimary' : 'textSecondary'}
                  className={classes.subTitle}
                  style={{ marginLeft: '10px' }}
                >
                  {!lockupMonths
                    ? 'Select period'
                    : lockupMonths === 1
                    ? '1 Month'
                    : `${lockupMonths} Months`}
                </Typography>
                <CalendarIcon
                  fill={palette.secondary.main}
                  style={{ marginRight: '10px' }}
                />
              </Box>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {(!xPremiaLockedUntil ||
                  moment
                    .unix(xPremiaLockedUntil.toNumber())
                    .diff(moment(), 'months') < 1) && (
                  <MenuItem
                    onClick={() => handleSetLockupMonths(1)}
                    className={classes.selectionItem}
                    style={!mobile ? { width: '350px' } : { width: '315px' }}
                  >
                    1 Month
                  </MenuItem>
                )}

                {(!xPremiaLockedUntil ||
                  moment
                    .unix(xPremiaLockedUntil.toNumber())
                    .diff(moment(), 'months') < 3) && (
                  <MenuItem
                    onClick={() => handleSetLockupMonths(3)}
                    className={classes.selectionItem}
                    style={!mobile ? { width: '350px' } : { width: '315px' }}
                  >
                    3 Months
                  </MenuItem>
                )}

                {(!xPremiaLockedUntil ||
                  moment
                    .unix(xPremiaLockedUntil.toNumber())
                    .diff(moment(), 'months') < 6) && (
                  <MenuItem
                    onClick={() => handleSetLockupMonths(6)}
                    className={classes.selectionItem}
                    style={!mobile ? { width: '350px' } : { width: '315px' }}
                  >
                    6 Months
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => handleSetLockupMonths(12)}
                  className={classes.selectionItemLast}
                  style={!mobile ? { width: '350px' } : { width: '315px' }}
                >
                  12 Months
                </MenuItem>
              </Menu>
            </Box>
          )}

          <Box className={classes.col}>
            <Box
              className={classes.horizontalBox}
              style={{ margin: '10px 8px 0', width: 'calc(100% - 16px)' }}
            >
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                {lockingMode ? 'Lock quantity' : 'Unlock quantity'}
              </Typography>
              <Typography
                component='p'
                color='textSecondary'
                className={classes.smallInfoText}
              >
                {`Max available: ${formatNumber(
                  formatEther(lockingMode ? xPremiaBalance : xPremiaLocked),
                )}`}
              </Typography>
            </Box>

            <Box width='100%' height='46px' className={classes.inputIcon}>
              <input
                value={lockAmount}
                className={classes.borderedInput}
                onChange={handleChangeLockAmount}
              />
              <PremiaWhite fill={palette.text.primary} />
              <Box
                className={
                  !mobile ? classes.maxButton : classes.maxButtonMobile
                }
              >
                <Button
                  color='primary'
                  variant='outlined'
                  size='small'
                  fullWidth
                  onClick={handleMax}
                >
                  MAX
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className={classes.horizontalBox} style={{ marginTop: '12px' }}>
            {lockingMode ? (
              <>
                <ContainedButton
                  fullWidth
                  color='secondary'
                  margin='2px 4px 2px 2px'
                  label={authorizationButtonLabel}
                  disabled={lockingAllowance > 0 || signedAlready}
                  onClick={appovalAction}
                  startIcon={
                    lockingAllowance || signedAlready ? (
                      <ApprovedIcon fill={palette.background.paper} />
                    ) : (
                      false
                    )
                  }
                  endIcon={
                    !lockingAllowance && !signedAlready ? (
                      <Tooltip
                        arrow
                        leaveTouchDelay={1500}
                        title={authorizationTooltip}
                      >
                        <InfoIcon fill={palette.background.paper} />
                      </Tooltip>
                    ) : (
                      false
                    )
                  }
                />
                <ContainedButton
                  fullWidth
                  color='secondary'
                  margin='2px 2px 2px 4px'
                  label={lockingLabel}
                  disabled={!signedAlready && !lockingAllowance}
                  onClick={lockingMethod}
                />
              </>
            ) : (
              <ContainedButton
                fullWidth
                color='secondary'
                label={unlockingLabel}
                disabled={
                  !lockAmount ||
                  parseFloat(lockAmount) === 0 ||
                  (xPremiaLocked && parseEther(lockAmount).gt(xPremiaLocked)) ||
                  !lockPeriodIsOver
                }
                onClick={handleUnlock}
              />
            )}
          </Box>
          {lockingMode && !lockingAllowance && !signedAlready && (
            <Box display='flex' width='100%' marginTop='12px'>
              <Checkbox
                checked={checkIsOn}
                onChange={handleToggleCheck}
                name='agreeToTerms'
                size='small'
                className={classes.checkbox}
                icon={<CustomCheckBox />}
                checkedIcon={
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      width='20'
                      height='20'
                      rx='4'
                      fill='#5294FF'
                      fillOpacity='0.2'
                    />
                    <rect
                      x='0.5'
                      y='0.5'
                      width='19'
                      height='19'
                      rx='3.5'
                      stroke='#5294FF'
                      strokeOpacity='0.5'
                    />
                    <path
                      d='M6 9.79777L9.08199 13L15 6.86891L14.1504 6L9.08199 11.25L6.83786 8.92275L6 9.79777Z'
                      fill='#5294FF'
                    />
                  </svg>
                }
              />
              <Typography
                component='p'
                color='textSecondary'
                className={classes.hardwareWalletApprovalText}
                style={mobile ? { fontSize: '11.5px' } : {}}
              >
                Use Approve (required by some hardware wallets)
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          className={!mobile ? classes.botSection : classes.botSectionMobile}
        >
          <Box className={classes.horizontalBox}>
            <Typography
              component='h3'
              color='textPrimary'
              className={classes.secondaryTitle}
            >
              My stats
            </Typography>
          </Box>
          <Box
            className={classes.horizontalBox}
            style={{ alignItems: 'center' }}
          >
            <Typography
              component='p'
              color='textSecondary'
              className={classes.elementHeader}
            >
              Time till unlock
            </Typography>
            <Box className={classes.progressBarAndTime}>
              <Box
                className={classes.progressContainer}
                width={!mobile ? '145px' : '85px'}
              >
                <Box
                  className={classes.progressBar}
                  style={{ width: `${progress}%` }}
                />
              </Box>
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                {xPremiaLockedUntil && xPremiaLockedUntil.toNumber() > 0 ? (
                  moment
                    .unix(xPremiaLockedUntil.toNumber())
                    .fromNow()
                    .replace('in ', '')
                ) : xPremiaLockedUntil?.toNumber() === 0 ? (
                  0
                ) : (
                  <Loader />
                )}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.horizontalBox}>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.elementHeader}
            >
              xPremia Locked
            </Typography>
            <Typography
              component='p'
              color='textPrimary'
              className={classes.elementHeader}
            >
              {formatNumber(formatEther(xPremiaLocked))}
            </Typography>
          </Box>
          <Box className={classes.horizontalBox}>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.elementHeader}
            >
              Fee Discount
            </Typography>
            <Typography
              component='p'
              color='textPrimary'
              className={classes.elementHeader}
            >
              {formatNumber(xPremiaFeeDiscount.div(BigNumber.from(1000)))}%
            </Typography>
          </Box>
          <Box className={classes.horizontalBox}>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.elementHeader}
            >
              Lock Multiplier
            </Typography>
            <Typography
              component='p'
              color='textPrimary'
              className={classes.elementHeader}
            >
              {isNaN(Number(formatEther(xPremiaStakeWithBonus))) ||
                (Number(formatEther(xPremiaStakeWithBonus)) === 0
                  ? 0
                  : formatNumber(
                      Number(xPremiaStakeWithBonus) / Number(xPremiaLocked),
                    ))}
              x
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LockPremiaCard;
