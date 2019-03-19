'use strict';

const mainPage = require('./pages/main-po');

describe('Filter spec', () => {

    const searchValue = 'z';
    const searchResultHeader = '24 computers found';
    const firstPagePaginationDisplayingNumbers = 'Displaying 1 to 10 of 24';
    const secondPagePaginationDisplayingNumbers = 'Displaying 11 to 20 of 24';
    const thirdPagePaginationDisplayingNumbers = 'Displaying 21 to 24 of 24';

    const mainPageHeader = 'computers found';

    beforeAll(async () => {
        await mainPage.goToMainPage();
    });

    it('searches with empty filter', async () => {
        await mainPage.filterButtonClick();
        expect(await mainPage.getHeader()).toContain(mainPageHeader);
    });

    it('searches with value', async () => {
        await mainPage.searchByText(searchValue);
        expect(await mainPage.getHeader()).toContain(searchResultHeader);
    });

    // TODO uncomment when pagination is fixed
    xit('checks pagination', async () => {
        expect(await mainPage.isPreviousButtonActive()).toBeFalsy();
        expect(await mainPage.isNextButtonActive()).toBeTruthy();
        expect(await mainPage.getComputersDisplaying()).toBe(firstPagePaginationDisplayingNumbers);
        await mainPage.nextButtonClick();
        expect(await mainPage.isPreviousButtonActive()).toBeTruthy();
        expect(await mainPage.isNextButtonActive()).toBeTruthy();
        expect(await mainPage.getComputersDisplaying()).toBe(secondPagePaginationDisplayingNumbers);
        await mainPage.nextButtonClick();
        expect(await mainPage.isPreviousButtonActive()).toBeFalsy();
        expect(await mainPage.isNextButtonActive()).toBeFalsy();
        expect(await mainPage.getComputersDisplaying()).toBe(thirdPagePaginationDisplayingNumbers);
    });
});