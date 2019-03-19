'use strict';
const basePoHelper = require('../helper/base-po');

const mainPageLink = 'http://computer-database.herokuapp.com/computers';
const header = $('#main > h1');
const addNewComputerButton = $('#add');

// Alerts
const alert = $('.alert-message');

// Filter selectors
const filterField = $('#searchbox');
const filterButton = $('#searchsubmit');

// Table selectors
const computerNameColumnHeader = $('.col2 > a');

// Pagination
const previousButton = $('#pagination .prev > a');
const computersDisplaying = $('#pagination .current > a');
const nextButton = $('#pagination .next > a');

const goToMainPage = async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get(mainPageLink);
    expect(header).toBeTruthy();
};

const getHeader = async () => header.getText();

const getAlertText = async () => alert.getText();

const addNewComputerButtonClick = async () => addNewComputerButton.click();

const searchByText = async (text) => {
    await filterField.sendKeys(text);
    return filterButton.click();
};

const filterButtonClick = async () => filterButton.click();

const computerNameColumnHeaderClick = async () => computerNameColumnHeader.click();

const isComputerInTheTable = async (computer) => {
    const computerValues = await element.all(by.css('td > a')).getText();
    return computerValues.filter(value => value === computer).length > 0;
};

const computerNameClick = async (computer) => element(by.xpath(`//a[contains(text(), '${computer}')]`)).click();

const isPreviousButtonActive = async () => basePoHelper.getAttribute(previousButton, 'isContentEditable');
const previousButtonClick = async () => previousButton.click();
const isNextButtonActive = async () => basePoHelper.getAttribute(nextButton, 'isContentEditable');
const nextButtonClick = async () => nextButton.click();
const getComputersDisplaying = async () => computersDisplaying.getText();

module.exports = ({
    goToMainPage,
    getHeader,
    getAlertText,
    addNewComputerButtonClick,
    searchByText,
    filterButtonClick,
    computerNameColumnHeaderClick,

    isComputerInTheTable,
    computerNameClick,

    isPreviousButtonActive,
    previousButtonClick,
    isNextButtonActive,
    nextButtonClick,
    getComputersDisplaying
});

