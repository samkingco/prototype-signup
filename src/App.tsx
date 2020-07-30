import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { createGlobalStyle, ThemeProvider } from "./design-system/styled";
import theme from "./design-system/theme";
import { ScrollToTopControlller } from "./components/ScrollToTopController";
import { RedirectToMarketing } from "./components/RedirectToMarketing";
import { NotImplemented } from "./screens/not-implemented";
import { WhosMedicine } from "./screens/whos-medicine";
import { AccountDetails } from "./screens/account-details";
import { VerifyEmail } from "./screens/verify-email";
import { AddPhone } from "./screens/add-phone";
import { VerifyPhone } from "./screens/verify-phone";
import { AccountComplete } from "./screens/account-complete";
import { NHSNumber } from "./screens/nhs-number";
import { NHSDetails } from "./screens/nhs-details";
import { ConfirmGP } from "./screens/confirm-gp";
import { NominateEcho } from "./screens/nominate-echo";
import { SignupComplete } from "./screens/signup-complete";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Echo Icons';
    src: url('/fonts/Echo Icons.woff2') format('woff2'), url('/fonts/Echo Icons.woff') format('woff'), url('/fonts/Echo Icons.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    padding: 0;
    margin: 0;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: ${(p) => p.theme.colors.gray10};
    font-family: ${theme.fonts.body};
    font-weight: 400;
    font-size: 16px;
    color: ${(p) => p.theme.colors.gray90};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles />
          <Router>
            <ScrollToTopControlller />
            <Switch>
              <Route
                path="/"
                component={() => <RedirectToMarketing />}
                exact={true}
              />
              <Route
                path="/whos-medicine"
                component={WhosMedicine}
                exact={true}
              />
              <Route
                path="/create-account"
                component={AccountDetails}
                exact={true}
              />
              <Route
                path="/verify-email"
                component={VerifyEmail}
                exact={true}
              />
              <Route path="/add-phone" component={AddPhone} exact={true} />
              <Route
                path="/verify-phone"
                component={VerifyPhone}
                exact={true}
              />
              <Route
                path="/account-complete"
                component={AccountComplete}
                exact={true}
              />
              <Route path="/nhs-number" component={NHSNumber} exact={true} />
              <Route path="/nhs-details" component={NHSDetails} exact={true} />
              <Route path="/confirm-gp" component={ConfirmGP} exact={true} />
              <Route
                path="/nominate-echo"
                component={NominateEcho}
                exact={true}
              />
              <Route
                path="/signup-complete"
                component={SignupComplete}
                exact={true}
              />
              <Route path="*" component={NotImplemented} exact={true} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
