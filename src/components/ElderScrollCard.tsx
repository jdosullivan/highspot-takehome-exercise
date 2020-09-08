import React from "react";
import { CardModel } from "../core/Models";

export interface IElderScrollCardProps {
    card: CardModel;
}

function ElderScrollCard(props: IElderScrollCardProps) {
    return (
        <div className="card item" key={props.card.id}>
            <img src={props.card.imageUrl} alt={props.card.name} style={{ width: "50%" }} />
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
