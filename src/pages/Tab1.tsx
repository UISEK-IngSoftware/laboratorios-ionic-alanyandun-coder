import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
    IonToast,
    IonAlert
} from '@ionic/react';
import './Tab1.css';
import React, { useState } from "react";
import { Repository } from "../interfaces/Repository";
import { fetchRepositories, deleteRepository, editRepository } from "../services/GithubService";
import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab1: React.FC = () => {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [toastMsg, setToastMsg] = useState("");


    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [repoToDelete, setRepoToDelete] = useState<Repository | null>(null);

    const loadRepositories = async () => {
        setLoading(true);
        setErrorMsg("");
        try {
            const reposData = await fetchRepositories();
            setRepos(reposData);
        } catch (error: any) {
            setErrorMsg(error.message || "Error al cargar repositorios");
        } finally {
            setLoading(false);
        }
    };

    useIonViewWillEnter(() => {
        loadRepositories();
    });

    const handleEdit = async (repo: Repository) => {
        const newDescription = prompt("Nueva descripción para el repositorio:", repo.description || "");
        if (newDescription !== null && newDescription !== repo.description) {
            setLoading(true);
            try {
                await editRepository(repo.owner.login, repo.name, { description: newDescription });
                setToastMsg(`Repositorio ${repo.name} actualizado`);
                await loadRepositories(); // Refresca la lista
            } catch (error: any) {
                setErrorMsg(error.message || "Error al editar");
            } finally {
                setLoading(false);
            }
        }
    };


    const confirmDelete = (repo: Repository) => {
        setRepoToDelete(repo);
        setShowDeleteAlert(true);
    };


    const performDelete = async () => {
        if (!repoToDelete) return;

        setLoading(true);
        try {
            await deleteRepository(repoToDelete.owner.login, repoToDelete.name);

            setRepos(repos.filter(r => r.id !== repoToDelete.id));
            setToastMsg(`Repositorio ${repoToDelete.name} eliminado`);
        } catch (error: any) {
            setErrorMsg(error.message || "Error al eliminar. Revisa los permisos de Delete en tu Token.");
        } finally {
            setLoading(false);
            setShowDeleteAlert(false);
            setRepoToDelete(null); // Limpiamos el estado
        }
    };

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

                {errorMsg !== "" && (<IonText color="danger"><p>{errorMsg}</p></IonText>)}

                {!loading && repos.length > 0 && (
                    <IonList>
                        {repos.map((repo) => (
                            <RepoItem
                                key={repo.id}
                                {...repo}
                                onEdit={handleEdit}
                                onDelete={confirmDelete} // Pasamos la nueva función aquí
                            />
                        ))}
                    </IonList>
                )}

                <LoadingSpinner isOpen={loading} />

                {/* Alerta de Confirmación de Eliminación */}
                <IonAlert
                    isOpen={showDeleteAlert}
                    onDidDismiss={() => {
                        setShowDeleteAlert(false);
                        setRepoToDelete(null);
                    }}
                    header="Confirmar Eliminación"
                    message={`¿Estás seguro de que deseas eliminar el repositorio <strong>${repoToDelete?.name}</strong>? Esta acción es irreversible.`}
                    buttons={[
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'secondary'
                        },
                        {
                            text: 'Eliminar',
                            role: 'destructive', // Da un estilo rojo/peligro en iOS
                            handler: performDelete
                        }
                    ]}
                />

                {/* Mensajes de Éxito */}
                <IonToast
                    isOpen={!!toastMsg}
                    message={toastMsg}
                    duration={3000}
                    onDidDismiss={() => setToastMsg('')}
                />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;1;