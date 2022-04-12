function formatMoney(number: string | number | undefined) {
    const hasMinus = `${number}`.includes('-');
    number = `${number}`.replace(/[^0-9]/g, '');

    if (!number || Number.isNaN(number) || Number(number) === 0) {
        return '0';
    }
    return `${hasMinus ? '-' : ''}${Math.ceil(Number(number))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

function formatTextToNumber(textNumber: string) {
    const num = (`${textNumber}`).replace(/[^0-9]/g, '');
    return num;
}

function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default {
    formatTextToNumber,
    capitalizeFirstLetter,
    formatMoney
}
