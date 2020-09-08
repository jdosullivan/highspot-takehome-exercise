import React from "react";
import { CardModel } from "../core/Models";
import Card from "./Card";
import "../styles/Card.css";

export interface ICardGridProps {
    cards: CardModel[];
}

function CardGrid(props: ICardGridProps) {
    return (
        <div className="card-grid">
            <div className="row">
                {props.cards.map((card: CardModel) => (
                    <Card card={card} key={card.id} />
                ))}
            </div>
        </div>
    );
}

export default CardGrid;
