import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
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

    const loadRepositories = async () => {
        setLoading(true);
        const reposData = await fetchRepositories();
        setRepos(reposData);
        setLoading(false);
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
      <IonContent fullscreen>
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
          {!loading && repos.length === 0 && (
            <p>No se encontraron repositorios.</p>
          )}


      </IonContent>
    </IonPage>
  );
};

export default Tab1;
