'use strict';

const mainPage = require('./pages/main-po');
const computerDetailsPage = require('./pages/computer-details-po');

describe('Actions with computer entity spec', () => {

    const addComputerHeader = 'Add a computer';
    const editComputerHeader = 'Edit computer';
    const mainPageHeader = 'computers found';

    const computerTestName = '1 test computer';
    const introducedTestDate = '2018-03-17';
    const discontinuedTestDate = '2019-03-17';
    const companyTestName = 'Apple Inc.';
    const companyTestValueNumber = '1';

    const computerTestNameUpdated = '1 test computer 1';
    const introducedTestDateUpdated = '2018-03-16';
    const discontinuedTestDateUpdated = '2019-03-16';
    const companyTestNameUpdated = 'ASUS';

    const successCreationMessage = `Done! Computer ${computerTestName} has been created`;
    const successUpdatingMessage = `Done! Computer ${computerTestNameUpdated} has been updated`;
    const successDeletionMessage = 'Done! Computer has been deleted';

    beforeEach(async () => {
        await mainPage.goToMainPage();
    });

    describe('Add new computer', () => {

        it('clicks Add a new computer button and clicks Create this computer', async () => {
            await mainPage.addNewComputerButtonClick();
            expect(await mainPage.getHeader()).toBe(addComputerHeader);
            await computerDetailsPage.createComputerButtonClick();
            expect(await mainPage.getHeader()).toBe('Add a computer');
            expect(await computerDetailsPage.getComputerNameFieldClasses()).toMatch('error');
        });

        it('clicks Add a new computer button and fills all fields - HAPPY PATH', async () => {
            await mainPage.addNewComputerButtonClick();
            await computerDetailsPage.fillComputerName(computerTestName);
            await computerDetailsPage.fillIntroducedDate(introducedTestDate);
            await computerDetailsPage.fillDiscontinuedDate(discontinuedTestDate);
            await computerDetailsPage.chooseCompany(companyTestName);
            await computerDetailsPage.createComputerButtonClick();
            expect(await mainPage.getHeader()).toContain(mainPageHeader);
            expect(await mainPage.getAlertText()).toBe(successCreationMessage);
        });

        it('searches created computer and opens details', async () => {
            await mainPage.searchByText(computerTestName);
            expect(await mainPage.isComputerInTheTable(computerTestName)).toBeTruthy();
            await mainPage.computerNameClick(computerTestName);
            expect(await mainPage.getHeader()).toBe(editComputerHeader);
            expect(await computerDetailsPage.getComputerName()).toBe(computerTestName);
            expect(await computerDetailsPage.getIntroducedDate()).toBe(introducedTestDate);
            expect(await computerDetailsPage.getDiscontinuedDate()).toBe(discontinuedTestDate);
            expect(await computerDetailsPage.getCompanyValueNumber()).toBe(companyTestValueNumber);
            await computerDetailsPage.cancelButtonClick();
            expect(await mainPage.getHeader()).toContain(mainPageHeader);
        });
    });

    describe('Update computer', () => {
        it('updates created computer', async () => {
            expect(await mainPage.isComputerInTheTable(computerTestName)).toBeTruthy();
            await mainPage.computerNameClick(computerTestName);
            await computerDetailsPage.fillComputerName(computerTestNameUpdated);
            await computerDetailsPage.fillIntroducedDate(introducedTestDateUpdated);
            await computerDetailsPage.fillDiscontinuedDate(discontinuedTestDateUpdated);
            await computerDetailsPage.chooseCompany(companyTestNameUpdated);
            await computerDetailsPage.createComputerButtonClick();
            expect(await mainPage.getHeader()).toContain(mainPageHeader);
            expect(await mainPage.getAlertText()).toBe(successUpdatingMessage);
            expect(await mainPage.isComputerInTheTable(computerTestNameUpdated)).toBeTruthy();
        });
    });

    describe('Delete computer', () => {
        it('deletes created computer', async () => {
            expect(await mainPage.isComputerInTheTable(computerTestNameUpdated)).toBeTruthy();
            await mainPage.computerNameClick(computerTestNameUpdated);
            expect(await mainPage.getHeader()).toBe(editComputerHeader);
            await computerDetailsPage.deleteButtonClick();
            expect(await mainPage.getHeader()).toContain(mainPageHeader);
            expect(await mainPage.getAlertText()).toBe(successDeletionMessage);
        });

        it('searches deleted computer', async () => {
            await mainPage.searchByText(computerTestNameUpdated);
            expect(await mainPage.isComputerInTheTable(computerTestNameUpdated)).toBeFalsy();
        });
    });
});
