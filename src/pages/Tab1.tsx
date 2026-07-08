import {
    IonContent,
    IonHeader,
    IonList,
    IonPage, IonText,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './Tab1.css';
import React from "react";
import {Repository} from "../interfaces/Repository";
import {fetchRepositories} from "../services/GithubService";
import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab1: React.FC = () => {
    const [repos, setRepos] = React.useState<Repository[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const loadRepositories = async () => {
        setLoading(true);
        fetchRepositories()
            .then((reposData) => setRepos(reposData))
            .catch((error) => setErrorMsg(error.message))
            .finally(() => setLoading(false));
    };

    useIonViewWillEnter(() => {
        loadRepositories();
    });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
          {!loading && repos.length > 0 && (

        <IonList>
            {repos.map((repo)=> (
                <RepoItem key={repo.id} {...repo} />
            ))
            }

        </IonList>
          )}
          <LoadingSpinner isOpen={loading} />
            {errorMsg !== "" && (<IonText color="danger">{errorMsg}</IonText>)}



      </IonContent>
    </IonPage>
  );
};

export default Tab1;
