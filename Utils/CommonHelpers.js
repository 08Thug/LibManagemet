import Snackbar from "react-native-snackbar";

const CommonHelpers = {
  /**
   * To check whether email is valid or not
   * @param email - Email id that needs to be checked
   */
  validateEmail: (email) => {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailPattern.test(email)) {
      return true;
    } else {
      return false;
    }
  },

  validateName: (name) => {
    var namePattern = /^[a-zA-Z_ ]*$/;
    if (namePattern.test(name)) {
      return true;
    } else {
      return false;
    }
  },

  validatePassword: (password) => {
    var passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,}/;
    if (passwordPattern.test(password)) {
      return true;
    } else {
      return false;
    }
  },

  validatePhoneNumber: (phone) => {
    var phonePattern = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    if (phonePattern.test(phone)) {
      return true;
    } else {
      return false;
    }
  },

  /* Method to show messages */
  showFlashMsg(msg, type) {
    console.warn("testing testing");
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
      textColor: "#fff",
      fontFamily: "Montserrat-SemiBold",
      backgroundColor: type == "danger" ? "red" : "green",
    });
  },

  /* Method to check if JSON object is empty */
  isEmptyObject(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  },

};
export default CommonHelpers;
