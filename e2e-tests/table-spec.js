'use strict';

const mainPage = require('./pages/main-po');

// TODO uncomment and extend the test when sorting is fixed
xdescribe('Computers table spec', () => {

    beforeAll(async () => {
        await mainPage.goToMainPage();
    });

    it('sorts by Computer name column ASC', async () => {
        await mainPage.computerNameColumnHeaderClick();
        expect(await mainPage.tableIsSortedBy('Computer name', 'ASC')).toBeTruthy();
    });

});