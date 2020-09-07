import React from "react";
import { ElderScrollCardModel } from "../core/Models";

export interface ICardListProps {
    cards: ElderScrollCardModel[];
}

function CardGrid(props: ICardListProps) {
    return (
        <>
            {props.cards.map((card: ElderScrollCardModel, index: number) => (
                <div className="card" key={`${card.id}_${Math.random()}`}>
                    {/* <Suspense fallback={<img src="https://media.tenor.com/images/b660fe2525e3a20771c924a6cdd16d35/tenor.gif" alt="Avatar" style={{ width: "50%" }} />}>
                                  <ImageComponent src={listItem.imageUrl} />
                              </Suspense> */}

                    <div className="container">
                        <h4>
                            <b>
                                {index}: {card.name}
                            </b>
                        </h4>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CardGrid;
