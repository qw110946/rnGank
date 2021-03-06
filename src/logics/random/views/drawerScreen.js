import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
// import Immutable from 'immutable';
import i18n from "~/common/i18n";
import theme from "~/common/theme";
import theme2 from "/common/theme";
import ScrollableTabView from "~/components/ScrollableTabView";
import DrawerNavigateHeader from "~/components/drawerNavigateHeader";
import moduleName from "@/common/theme";
import { gankio } from "~/common/Api";
import RandomFlatList from "./randomFlatList";
// import { propsDiff } from "../../selector";

class RandomDrawer extends Component {
  static navigationOptions = ({ navigation, screenProps: { i18n } }) => ({
    drawerLabel: i18n.randomRecommendation,
    drawerIcon: ({ focused, tintColor }) => (
      <Icon
        name="md-infinite"
        type="ionicon"
        color={focused ? tintColor : "#000"}
      />
    )
  });

  constructor() {
    super();

    // i18n -> gankio.type
    this.dataType = {
      all: "ALL",
      welfare: "FULI",
      android: "ANDROID",
      ios: "IOS",
      leisureVideo: "LEISUREVIDEO",
      expand: "EXPAND",
      web: "WEB",
      blindRecommend: "BLINDRECOMMEND",
      app: "APP"
    };
    this.state = {
      TabTitles: Object.keys(this.dataType)
    };
  }

  // shouldComponentUpdate(nextProps) {
  //   return propsDiff(this.props, nextProps)
  // }

  tabContent() {
    const { TabTitles } = this.state;
    const { navigation } = this.props;

    return TabTitles.map((v, i) => {
      return (
        <RandomFlatList
          key={i}
          dataType={this.dataType[v]}
          dataGankType={gankio.type[this.dataType[v]]}
          tabLabel={i18n[v]}
          navigation={navigation}
        />
      );
    });
  }

  render() {
    const { mainColor, bgColor, navigation } = this.props;

    return (
      <View style={[styles.container, theme.background]}>
        <DrawerNavigateHeader
          title={i18n.randomRecommendation}
          navigation={navigation}
          style={[{ backgroundColor: mainColor }, theme.headerStyle]}
        />
        <ScrollableTabView style={styles.tabView} mainColor={mainColor}>
          {this.tabContent()}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabView: {
    backgroundColor: "transparent"
  }
});

export default connect(({ userSetting }) => {
  return {
    mainColor: userSetting.mainColor,
    bgColor: userSetting.bgColor
    // data: random,
  };
})(RandomDrawer);
