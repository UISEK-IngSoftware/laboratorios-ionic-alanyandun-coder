import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';

import './Tab2.css';
import {useHistory} from "react-router";
import {RepositoryPayload} from "../interfaces/RepositoryPayload";
import {createRepository} from "../services/GithubService";
import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab2: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const repoFormData: RepositoryPayload = {
        name: '',
        description: '',
    };
    const setFormName = (value: string) => {
        repoFormData.name = value;
    };
    const setFormDescription = (value: string) => {
        repoFormData.description = value;
    };

    const saveRepository = () => {
        if (repoFormData.name.trim() ==='') {
            setErrorMsg("El nombre del repositorio es obligatorio");
            return;
        }
        setLoading(true);
        createRepository(repoFormData).then((newRepo) => {
            if (newRepo) {
                setFormName("");
                setFormDescription("");
                history.push("/tab1");
            }

        }).catch((error) => {
            console.error('Error al crear el repositorio:', error);
            setErrorMsg(" Ocurrio un Error al crear el repositorio");
        }).finally(() => {
            setLoading(false);
        });
    }
    useIonViewWillEnter(() => {
        setErrorMsg("");

    })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de  Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
            <IonInput
                className="form-field"
                label="Nombre del Repositorio"
                labelPlacement="floating"
                placeholder="Ingrese el nombre del Repositorio"
                value={repoFormData.name}
                onIonChange={(e) => setFormName(e.detail.value!)}
            />

            <IonTextarea
                className="form-field"
                label="Descripcion"
                labelPlacement="floating"
                placeholder="Ingrese la description de Repositorio"
                rows={6}
                value={repoFormData.description}
                onIonChange={(e) => setFormDescription(e.detail.value!)}
            />
            {errorMsg !== "" && <div className="error-message">{errorMsg}</div>}


            <IonButton
                className="form-field"
                expand="block"
                fill={"solid"}
                onClick={saveRepository}
            >
                Guardar
            </IonButton>
        </div>
        <LoadingSpinner isOpen={loading} />

      </IonContent>
    </IonPage>
  );
};

export default Tab2;

