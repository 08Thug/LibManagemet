
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from "react-native";
import color from "./../Styles/color";
import {
    getBookListAPI,
} from "./../Rest/BookAPI";
import CommonHelpers from "./../Utils/CommonHelper";
import { Header } from "react-native-elements";
import navigation from "../../Styles/navigation";
import font from "./../Styles/font";
import button from "./../Styles/button";
import box from "./../Styles/box";
import { translate } from "./../Config/Language";
import route from "./../Route/route";
import { Navigation } from "react-native-navigation";
import image from "./../Styles/image";
import { connect } from "react-redux";
import { actionfetchBooks } from "./../Redux/actions/refreshactions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.page_title = "";
    this.page = 0;
    this.offset = 10;
    this.state = {
      bookList: [],
      page: 0,
      hasNextPage: false,
      isLoadMore: false,
    };

  }

  componentDidMount() {
    this.props.actionfetchBooks("");
    this.apiCallBookList();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("Book list props", nextProps.canRefresh);
    if (nextProps.canRefresh === "book_added") {
      this.setState({ bookList: [] });
      this.apiCallBookList();
    }
  }

  componentWillUpdate() {
    console.log("w", this.props);
  }

  extractKey = ({ id }) => {
    id;
    console.log("id: ", id);
  };

  // Bill list 
  apiCallBookList = () => {
    
      getBookListAPI().then(
      (result) => {
        if (result.status) {
          console.log("this.state.page: ", this.state.page);
           this.setState({ bookList: [] });
          this.setState({
            bookList:
              this.state.page === 0
                ? result.dataArray
                : [...this.state.bookList, ...result.dataArray],
          });
        //   this.setState({ hasNextPage: result.return_id });
        } else {
          
            CommonHelpers.showFlashMsg(result.message, "danger");
        }
        
      }
    );
  };

  openBookDetail = (item) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Detail",
        passProps: {
          book_item: item,
        },
        options: {
          bottomTabs: {
            visible: false,
            animate: false,
          },
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      },
    });
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.openBookDetail(item);
        }}
      >
        <View style={[color.settingsButtonBorder, styles.dueItem]}>
        <Image
            source={{uri:item.image}}
            style={[styles.bookImage, image.imageContain]}
            />
          <View style={[styles.leftContent]}>
            <Text style={[font.semibold, font.sizeRegular, color.linkColor]}>
              {item.book_name}
            </Text>

          </View>
        </View>
      </TouchableOpacity>
    );
  };

//   renderFooter = () => {
//     //it will show indicator at the bottom of the list when data is loading otherwise it returns null
//     if (!this.state.isLoadMore) return null;
//     return <ActivityIndicator style={{ color: "#000" }} />;
//   };

  render() {
    return (
      <>
        
        <SafeAreaView style={styles.flexContent}>
          <Header
            centerComponent={{
              text: this.page_title,
              style: [
                // navigation.navTitle,
                color.linkColor,
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

        
          {this.state.bookList.length > 0 && (
            <View style={[styles.accountsList]}>
              <FlatList
                style={[
                  box.shadow_box,
                //  styles.accountsList,
                  color.whiteBackground,
                ]}
                data={this.state.bookList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => item._id}
                extraData={this.state}
                // onEndReached={this.loadMoreRandomData.bind(this)}
                onEndReachedThreshold={0.5}
                // ListFooterComponent={this.renderFooter.bind(this)}
              />
            </View>
          )}
          { this.state.bookList.length == 0 && (
            <View style={[styles.dataStyle]}>
              <Text style={[font.sizeLarge, font.semibold, color.linkColor]}>
                No data found
              </Text>
            </View>
          )}
          
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
)(Home);

const styles = StyleSheet.create({
  flexContent: { flex: 1 },
  rightArrow: { width: 20, height: 20 },
  accountsList: {marginLeft:10,marginRight:10,marginBottom:10,flex:1,marginTop:10, paddingRight: 10, paddingLeft: 10, },

  leftContent: { alignItems: "flex-start", flexGrow: 1, flex: 1, paddingLeft: 5,marginLeft: 15},

  dueItem: {
    padding: 2, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, flexDirection: "row",
    alignItems: "center", justifyContent: "space-between",
  },
  addButtonStyle: { flexWrap: "wrap" },
  bookImage: { width: 75, height: 55, marginLeft: 5 },

});
