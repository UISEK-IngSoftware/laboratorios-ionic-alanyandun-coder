import "./RepoItem.css";
import React from "react";
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail} from "@ionic/react";
import {pencilOutline, trashOutline} from "ionicons/icons";
import {Repository} from "../interfaces/Repository";


const RepoItem: React.FC<Repository> = (repository) => {
    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot="start">
                    <img alt={repository.name} src={repository.owner.avatar_url} />
                </IonThumbnail>
                <IonLabel>
                    <h2> {repository.name} </h2>
                    <p> {repository.description} </p>
                    <p> Language: {repository.language} </p>
                </IonLabel>
            </IonItem>

            <IonItemOptions>
                <IonItemOption>
                    <IonIcon icon={pencilOutline} slot="icon-only" />
                </IonItemOption>
                <IonItemOption color="danger">
                    <IonIcon icon={trashOutline} slot="icon-only"/>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>

    )
};

export default RepoItem;