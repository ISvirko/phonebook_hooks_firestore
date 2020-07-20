import authSlice from "./authSlice";
import db from "../../db/dbConfig";

// REGISTER

const register = ({ name, email, password }) => async (dispatch) => {
  dispatch(authSlice.loading.actions.registerRequest());

  try {
    await db.auth.createUserWithEmailAndPassword(email, password);
    const user = await db.auth.currentUser;

    await user.updateProfile({
      displayName: name,
    });

    const currentUser = await db.auth.currentUser;

    dispatch(authSlice.user.actions.registerSuccess(currentUser));
  } catch (error) {
    dispatch(authSlice.error.actions.registerError(error.message));
  }
};

// LOGIN

const login = ({ email, password }) => async (dispatch) => {
  dispatch(authSlice.loading.actions.loginRequest());

  try {
    await db.auth.signInWithEmailAndPassword(email, password);

    const user = await db.auth.currentUser;
    dispatch(authSlice.user.actions.loginSuccess(user));
  } catch (error) {
    dispatch(authSlice.error.actions.registerError(error.message));
  }
};

// LOGOUT

const logout = () => async (dispatch) => {
  dispatch(authSlice.loading.actions.logoutRequest());

  try {
    await db.auth.signOut();

    dispatch(authSlice.user.actions.logoutSuccess());
  } catch (error) {
    dispatch(authSlice.error.actions.logoutError(error.message));
  }
};

// GET CURRENT USER

const getCurrentUser = () => async (dispatch, getState) => {
  const { uid } = getState();
  if (!uid) return;

  dispatch(authSlice.loading.actions.getCurrentUserRequest());

  try {
    await db.auth.onAuthStateChanged((user) => {
      user && dispatch(authSlice.user.actions.getCurrentUserSuccess(user));
    });
  } catch (error) {
    dispatch(authSlice.error.actions.getCurrentUserError(error.message));
  }
};

export default { register, login, logout, getCurrentUser };
