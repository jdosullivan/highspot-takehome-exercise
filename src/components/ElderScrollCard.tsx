import React, { Suspense } from "react";
import { ElderScrollCardModel } from "../core/Models";

const ImageComponent = React.lazy(() => import("./Image"));

export interface IElderScrollCardProps {
    card: ElderScrollCardModel;
}

function ElderScrollCard(props: IElderScrollCardProps) {
    return (
        <div className="card item" key={props.card.id}>
            <Suspense fallback={<img src={props.card.imageUrl} alt={props.card.name} style={{ width: "50%" }} />}>
                <ImageComponent src={props.card.imageUrl} alt={props.card.name} />
            </Suspense>
            <div className="card-details">
                <div>Name: {props.card.name}</div>
                <div>Text: {props.card.text}</div>
                <div>Set Name: {props.card.set?.name}</div>
                <div>Type: {props.card.type}</div>
            </div>
        </div>
    );
}

export default ElderScrollCard;
