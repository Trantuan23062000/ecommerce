import { Login } from "../../../api/auth/login";
import toast from 'react-hot-toast'
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await Login({ email, password });
    if (response && response.data && response.data.EC === 0) {
      dispatch(loginSuccess(response.data.user, response.token));
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success(response.data.message);
    } else {
      dispatch(loginFailure(response.message || "Invalid response"));
      toast.error(response.data.message || "Invalid response");
    }
    return response; // Return response for further processing
  } catch (error) {
    console.error("Error logging in:", error);
    dispatch(loginFailure("An error occurred while logging in"));
    throw error; // Throw error for error handling in the component
  }
};


// authSelectors.js


const loginSuccess = (user, token) => ({
  type: "LOGIN_SUCCESS",
  payload: { user, token },
});


const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
