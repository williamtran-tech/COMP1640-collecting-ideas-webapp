export const emailValidator = email => {
    if (!email) {
        console.log("Email is required")
        alert("Email is required")
      return false;
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        console.log("Incorrect email format")
        alert("Incorrect email format")
      return false;
    }
    return true;
  };
export const passwordValidator = password => {
    if (!password) {
        console.log("Password is required")
        alert("Password is required")
    return false;
    } else if (password.length < 8) {
        console.log("Password must have a minimum 8 characters")
        alert("Password must have a minimum 8 characters")
    return false;
    }
    return true;
};
  