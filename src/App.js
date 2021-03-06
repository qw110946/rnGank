import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";

import { Console } from "~/common/util";
import i18n from "~/common/i18n";
import theme from "~/common/theme";

import StackNavigator from "./navigations/stackNavigator";
import * as userSettingAction from "./logics/userSetting/action";

const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  }
});

class rnGank extends Component {
  constructor(props) {
    super(props);
    const { userSettingLocalLoad } = this.props;

    // 加载本地设置
    userSettingLocalLoad();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.userSettingLocalLoad) {
      SplashScreen.hide();
    }
  }

  render() {
    const { mainColor, languge } = this.props;

    return (
      <View style={styles.container}>
        <StackNavigator
          onNavigationStateChange={(p, c) => {
            const prevRouteName = p.routes[p.index].routeName;
            const currRouteName = c.routes[c.index].routeName;
            if (prevRouteName !== currRouteName) {
              Console.log(prevRouteName, " --> ", currRouteName);
            }
          }}
          screenProps={{
            mainColor,
            i18n,
            theme
          }}
        />
      </View>
    );
  }
}

export default connect(
  ({ userSetting }) => {
    return {
      mainColor: userSetting.mainColor,
      languge: userSetting.languge,
      userSettingLocalLoad: userSetting.localLoad
    };
  },
  {
    ...userSettingAction
  }
)(rnGank);
