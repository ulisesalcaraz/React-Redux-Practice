import axios from "axios";
import { updateDB, getFavourites } from "../firebase";

//contants
const initialData = {
	fetching: false,
	array: [],
	favourites: [],
};

const URL = "https://rickandmortyapi.com/api/character";

const GET_CHARACTERS = "GET_CHARACTERS";

const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";

const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

const REMOVE_CHARACTER = "REMOVE_CHARACTER";

const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";

const GET_FAVS = "GET_FAVS";
const GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";
const GET_FAVS_ERROR = "GET_FAVS_ERROR";

//reducers
export default function reducer(state = initialData, action) {
	switch (action.type) {
		case GET_FAVS:
			return { ...state, fetching: true };

		case GET_FAVS_SUCCESS:
			return { ...state, fetching: false, favourites: action.payload };

		case GET_FAVS_ERROR:
			return { ...state, fetching: false, error: action.payload };

		case REMOVE_CHARACTER:
			return { ...state, array: action.payload };

		case ADD_TO_FAVOURITES:
			return { ...state, ...action.payload };

		case GET_CHARACTERS:
			return { ...state, fetching: true };

		case GET_CHARACTERS_ERROR:
			return { ...state, fetching: false, error: action.payload };

		case GET_CHARACTERS_SUCCESS:
			return { ...state, fetching: false, array: action.payload };

		default:
			return state;
	}
}

//action creators
export const retreiveFavouritesAction = () => (dispatch, getState) => {
	dispatch({
		type: GET_FAVS,
	});
	let { uid } = getState().user;
	return getFavourites(uid)
		.then((array) => {
			dispatch({
				type: GET_FAVS_SUCCESS,
				payload: [...array],
			});
		})
		.catch((error) => {
			console.log(error);
			dispatch({
				type: GET_FAVS_ERROR,
				payload: error.message,
			});
		});
};

export const addToFavouritesAction = () => (dispatch, getState) => {
	const { array, favourites } = getState().characters;
	const { uid } = getState().user;
	const character = array.shift();
	favourites.push(character);
	updateDB(favourites, uid);
	dispatch({
		type: ADD_TO_FAVOURITES,
		payload: {
			array: [...array],
			favourites: [...favourites],
		},
	});
};

export const removeCharacterAction = () => (dispatch, getState) => {
	const { array } = getState().characters;

	array.shift();

	dispatch({
		type: REMOVE_CHARACTER,
		payload: [...array],
	});
};

export const getCharactersAction = () => (dispatch, getState) => {
	dispatch({
		type: GET_CHARACTERS,
	});
	return axios
		.get(URL)
		.then((res) => {
			dispatch({
				type: GET_CHARACTERS_SUCCESS,
				payload: res.data.results,
			});
		})
		.catch((error) => {
			console.log(error);
			dispatch({
				type: GET_CHARACTERS_ERROR,
				payload: error.response.message,
			});
		});
};
