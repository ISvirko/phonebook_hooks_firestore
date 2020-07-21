const isAuth = (state) => state.auth.uid;

const getUserName = (state) => state.auth.user && state.auth.user.name;

const getError = (state) => state.auth.error;

export default { isAuth, getUserName, getError };
