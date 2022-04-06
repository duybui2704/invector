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

export default {
    formatMoney
};
