import "./Login.css"
import React, {useState} from "react"
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {logoGithub} from "ionicons/icons";
import AuthService from "../services/AuthService";
const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMsg("");
        if (username.trim() === "" || token.trim() === "") {
            setErrorMsg("Por favor, ingresa tu nombre de usuario y token.");
            return;
        }

        if (AuthService.login(username, token)) {
            window.location.href = "/tab1";
        } else {
            setErrorMsg("Error al iniciar sesion.");
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

                <div className="login-container" onSubmit={handleLogin}>
                    <form className="login-form">
                        <IonIcon icon ={logoGithub} className="github-icon" />

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
                            label="Contraseña"
                            labelPlacement="floating"
                            fill="outline"
                            type="password"
                            value={token}
                            onIonChange={(e) => setToken(e.detail.value!)}
                        />

                        {errorMsg !=="" && <IonText color="danger">{errorMsg}</IonText>}

                        <IonButton
                            className="login-button"
                            expand="block"
                            type="submit"
                        >
                            Iniciar Sesion
                        </IonButton>


                    </form>
                </div>

            </IonContent>
        </IonPage>
    )

    }
    export default Login;
