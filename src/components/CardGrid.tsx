import React from "react";
import { ElderScrollCardModel } from "../core/Models";
import "../styles/CardGrid.css";
import ElderScrollCard from "./ElderScrollCard";

export interface ICardListProps {
    cards: ElderScrollCardModel[];
}

function CardGrid(props: ICardListProps) {
    return (
        <div className="card-grid">
            <div className="row">
                {props.cards.map((card: ElderScrollCardModel, index: number) => (
                    <ElderScrollCard card={card} />
                ))}
            </div>
        </div>
    );
}

export default CardGrid;
