import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { doGoogleLoginAction, logOutAction } from "../../redux/userDuck";

function LoginPage({ fetching, loggedIn, doGoogleLoginAction, logOutAction }) {
	function doLogin() {
		doGoogleLoginAction();
	}
	if (fetching) return <h2>Cargando...</h2>;

	function logOut() {
		logOutAction();
	}
	return (
		<div className={styles.container}>
			{loggedIn ? (
				<>
					<h1>Cierra tu sesión</h1>
					<button onClick={logOut}>Cerrar Sesión</button>
				</>
			) : (
				<>
					<h1>Inicia Sesión con Google</h1>
					<button onClick={doLogin}>Iniciar</button>
				</>
			)}
		</div>
	);
}

function mapStateToProps({ user: { fetching, loggedIn } }) {
	return {
		fetching,
		loggedIn,
	};
}

export default connect(mapStateToProps, { doGoogleLoginAction, logOutAction })(
	LoginPage
);
