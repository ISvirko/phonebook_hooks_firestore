import authActions from "./authActions";
import db from "../../db/dbConfig";

// REGISTER

const register = ({ name, email, password }) => async (dispatch) => {
  dispatch(authActions.registerRequest());

  try {
    await db.auth.createUserWithEmailAndPassword(email, password);
    const user = await db.auth.currentUser;

    await user.updateProfile({
      displayName: name,
    });

    const currentUser = await db.auth.currentUser;

    dispatch(authActions.registerSuccess(currentUser));
  } catch (error) {
    dispatch(authActions.registerError(error.message));
  }
};

// LOGIN

const login = ({ email, password }) => async (dispatch) => {
  dispatch(authActions.loginRequest());

  try {
    await db.auth.signInWithEmailAndPassword(email, password);

    const user = await db.auth.currentUser;
    dispatch(authActions.loginSuccess(user));
  } catch (error) {
    dispatch(authActions.registerError(error.message));
  }
};

// LOGOUT

const logout = () => async (dispatch) => {
  dispatch(authActions.logoutRequest());

  try {
    await db.auth.signOut();

    dispatch(authActions.logoutSuccess());
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
  }
};

// GET CURRENT USER

const getCurrentUser = () => async (dispatch, getState) => {
  const { uid } = getState();
  if (!uid) return;

  dispatch(authActions.getCurrentUserRequest());

  try {
    await db.auth.onAuthStateChanged((user) => {
      user && dispatch(authActions.getCurrentUserSuccess(user));
    });
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

export default { register, login, logout, getCurrentUser };
