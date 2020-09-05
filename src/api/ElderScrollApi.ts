import { ElderScrollCardModel } from "../core/Models";

export interface ElderScrollCardsApiResponse {
    cards: ElderScrollCardModel[];
    _links: {
        next: string;
    };
    _pageSize: number;
    _totalCount: number;
}

export interface FetchParams {
    page?: number;
    pageSize?: number;
    id?: string;
    name?: string;
    [index: string]: string | number | undefined;
    // Other fetch parameters available on the api are out of scope for this solution
}

export const fetchCards = async (params: FetchParams) => {
    let queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

    let response: Response = await fetch(`https://api.elderscrollslegends.io/v1/cards?${queryString}`);
    const scrollCardResponse: ElderScrollCardsApiResponse = (await response.json()) as ElderScrollCardsApiResponse;
    return scrollCardResponse;
};
