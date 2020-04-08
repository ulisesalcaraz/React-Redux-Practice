import React from "react";
import { connect } from "react-redux";
import styles from "./favs.module.css";
import Card from "../card/Card";

function FavPage({ characters = [0] }) {
	function renderCharacter(char, i) {
		return <Card hide {...char} key={i} />;
	}
	return (
		<div className={styles.container}>
			<h2>Favoritos</h2>
			{characters.map(renderCharacter)}
			{!characters.length && <h3>No hay personajes agregados</h3>}
		</div>
	);
}

function mapStateToProps({ characters }) {
	return {
		characters: characters.favourites,
	};
}

export default connect(mapStateToProps)(FavPage);
