const isAuth = (state) => state.uid;

const getUserName = (state) => state.auth.user && state.auth.user.name;

export default { isAuth, getUserName };
