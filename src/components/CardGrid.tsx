import React from "react";
import { CardModel } from "../core/Models";
import ElderScrollCard from "./ElderScrollCard";
import "../styles/CardGrid.css";

export interface ICardGridProps {
    cards: CardModel[];
}

function CardGrid(props: ICardGridProps) {
    return (
        <div className="card-grid">
            <div className="row">
                {props.cards.map((card: CardModel) => (
                    <ElderScrollCard card={card} />
                ))}
            </div>
        </div>
    );
}

export default CardGrid;
