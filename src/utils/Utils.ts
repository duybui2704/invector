function formatTextToNumber(textNumber: string) {
    const num = (`${textNumber}`).replace(/[^0-9]/g, '');
    return num;
}

function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default {
    formatTextToNumber,
    capitalizeFirstLetter
}
