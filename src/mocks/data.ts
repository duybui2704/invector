import { KeyValueModel } from '@/models/keyValue-model';
import { TransactionModel } from '@/models/transaction-model';
import Languages from '../common/Languages';

export const DATA = [
    {
        id: 1,
        growth: '800000',
        date: '14/02/2022 12:00:00',
        content: 'Trả lãi đầu tư',
        debt: '4000000',
        color: 'green'
    },
    {
        id: 2,
        growth: '800000',
        date: '14/02/2022 12:00:00',
        content: 'Đầu tư',
        debt: '4000000',
        color: 'red'
    },
    {
        id: 3,
        growth: '800000',
        date: '14/02/2022 12:00:00',
        content: 'Trả lãi đầu tư',
        debt: '4000000',
        color: 'green'
    },
    {
        id: 4,
        growth: '800000',
        date: '14/02/2022 12:00:00',
        content: 'Đầu tư',
        debt: '4000000',
        color: 'red'
    }
] as TransactionModel[];

export const TransactionTypes = [
    { label: Languages.transaction.all, value: 1, type: 1 },
    { label: Languages.transaction.inMoney, value: 2, type: 2 },
    { label: Languages.transaction.outMoney, value: 3, type: 3 }
] as KeyValueModel[];

export const DataChart = {
    quarter1: {
        contractNumberQuarter: 20,
        investMountQuarter: 400000000,
        originAmountEarningQuarter: 250000000,
        interestQuarter: 12000000,
        quarter: 1,
        year: '2021',
        data: [
            {
                id: 1,
                quarter: 1,
                contractNumber: 20,
                investMount: 350000000,
                originAmountEarning: 200000000,
                interest: 12000000,
                month: 'T1',
                year: '2021'
            },
            {
                id: 2,
                quarter: 1,
                contractNumber: 20,
                investMount: 400000000,
                originAmountEarning: 220000000,
                interest: 12000000,
                month: 'T2',
                year: '2021'
            },
            {
                id: 3,
                quarter: 1,
                contractNumber: 20,
                investMount: 380000000,
                originAmountEarning: 250000000,
                interest: 12000000,
                month: 'T3',
                year: '2021'
            }
        ]
    }
};
