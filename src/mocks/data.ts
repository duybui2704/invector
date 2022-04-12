import Languages from '@/common/Languages';
import { KeyValueModel } from '@/models/keyValue-model';
import { TransactionModel } from '@/models/transaction-model';
import { UserModel } from '@/models/user-model';

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

export const dataQuarterReport =
    [
        { id: '1', value: 'Qúy 1' },
        { id: '2', value: 'Qúy 2' },
        { id: '3', value: 'Qúy 3' },
        { id: '4', value: 'Qúy 4' }
    ];

export const dataYearReport =
    [
        { id: '1', value: '2019' },
        { id: '2', value: '2020' },
        { id: '3', value: '2021' },
        { id: '4', value: '2022' }
    ];

export const dataUser = {
    name: 'Pham Minh Quý',
    phone: '0353826750',
    gender: 'Nam',
    accuracy: 1, // 1: đã xác thực , 2: chưa xác thực, 3: chờ xác thực
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAznG13WJ4ayysR3Q07BNXsRTdDbP0PQ_Efw&usqp=CAU'

} as UserModel;