import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  image,
  Modal,
} from "react-native";
import { Navigation } from "react-native-navigation";
import route from "./../Route/route";
import { Header } from "react-native-elements";
import navigation from "./../Styles/navigation";
import font from "./../Styles/font";
import color from "./../Styles/color";
import box from "./../Styles/box";
import { translate } from "../../Config/Language";
import { connect } from "react-redux";
import { actionfetchBooks } from "../../redux/actions/refreshAction";

class Detail extends Component {
  constructor(props) {
    super(props);
    console.log("props: ", props);

    this.state = {
      transObj: {},
    };
  }

  extractKey = ({ id }) => id;

  componentDidMount() {
    console.log("this.book_item: ", this.props.book_item);
    this.props.actionfetchBooks("");
      this.setState({ transObj: this.props.book_item });
    
  }


  render() {
    //    const { search } = this.state;

    return (
      <>
        <SafeAreaView style={styles.flexContent}>
          <StatusBar barStyle="dark-content" />

          <Header
            centerComponent={{
              text:
                this.props.type === "others"
                  ? translate("transaction_detail")
                  : "Securities Detail",
              style: [
                //navigation.navTitle,
                color.whiteBackground,
                font.bold,
                font.sizeLarge,
                color.linkColor,
                styles.addButtonStyle,
              ],
            }}
            containerStyle={[color.whiteBackground, navigation.headerContainer]}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Navigation.pop(this.props.componentId);
              }}
            >
              <Image
                style={styles.rightArrow}
                source={require("./../Assets/images/backArrow.png")}
              />
            </TouchableWithoutFeedback>
          </Header>

          <ScrollView>
            {this.props.type === "others" && (
              <View style={[styles.content]}>
                <View>
                  <Text
                    style={[color.headerText, font.semibold, font.sizeRegular]}
                  >
                    {this.state.transObj.title}{" "}
                  </Text>
                  <Text
                    style={[
                      color.linkColor,
                      font.regular,
                      font.sizeVeryRegular,
                      styles.topAlignment,
                    ]}
                  >
                    {this.state.transObj.author}
                  </Text>
                  
                    <View style={[styles.flexStyle, styles.topAlignment]}>
                      <Text
                        style={[
                          color.headerText,
                          font.semibold,
                          font.sizeVeryRegular,
                        ]}
                      >
                        {this.state.transObj.pageCount}
                      </Text>
                    </View>
                  
                </View>

                <View style={[styles.searchStyle]}>
                  <View
                    style={[
                      styles.flexDirection,
                      styles.flexStyle,
                      color.downBorderColor,
                      box.pickerBorder,
                      styles.bottomStyle,
                    ]}
                  >
                    <View>
                      <Text
                        style={[
                          color.headerText,
                          font.semibold,
                          font.sizeRegular,
                        ]}
                      >
                        Amount
                      </Text>
                          <Text
                            style={[
                              color.linkColor,
                              font.semibold,
                              font.sizeMedium,
                              styles.topAlignment,
                            ]}
                          >
                            {this.state.transObj.amount}
                          </Text>
                        
                    </View>
                    <View>
                      <Text
                        style={[
                          color.headerText,
                          font.semibold,
                          font.sizeRegular,
                        ]}
                      >
                        Published Date
                      </Text>
                      <Text
                        style={[
                          color.linkColor,
                          font.semibold,
                          font.sizeMedium,
                          styles.topAlignment,
                        ]}
                      >
                        {this.state.transObj.publishedDate}
                      </Text>
                    </View>
                  </View>
                  
                </View>

              </View>
            )}

            
          </ScrollView>
          
        </SafeAreaView>
      </>
    );
  }
}

// function which takes state object as input and asks to return it as props to our component
function mapStateToProps(state) {
  console.log("state1: ", state);
  return {
    canRefresh: state.canRefresh.refresher,
  };
}

export default connect(
  mapStateToProps,
  { actionfetchBooks }
)(Detail);

const styles = StyleSheet.create({
  content: { margin: 15 },
  rightArrow: { width: 20, height: 20 },
  flexContent: { flex: 1 },
  spacing: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 10,
  },
  bankImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 7,
    borderRadius: 50,
  },

  flexStyle: { flex: 1, flexDirection: "row" },
  searchIcon: {
    width: 23,
    height: 23,
    position: "absolute",
    top: 11,
    right: 8,
  },
  bottomStyle: { paddingBottom: 10 },
  topAlignment: { marginTop: 5 },
  leftStyle: { marginLeft: 10 },
  padding: { marginLeft: 10, marginTop: 5, height: 40 },
  searchStyle: { marginTop: 15 },
  flexDirection: { justifyContent: "space-between" },
  rightAlign: { marginTop: 3 },
  textAlign: { alignItems: "flex-end" },
  detailItem: {
    padding: 2,
    paddingTop: 25,
    paddingBottom: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  locationImage: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginRight: 5,
  },
  borderImage: { width: 20, height: 20, resizeMode: "contain", marginTop: 2 },
  arrowImage: { width: 25, height: 20, resizeMode: "contain" },
  leftContent: {
    maxWidth: "40%",
  },
  rightContent: {
    maxWidth: "60%",
  },
  checkboxAlign: { flex: 1, flexDirection: "row", marginLeft: 10 },
  rightStyle: { marginRight: 10 },
  space: { marginTop:20 }
}); 
