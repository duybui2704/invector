import { ENUM_INVEST_MONEY } from '@/common/constants';
import Languages from '@/common/Languages';
import { KeyValueModel } from '@/models/keyValue-model';
import { TransactionModel } from '@/models/transaction-model';
import { UserInfoModal } from '@/models/user-models';

export const DATA = [
    {
        so_tien: '800000',
        created_at: '14/02/2022 12:00:00',
        hinh_thuc: 'Trả lãi đầu tư',
        so_du: '4000000',
        color: 'green'
    },
    {
        so_tien: '800000',
        created_at: '14/02/2022 12:00:00',
        hinh_thuc: 'Đầu tư',
        so_du: '4000000',
        color: 'red'
    },
    {
        so_tien: '800000',
        created_at: '14/02/2022 12:00:00',
        hinh_thuc: 'Trả lãi đầu tư',
        so_du: '4000000',
        color: 'green'
    },
    {
        so_tien: '800000',
        created_at: '14/02/2022 12:00:00',
        hinh_thuc: 'Đầu tư',
        so_du: '4000000',
        color: 'red'
    }
] as TransactionModel[];

export const TransactionTypes = [
    { label: Languages.transaction.all, value: 1, type: 'all' },
    { label: Languages.transaction.inMoney, value: 2, type: 'investor' },
    { label: Languages.transaction.outMoney, value: 3, type: 'pay' }
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
    full_name: 'Pham Minh Quý',
    phone_number: '0353826750',
    gender: 'Nam',
    accuracy: 3,
    front_card: '',
    card_back: '',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAznG13WJ4ayysR3Q07BNXsRTdDbP0PQ_Efw&usqp=CAU',
    id_fblogin: '1',
    id_google: '1',
    user_apple: '1'
} as unknown as UserInfoModal;

export const arrayData = [
    {
        id: '1',
        value: '500000',
        interestRate: '5%',
        expInterest: '10000',
        time: '5 tháng',
        format: 'Lãi hàng tháng gốc hàng tháng'

    },
    {
        id: '2',
        value: '200000',
        interestRate: '5%',
        expInterest: '10000',
        time: '3 tháng',
        format: 'Lãi hàng tháng gốc hàng tháng'

    },
    {
        id: '3',
        value: '500000',
        interestRate: '5%',
        expInterest: '10000',
        time: '5 tháng',
        format: 'Lãi hàng tháng gốc hàng tháng'

    }
];

export const typePhoto = [
    { id: '1', value: 'Camera' },
    { id: '2', value: 'Library' }
];

export const dataBank = [
    { id: '1', value: 'Vietcom Bank' },
    { id: '2', value: 'TP Bank' },
    { id: '3', value: 'BIDV' },
    { id: '4', value: 'Viettin Bank' },
    { id: '5', value: 'Sacom Bank' },
    { id: '6', value: 'VP Bank' }
];

export const investData = [
    {
        amountMoney: 80000000,
        percent: '0.5%',
        intent: 100000000,
        time: '3 tháng',
        formality: 'Lãi gốc hàng tháng',
        id: 1,
        interest: 1000000
    },
    {
        amountMoney: 80000000,
        percent: '0.5%',
        intent: 100000000,
        time: '3 tháng',
        formality: 'Lãi gốc hàng tháng',
        id: 2,
        interest: 1000000
    },
    {
        amountMoney: 80000000,
        percent: '0.5%',
        intent: 100000000,
        time: '3 tháng',
        formality: 'Lãi gốc hàng tháng',
        id: 3,
        interest: 1000000
    },
    {
        amountMoney: 80000000,
        percent: '0.5%',
        intent: 100000000,
        time: '3 tháng',
        formality: 'Lãi gốc hàng tháng',
        id: 4,
        interest: 1000000
    }
];
export const arrMoney = [
    { id: '1', value: ENUM_INVEST_MONEY.BELOW_10 },
    { id: '2', value: ENUM_INVEST_MONEY.ABOUT_10_50 },
    { id: '3', value: ENUM_INVEST_MONEY.ABOUT_50_100 },
    { id: '4', value: ENUM_INVEST_MONEY.ABOVE_100 },
];

export const arrMonth = [
    { id: '1', value: '1 tháng' },
    { id: '2', value: '3 tháng' },
    { id: '3', value: '6 tháng' },
    { id: '4', value: '9 tháng' },
    { id: '5', value: '12 tháng' },
    { id: '6', value: '18 tháng' },
    { id: '7', value: '24 tháng' }
];
