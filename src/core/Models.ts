export interface ElderScrollCardModel {
    id: string;
    name: string;
    rarity: string; // Considered using an enum but was not sure if there was a defined set of acceptable values
    type: string; // Considered using an enum but was not sure if there was a defined set of acceptable values
    cost: number;
    set: {
        id: string;
        name: string;
        _self: string;
    };
    collectible: boolean;
    text: string;
    attributes: string[]; // Considered using an enum but was not sure if there was a defined set of acceptable values
    unique: boolean;
    imageUrl: string;
}
