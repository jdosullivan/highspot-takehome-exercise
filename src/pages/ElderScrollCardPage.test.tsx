import React from "react";
import { render, waitForElement, getByText, fireEvent } from "@testing-library/react";
import ElderScrollCardPage from "./ElderScrollCardPage";
import * as ElderScrollApi from "../api/ElderScrollApi";
import { FetchParams } from "../api/ElderScrollApi";
import { CardModel } from "../core/Models";

jest.mock("../api/ElderScrollApi");

describe("Elder scrolls card page", () => {
    const generateRandomNumber = (min: number, max: number): number => {
        return ((Math.random() * (max - min + 1)) | 0) + min;
    };

    const createTestCard = (): CardModel => {
        const id = generateRandomNumber(1, 1000).toString();
        return {
            id,
            name: `card_${id}`,
            rarity: "", // Considered using an enum but was not sure if there was a defined set of acceptable values
            type: "", // Considered using an enum but was not sure if there was a defined set of acceptable values
            cost: 1,
            set: {
                id: "",
                name: "",
                _self: "",
            },
            collectible: false,
            text: "",
            attributes: [],
            unique: false,
            imageUrl: "",
        };
    };

    let apiSpy: jest.SpyInstance<Promise<ElderScrollApi.ElderScrollCardsApiResponse>, [FetchParams]>;
    let stubApiResponse: ElderScrollApi.ElderScrollCardsApiResponse;
    const totalCardCount = 95;

    beforeEach(() => {
        const cards = [createTestCard(), createTestCard(), createTestCard(), createTestCard()];
        stubApiResponse = {
            cards,
            _totalCount: totalCardCount,
            _pageSize: 1,
            _links: {
                next: "",
            },
        };
        jest.spyOn(document.documentElement, "offsetHeight", "get").mockImplementation(() => window.innerHeight);
        apiSpy = jest.spyOn(ElderScrollApi, "fetchCards").mockImplementation(() => Promise.resolve(stubApiResponse));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("Load cards", () => {
        test("Loads only 20 cards on page load", async () => {
            const cardPage = render(<ElderScrollCardPage />);

            await waitForElement(() => cardPage.getByText(`${stubApiResponse.cards.length} of ${stubApiResponse._totalCount} cards displayed`));

            expect(apiSpy).toHaveBeenCalledTimes(1);
            const apiCall: FetchParams = apiSpy.mock.calls[0][0] as FetchParams;
            expect(apiCall.pageSize).toBe(20); // Ensure we only load 20 items
            expect(apiCall.page).toBe(1); // Ensure page is 1
        });

        test.skip("Loads next 20 cards after scrolling to end of page", async () => {
            const cardPage = render(<ElderScrollCardPage />);

            await waitForElement(() => cardPage.getByText(`${stubApiResponse.cards.length} of ${stubApiResponse._totalCount} cards displayed`));
            stubApiResponse.cards = [createTestCard(), createTestCard(), createTestCard(), createTestCard()];
            fireEvent.scroll(window, { target: { scrollY: 1000 } });
            await waitForElement(() => cardPage.getByTestId("fetchMore"));

            expect(apiSpy).toHaveBeenCalledTimes(2);
            const apiCall: FetchParams = apiSpy.mock.calls[1][0] as FetchParams;
            expect(apiCall.pageSize).toBe(20); // Ensure we only load 20 items
            expect(apiCall.page).toBe(2); // Ensure page is 1
        });
    });
});
