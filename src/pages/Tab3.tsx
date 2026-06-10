import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';

import './Tab3.css';

const Tab3: React.FC = () => {
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
            <img alt="Avatar" src="https://avatars.githubusercontent.com/u/48026030?v=4" />
            <IonCardHeader>
                <IonCardTitle> Alan Javier Yandun</IonCardTitle>
                <IonCardTitle> alanjavieryandun </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Desarrollador de Software con experiencia en el desarrollo de aplicaciones web y móviles.
                  Apasionado por la tecnología y el aprendizaje continuo.
                  Siempre buscando nuevos desafíos y oportunidades para crecer profesionalmente.
              </p>
            </IonCardContent>
        </IonCard>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
