import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader, IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader, IonIcon,
    IonPage, IonText,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';

import './Tab3.css';
import React from "react";
import {GithubUser} from "../interfaces/GithubUser";
import {getUserInfo} from "../services/GithubService";
import LoadingSpinner from "../components/LoadingSpinner";
import AuthService from "../services/AuthService";
import {logOutOutline} from "ionicons/icons";
import {useHistory} from "react-router";


const Tab3: React.FC = () => {
    const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const history = useHistory();

    const loadUserInfo = async () => {
        setLoading(true);
        getUserInfo()
            .then((userData) => setUserInfo(userData))
            .catch((error) => setErrorMsg("error al abtener informacion del usuario." + error.message))
            .finally(() => setLoading(false));
    };

    const handleLogout = () => {
        AuthService.Logout();
        history.push("/login");
    }

    useIonViewWillEnter(() => {
        loadUserInfo();
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil del Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
          <div className="card-container">
              {userInfo && (<IonCard className="card">
                  <img alt={userInfo?.name} src={userInfo?.avatar_url}/>
                  <IonCardHeader>
                      <IonCardTitle> {userInfo?.name} </IonCardTitle>
                      <IonCardSubtitle> {userInfo?.login} </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                      <p>
                          {userInfo?.bio}
                      </p>
                  </IonCardContent>
              </IonCard>
              )}
              <IonButton expand="block" color="danger" onClick={handleLogout}>
                  <IonIcon slot="start" icon={logOutOutline}>

                  </IonIcon>
                  salir

              </IonButton>
          </div>

          {errorMsg && <IonText color="danger">{errorMsg}</IonText>}
        <LoadingSpinner isOpen={loading} />

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
