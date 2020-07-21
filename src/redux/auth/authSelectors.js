const isAuth = (state) => state.auth.uid;

const getUserName = (state) => state.auth.user && state.auth.user.name;

const getError = (state) => state.auth.error;

const getLoading = (state) => state.auth.loading;

export default { isAuth, getUserName, getError, getLoading };
