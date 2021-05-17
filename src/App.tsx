import React, { Suspense } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider as StateProvider } from 'react-redux';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';

import {
  useModalOpen,
  useCloseModals,
  useNotificationOpen,
  useCloseNotifications,
} from './state/application/hooks';
import {
  ApplicationModal,
  ApplicationNotification,
} from './state/application/actions';
import ApplicationUpdater from './state/application/updater';
import MulticallUpdater from './state/multicall/updater';
import UserUpdater from './state/user/updater';
import store from './state';
import theme from './theme';

import { Dashboard, Stake } from './pages';
import {
  TransactionLoadingModal,
  TransactionSuccessModal,
  TransactionCancelledModal,
  TransactionFailedModal,
  TransactionFailedNotification,
  TransactionSentNotification,
  TransactionStartNotification,
  TransactionSuccessNotification,
} from 'components';

const graphUrls: { [chainId: number]: string } = {
  1: 'https://api.thegraph.com/subgraphs/name/premiafinance/premia',
  4: 'https://api.thegraph.com/subgraphs/name/premiafinance/premia-rinkeby',
  42: 'https://api.thegraph.com/subgraphs/name/premiafinance/premia-kovan',
  56: 'https://api.thegraph.com/subgraphs/name/premiafinance/premia-bsc',
};

const TransactionNotifications: React.FC = () => {
  const transactionStartOpen = useNotificationOpen(
    ApplicationNotification.TransactionStarted,
  );
  const transactionSuccessOpen = useNotificationOpen(
    ApplicationNotification.TransactionSuccess,
  );
  const transactionSentOpen = useNotificationOpen(
    ApplicationNotification.TransactionSent,
  );
  const transactionFailedOpen = useNotificationOpen(
    ApplicationNotification.TransactionFailed,
  );

  const closeNotifications = useCloseNotifications();

  return (
    <>
      <TransactionStartNotification
        open={transactionStartOpen}
        onClose={closeNotifications}
      />
      <TransactionSentNotification
        open={transactionSentOpen}
        onClose={closeNotifications}
      />
      <TransactionFailedNotification
        open={transactionFailedOpen}
        onClose={closeNotifications}
      />
      <TransactionSuccessNotification
        open={transactionSuccessOpen}
        onClose={closeNotifications}
      />
    </>
  );
};

const TopLevelModals: React.FC = () => {
  const transactionLoadingOpen = useModalOpen(
    ApplicationModal.TransactionLoading,
  );
  const transactionSuccessOpen = useModalOpen(
    ApplicationModal.TransactionSuccess,
  );
  const transactionCancelledOpen = useModalOpen(
    ApplicationModal.TransactionCancelled,
  );
  const transactionFailedOpen = useModalOpen(
    ApplicationModal.TransactionFailed,
  );

  const closeModals = useCloseModals();

  return (
    <>
      <TransactionLoadingModal
        open={transactionLoadingOpen}
        onClose={closeModals}
      />
      <TransactionSuccessModal
        open={transactionSuccessOpen}
        onClose={closeModals}
      />
      <TransactionCancelledModal
        open={transactionCancelledOpen}
        onClose={closeModals}
      />
      <TransactionFailedModal
        open={transactionFailedOpen}
        onClose={closeModals}
      />
    </>
  );
};

const StateUpdaters: React.FC = () => {
  return (
    <>
      <ApplicationUpdater />
      <MulticallUpdater />
      <UserUpdater />
    </>
  );
};

const Providers: React.FC = ({ children }) => {
  const chainId = Number(localStorage.getItem('chainId')) || 1;

  const client = new ApolloClient({
    uri: graphUrls[chainId],
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
       <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <StateProvider store={store}>
              <StateUpdaters />

              <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <TopLevelModals />
                <TransactionNotifications />
                {children}
              </MuiThemeProvider>
            </StateProvider>
          </Suspense>
        </BrowserRouter>
       </ThemeProvider>
    </ApolloProvider>
  );
};

const App: React.FC = () => {
  return (
    <Providers>
      <Switch>
        <Route exact path='/'>
          <Dashboard />
        </Route>

        <Route exact path='/stake'>
          <Stake />
        </Route>

        <Route path='*'>
          <Dashboard />
        </Route>
      </Switch>
    </Providers>
  );
};

export default App;