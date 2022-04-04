import { KeyValueModel } from '@/models/keyValue-model';
import { TransactionModel } from '@/models/transaction-model';
import Languages from '../common/Languages';

export const DATA = [
    { id: 1, growth: '800000', date: '14/02/2022 12:00:00', content: 'Trả lãi đầu tư', debt: '4000000',color:'green' },
    { id: 2, growth: '800000', date: '14/02/2022 12:00:00', content: 'Đầu tư', debt: '4000000' ,color:'red'},
    { id: 3, growth: '800000', date: '14/02/2022 12:00:00', content: 'Trả lãi đầu tư', debt: '4000000',color:'green' },
    { id: 4, growth: '800000', date: '14/02/2022 12:00:00', content: 'Đầu tư', debt: '4000000' ,color:'red'}
] as TransactionModel[];

export const TransactionTypes = [
    { label: Languages.transaction.all, value: 1 , type: 1},
    { label: Languages.transaction.inMoney, value: 2, type: 2 },
    { label: Languages.transaction.outMoney, value: 3, type: 3 }
] as KeyValueModel[];
