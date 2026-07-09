import "./Login.css";
import React, { useState } from "react";
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    IonSpinner
} from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import AuthService from "../services/AuthService";
import { getUserInfo } from "../services/GithubService";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMsg("");

        if (username.trim() === "" || token.trim() === "") {
            setErrorMsg("Por favor, ingresa tu nombre de usuario y token.");
            return;
        }

        setLoading(true);

        AuthService.login(username, token);

        try {

            await getUserInfo();
            window.location.href = "/tab1";
        } catch (error) {
            AuthService.Logout();
            setErrorMsg("Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inicia Sesion</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Inicia Sesion</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <div className="login-container">
                    <form className="login-form" onSubmit={handleLogin}>
                        <IonIcon icon={logoGithub} className="github-icon" />

                        <IonInput
                            className="login-field"
                            label="Nombre de Usuario"
                            labelPlacement="floating"
                            fill="outline"
                            type="text"
                            value={username}
                            onIonChange={(e) => setUsername(e.detail.value!)}
                        />

                        <IonInput
                            className="login-field"
                            label="Contraseña / Token PAT"
                            labelPlacement="floating"
                            fill="outline"
                            type="password"
                            value={token}
                            onIonChange={(e) => setToken(e.detail.value!)}
                        />

                        {errorMsg !== "" && <IonText color="danger"><p>{errorMsg}</p></IonText>}

                        <IonButton
                            className="login-button"
                            expand="block"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <IonSpinner name="crescent" /> : "Iniciar Sesion"}
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Login;