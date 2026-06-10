import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab1.css';
import RepoItem from "../components/RepoItem";

const Tab1: React.FC = () => {
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

        <IonList>
            <RepoItem name="Repositorio 1" description="Descripción del repositorio 1" language="JavaScript" avatarUrl="https://avatars.githubusercontent.com/u/48026030?v=4" />
            <RepoItem name="Repositorio 2" description="Descripción del repositorio 2" language="Python" avatarUrl="https://avatars.githubusercontent.com/u/48026030?v=4" />
            <RepoItem name="Repositorio 3" description="Descripción del repositorio 3" language="Java" avatarUrl="https://avatars.githubusercontent.com/u/48026030?v=4" />
            <RepoItem name="Repositorio 4" description="Descripción del repositorio 4" language="C++" avatarUrl="https://avatars.githubusercontent.com/u/48026030?v=4" />
            <RepoItem name="Repositorio 5" description="Descripción del repositorio 5" language="Ruby" avatarUrl="https://avatars.githubusercontent.com/u/48026030?v=4" />
        </IonList>


      </IonContent>
    </IonPage>
  );
};

export default Tab1;
