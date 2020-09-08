import React from "react";
import { CardModel } from "../core/Models";
import "../styles/Card.css";

export interface ICardProps {
    card: CardModel;
}

function Card(props: ICardProps) {
    return (
        <div className="card item" key={props.card.id}>
            <img src={props.card.imageUrl} alt={props.card.name} style={{ width: "50%" }} />
            <div className="card-details">
                <h3 className="name">{props.card.name}</h3>
                <p className="text">{props.card.text}</p>
                <div>Set: {props.card.set?.name}</div>
                <div>Type: {props.card.type}</div>
            </div>
        </div>
    );
}

export default Card;
