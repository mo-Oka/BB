'use strict';
const basePoHelper = require('../helper/base-po');

const computerName = $('#name');
const introducedDate = $('#introduced');
const discontinuedDate = $('#discontinued');
const company = $('#company');

const createComputerButton = $('.actions > [type="submit"]');
const cancelButton = $('.actions > a');
const deleteButton = $('.danger');

const computerFieldClasses = $$('fieldset > div');

const fillComputerName = async (text) => {
    await computerName.clear();
    return computerName.sendKeys(text);
};
const fillIntroducedDate = async (text) => {
    await introducedDate.clear();
    return introducedDate.sendKeys(text);
};

const fillDiscontinuedDate = async (text) => {
    await discontinuedDate.clear();
    return discontinuedDate.sendKeys(text);
};
const chooseCompany = async (companyName) => {
    await company.click();
    return element(by.xpath(`//option[contains(text(), '${companyName}')]`)).click();
};

const getComputerName = async () => computerName.getAttribute('value');
const getIntroducedDate = async () => introducedDate.getAttribute('value');
const getDiscontinuedDate = async () => discontinuedDate.getAttribute('value');
const getCompanyValueNumber = async () => company.getAttribute('value');

const createComputerButtonClick = async () => createComputerButton.click();
const cancelButtonClick = async () => cancelButton.click();
const deleteButtonClick = async () => deleteButton.click();

const getComputerNameFieldClasses = async () => basePoHelper.getAttribute(computerFieldClasses.get(0), 'class');

module.exports = ({
    fillComputerName,
    fillIntroducedDate,
    fillDiscontinuedDate,
    chooseCompany,

    getComputerName,
    getIntroducedDate,
    getDiscontinuedDate,
    getCompanyValueNumber,

    createComputerButtonClick,
    cancelButtonClick,
    deleteButtonClick,

    getComputerNameFieldClasses,
});
