import React, { Suspense } from "react";
import { ElderScrollCardModel } from "../core/Models";
import "../styles/CardGrid.css";

const ImageComponent = React.lazy(() => import("./Image"));

export interface ICardListProps {
    cards: ElderScrollCardModel[];
}

function CardGrid(props: ICardListProps) {
    return (
        <div className="card-grid">
            <div className="row">
                {props.cards.map((card: ElderScrollCardModel, index: number) => (
                    <div className="card item" key={card.id}>
                        <Suspense fallback={<img src="" alt="Avatar" style={{ width: "50%" }} />}>
                            <ImageComponent src={card.imageUrl} alt={card.name} />
                        </Suspense>
                        <div className="card-details">
                            <div>Name: {card.name}</div>
                            <div>Text: {card.text}</div>
                            <div>Set Name: {card.set?.name}</div>
                            <div>Type: {card.type}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardGrid;
