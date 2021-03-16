import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  BackHandler,
  Alert,
  ActivityIndicator,
  Modal,
  Keyboard,
} from "react-native";
import { Navigation } from "react-native-navigation";
import route from "./../Route/route";
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from "react-native-material-textfield";
import formStyle from "./../Styles/control";
import fontStyle from "./../Styles/font";
import colorStyle from "./../Styles/color";
import buttonStyle from "./../Styles/button";
import boxStyle from "./../Styles/box";
import CommonHelpers from "./../Utils/CommonHelper";
import Session from "./../config/Session";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Confirmation from "./../Modal/Confirmation";


global.userToken = "";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      spinner: false,
      appExitmodalVisible: false,
      userName: "",
    };
    this.emailRef = React.createRef();
    this.pwdRef = React.createRef();
    this.unsubscribe;
    this.onCloseModel = this.onCloseModel.bind(this);
    this.onOKClicked = this.onOKClicked.bind(this);
  }

  componentDidAppear = () => {
    console.log("appppppp");
    // add back listener
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  };

  componentDidDisappear = () => {
    // remove back listener
    this.backHandler.remove();
  };

  // App Exit popup
  backAction = () => {
    this.setState({
      appExitmodalVisible: true,
    });
    return true;
  };

  onOKClicked = () => {
    this.setState({
      appExitmodalVisible: false,
    });
    BackHandler.exitApp();
  };

  onCloseModel = () => {
    this.setState({
      appExitmodalVisible: false,
    });
  };

  gotoRegister = () => {
    Keyboard.dismiss();

    Navigation.push(this.props.componentId, {
      component: {
        name: "Register",
        options: {
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      },
    });
  };
  gotohome = () => {
    Keyboard.dismiss();

    Navigation.push(this.props.componentId, {
      component: {
        name: "Home",
        options: {
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      },
    });
  };


  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;

    // to remove error red line
    state["emailError"] = false;
    state["passwordError"] = false;
    this.setState(state);
  };

  // Method to show/hide password and eye icon changes
  showOrHidePassword = () => {
    if (this.state.showHidePwd) {
      this.setState({ showHidePwd: false });
      this.setState({ pwdEye: "eye-slash" });
    } else {
      this.setState({ showHidePwd: true });
      this.setState({ pwdEye: "eye" });
    }
  };

  // Method to validate login form data
  validateLoginData = async () => {
    Keyboard.dismiss();

    if (this.state.email == "") {
      CommonHelpers.showFlashMsg("enterEmail", "danger");
      this.setState({ emailError: true });
    } else if (!CommonHelpers.validateEmail(this.state.email)) {
      CommonHelpers.showFlashMsg("validEmail", "danger");
      this.setState({ emailError: true });
    } else if (this.state.password == "") {
      CommonHelpers.showFlashMsg("enterPassword", "danger");
      this.setState({ passwordError: true });
    } else {
     
      this.getPlayerData();
    }
  };

  getPlayerData = async () => {
    if ((await Session.getUserName()) === null)    
       CommonHelpers.showFlashMsg("User Doesn't Exist,please register", "danger");

    else{
      var userid=await Session.getUserName()
      var pswd= await Session.getPassword()
      if(userid == this.state.email&& pswd ==this.state.password )
      this.gotohome();}
  };



  resetFormElements = () => {
    this.emailRef.setValue("");
    this.pwdRef.setValue("");
    this.setState({
      email: "",
      password: "",
    });
  };


  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={boxStyle.container}>

          <KeyboardAwareScrollView
            contentContainerStyle={boxStyle.scrollViewCenter}
            keyboardShouldPersistTaps="always"
          >
            <View style={[boxStyle.centerBox, colorStyle.whiteBackground]}>
              <View>
                <View style={formStyle.formMargin}>
                  <Text
                    style={[
                      fontStyle.regular,
                      fontStyle.sizeLarge,
                      colorStyle.grayColor,
                    ]}
                  >
                    Login
                  </Text>
                </View>
                <View style={formStyle.formMargin}>
                  <FilledTextField
                    label="email address"
                    keyboardType="email-address"
                    ref={(input) => {
                      this.emailRef = input;
                    }}
                    value={this.state.email}
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      this.pwdRef.focus();
                    }}
                    blurOnSubmit={true}
                    onChangeText={(val) => this.updateInputVal(val, "email")}
                    tintColor={this.state.emailError ? "#ff0000" : "#55A1B1"}
                    baseColor={this.state.emailError ? "#ff0000" : "#999999"}
                    textColor="#999999"
                    inputContainerStyle={colorStyle.inputBackground}
                    labelTextStyle={fontStyle.regular}
                    titleTextStyle={fontStyle.semibold}
                    affixTextStyle={fontStyle.semibold}
                    contentInset={{
                      top: 12,
                      label: 10,
                      input: 12,
                    }}
                  />
                </View>

                <View style={formStyle.formMargin}>
                  <FilledTextField
                    label="password"
                    value={this.state.password}
                    ref={(input) => {
                      this.pwdRef = input;
                    }}
                    onChangeText={(val) => this.updateInputVal(val, "password")}
                    secureTextEntry={!this.state.showHidePwd}
                    blurOnSubmit={true}
                    tintColor={this.state.passwordError ? "#ff0000" : "#55A1B1"}
                    baseColor={this.state.passwordError ? "#ff0000" : "#999999"}
                    textColor="#999999"
                    inputContainerStyle={[
                      colorStyle.inputBackground,
                      fontStyle.regular,
                    ]}
                    labelTextStyle={fontStyle.regular}
                    titleTextStyle={fontStyle.semibold}
                    affixTextStyle={fontStyle.semibold}
                    contentInset={{
                      top: 12,
                      label: 10,
                      input: 12,
                    }}
                  />
                </View>

                <View style={formStyle.formButton}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.validateLoginData();
                      // Navigation.setRoot({
                      //   root: route.afterLogin,
                      // });

                      // route.setTabData();
                      // Navigation.setRoot({
                      //   root: route.afterLogin,
                      // });
                    }}
                  >
                    <Text
                      style={[
                        fontStyle.semibold,
                        fontStyle.sizeMedium,
                        colorStyle.linkColor,
                        colorStyle.linkBorderColor,
                        buttonStyle.default,
                        styles.loginButtonWidth,
                      ]}
                    >
                      Login
                    </Text>
                  </TouchableWithoutFeedback>
                </View>

                <View style={[formStyle.formButton, styles.signupText]}>
                  <TouchableWithoutFeedback onPress={this.gotoRegister}>
                    <Text
                      style={[
                        fontStyle.regular,
                        fontStyle.sizeRegular,
                        colorStyle.darkgrayColor,
                      ]}
                    >
                      new user?

                      <Text style={[colorStyle.linkColor]}>
                        {' '}signup
                      </Text>
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.appExitmodalVisible}
            onRequestClose={() => {
              this.onCloseModel();
            }}
            // onDismiss={() => this.gotoLogin()}
          >
            <Confirmation
              modalMsg={"Are you sure you wanna exit?"}
              onCancel={this.onCloseModel}
              onOk={this.onOKClicked}
            />
          </Modal>
          {this.state.spinner && <Spinner />}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  logoStyle: {
    width: "60%",
    resizeMode: "contain",
    marginLeft: "20%",
    marginBottom: 40,
    marginTop: 20,
  },
  forgotLink: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 20,
  },
  forgotLinkText: {
    textAlign: "right",
  },
  loginButtonWidth: {
    width: 100,
  },
  signupText: {
    marginTop: 20,
    marginBottom: 20,
  },
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 50,
  },
  offlineText: { color: "#fff", fontSize: 20, textAlign: "center" },
});
