import {
    IonCard,
    IonCardContent,
    IonCardHeader, IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';

import './Tab3.css';
import React from "react";
import {GithubUser} from "../interfaces/GithubUser";
import {getUserInfo} from "../services/GithubService";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab3: React.FC = () => {
    const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
    const [loading, setLoading] = React.useState(false);

    const loadUserInfo = async () => {
        setLoading(true);
        const userData = await getUserInfo();
        setUserInfo(userData);
        setLoading(false);
    };
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
        <IonCard className="card">
            <img alt={userInfo?.name} src={userInfo?.avatar_url} />
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
        </div>
        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
