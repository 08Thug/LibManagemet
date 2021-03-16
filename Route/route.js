import Home from "../Components/Home"
import Login from "../Components/Login"
import Register from "../Components/Register"
import Detail from "../Components/Detail"
// import Session from "../config/Session"
import {Navigation} from "react-native-navigation"

Navigation.registerComponentWithRedux("Home", () => Home);
Navigation.registerComponent("Login", () => Login);
Navigation.registerComponent("Register", () => Register);
Navigation.registerComponentWithRedux("Detail", () => Detail);

const beforeLogin = {
    stack: {
      children: [
        {
          component: {
            name: "Login",
          },
        },
      ],
    },
  };
  const afterLogin = {
    stack: {
      children: [
        {
          component: {
            name: "Home",
          },
        },
      ],
    },
  };
  export default (route = {
    afterLogin: afterLogin,
    beforeLogin: beforeLogin
  })