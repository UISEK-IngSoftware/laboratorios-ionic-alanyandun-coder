import "./RepoItem.css";
import React from "react";
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from "@ionic/react";
import { pencilOutline, trashOutline } from "ionicons/icons";
import { Repository } from "../interfaces/Repository";

interface RepoItemProps extends Repository {
    onEdit: (repo: Repository) => void;
    onDelete: (repo: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = (props) => {
    // Reconstruimos el objeto repo para pasarlo a los eventos
    const repository: Repository = {
        id: props.id,
        name: props.name,
        description: props.description,
        language: props.language,
        owner: props.owner
    };

    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot="start">
                    <img alt={repository.name} src={repository.owner?.avatar_url} />
                </IonThumbnail>
                <IonLabel>
                    <h2> {repository.name} </h2>
                    <p> {repository.description || "Sin descripción"} </p>
                    <p> Language: {repository.language || "N/A"} </p>
                </IonLabel>
            </IonItem>

            <IonItemOptions side="end">
                <IonItemOption color="primary" onClick={() => props.onEdit(repository)}>
                    <IonIcon icon={pencilOutline} slot="icon-only" />
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => props.onDelete(repository)}>
                    <IonIcon icon={trashOutline} slot="icon-only" />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
};

export default RepoItem;