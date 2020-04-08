import { loginWithGoogle, signOutGoogle } from "../firebase";
import { retreiveFavouritesAction } from "./charsDuck";

//contants
const initialData = {
	loggedIn: false,
	fetching: false,
};

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const LOG_OUT = "LOG_OUT";

//reducers
export default function reducer(state = initialData, action) {
	switch (action.type) {
		case LOGIN:
			return { ...state, fetching: true };
		case LOGIN_SUCCESS:
			return { ...state, fetching: false, ...action.payload, loggedIn: true };
		case LOGIN_ERROR:
			return { ...state, fetching: false, error: action.payload };
		case LOG_OUT:
			return { ...initialData };
		default:
			return state;
	}
}

//aux
function saveStorage(user) {
	localStorage.user = JSON.stringify(user);
}

//action creators
export const logOutAction = () => (dispatch, getState) => {
	signOutGoogle();
	dispatch({
		type: LOG_OUT,
	});
	localStorage.removeItem("user");
};

export const restoreSessionAction = () => (dispatch) => {
	let user = localStorage.getItem("user");
	user = JSON.parse(user);

	if (user && user.user) {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: user.user,
		});
	}
};

export const doGoogleLoginAction = () => (dispatch, getState) => {
	dispatch({
		type: LOGIN,
	});
	return loginWithGoogle()
		.then((user) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: {
					uid: user.uid,
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
				},
			});
			saveStorage(getState());
			retreiveFavouritesAction()(dispatch, getState);
		})
		.catch((error) => {
			console.log(error);
			dispatch({
				type: LOGIN_ERROR,
				payload: error.message,
			});
		});
};
