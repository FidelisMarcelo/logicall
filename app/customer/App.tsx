/* eslint-disable global-require */

import React, { useEffect, useState } from "react";
import { Router, Scene } from "react-native-router-flux";
import { ApolloProvider } from "react-apollo";

import * as Font from "expo-font";

import { Ionicons } from "@expo/vector-icons";

import { StyleProvider, View, Text, Root } from "native-base";
import { StyleSheet } from "react-native";
import Roboto from "native-base/Fonts/Roboto.ttf";
import RobotoMedium from "native-base/Fonts/Roboto_medium.ttf";
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";

import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import CreateOrder1SelectReceiverPage from "./pages/create-order/1-SelectReceiver";
import createOrder2SelectReceiverAddressPage from "./pages/create-order/2-SelectReceiverAddress";
import createOrder2aNewReceiverAddressPage from "./pages/create-order/2a-NewReceiverAddress";
import createOrder3SelectSenderAddressPage from "./pages/create-order/3-SelectSendAddress";
import createOrder4FinishPage from "./pages/create-order/4-Finish";
import PeoplePage from "./pages/People";
import Tab from "./components/Tab";

import { client } from "./utils/schema";

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: "ghostwhite",
  },
});

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Font.loadAsync({
      Roboto,
      Roboto_medium: RobotoMedium,
      ...Ionicons.font,
    }).then(() => setLoading(false));
  });

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <Root>
      <ApolloProvider client={client}>
        <StyleProvider style={getTheme(platform)}>
          <Router>
            <Scene key="root">
              <Scene
                key="signIn"
                component={SignInPage}
                title="Sign In"
                hideNavBar
              />
              <Scene
                key="signUp"
                component={SignUpPage}
                title="Sign Up"
                hideNavBar
              />
              <Scene
                key="createOrder1SelectReceiver"
                component={CreateOrder1SelectReceiverPage}
                title="Create Order - Receiver"
                hideNavBar
                clone
              />
              <Scene
                key="createOrder2SelectAddress"
                component={createOrder2SelectReceiverAddressPage}
                title="Create Order - Select Receiver Address"
                hideNavBar
                clone
              />
              <Scene
                key="createOrder2aNewAddress"
                component={createOrder2aNewReceiverAddressPage}
                title="Create Order - New Receiver Address"
                hideNavBar
                clone
              />
              <Scene
                key="createOrder3SelectSendAddress"
                component={createOrder3SelectSenderAddressPage}
                title="Create Order - Sender Address"
                hideNavBar
                clone
              />
              <Scene
                key="createOrder4Finish"
                component={createOrder4FinishPage}
                title="Create Order - Confirm"
                hideNavBar
                clone
              />
              <Scene
                key="tabbar"
                tabs
                hideNavBar
                tabBarStyle={styles.tabs}
                showLabel={false}
              >
                <Scene
                  key="people"
                  icon={Tab}
                  iconName="people"
                  iosIconName="ios-people"
                  component={PeoplePage}
                  title="People"
                  hideNavBar
                />
                <Scene
                  key="home"
                  icon={Tab}
                  iconName="home"
                  iosIconName="ios-home"
                  component={HomePage}
                  title="Home"
                  hideNavBar
                />
                <Scene
                  key="profile"
                  icon={Tab}
                  iconName="person"
                  iosIconName="ios-person"
                  component={ProfilePage}
                  title="Profile"
                  hideNavBar
                />
              </Scene>
            </Scene>
          </Router>
        </StyleProvider>
      </ApolloProvider>
    </Root>
  );
}

export default App;