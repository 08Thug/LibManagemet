// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

// import {AppRegistry} from 'react-native';
import { Navigation } from "react-native-navigation";
// import App from './App';
import Home from './Components/Home'
import route from "./Route/route"
import Session from "./config/Session"
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
    },
    bottomTab: {
      fontSize: 12,
      selectedFontSize: 12,
      textColor: "#c3c3c3",
      selectedTextColor: "#ffffff",
      fontFamily: "Montserrat-SemiBold",
    },
    bottomTabs: {
      backgroundColor: "#307EA0",
      titleDisplayMode: "alwaysShow",
    },
    // animations: {
    //   push: {
    //     enabled: false,
    //   },
    // },

  });
  this.navigationLogic();
});

navigationLogic = async () => {

  const userData = await Session.getusername();
  if(userData == null)
  Navigation.setRoot({
    root: route.beforeLogin,
  });
  else
  Navigation.setRoot({
            root: route.afterLogin,
          });
}
