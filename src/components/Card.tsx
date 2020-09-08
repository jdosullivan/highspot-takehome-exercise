import React from "react";
import { CardModel } from "../core/Models";
import "../styles/Card.css";
import { truncate } from "../core/utils";

export interface ICardProps {
    card: CardModel;
}

function Card(props: ICardProps) {
    return (
        <div className="card item" key={props.card.id}>
            <div className="card-type">
                <span>{props.card.type}</span>
            </div>
            <img className="card-image" src={props.card.imageUrl} alt={props.card.name} />
            <div className="card-details">
                <h3 className="name">{props.card.name}</h3>
                <p className="text" title={props.card.text}>
                    {truncate(props.card.text, 200)}
                </p>
                <div className="card-set-name">
                    <span className="subtitle">Set:</span> {props.card.set?.name}
                </div>
            </div>
        </div>
    );
}

export default Card;
