import React from "react";
import { connect } from "react-redux";

import {
	removeCharacterAction,
	addToFavouritesAction,
} from "../../redux/charsDuck";
import Card from "../card/Card";
import styles from "./home.module.css";

function Home({ characters, removeCharacterAction, addToFavouritesAction }) {
	function renderCharacter() {
		const character = characters[0];
		return (
			<Card
				leftClick={nextCharacter}
				rightClick={addFavourite}
				{...character}
			/>
		);
	}

	function nextCharacter() {
		removeCharacterAction();
	}

	function addFavourite() {
		addToFavouritesAction();
	}

	return (
		<div className={styles.container}>
			<h2>Personajes de Rick y Morty</h2>
			<div>{renderCharacter()}</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		characters: state.characters.array,
	};
}

export default connect(mapStateToProps, {
	removeCharacterAction,
	addToFavouritesAction,
})(Home);
