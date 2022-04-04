export interface TransactionModel {
    id: number,
    growth: string,
    date: string,
    content: string,
    debt: string, 
    color:string 
}

export interface TransactionTypeModel {
    code: string;
    id: number;
    title: string;
    status: number;
    type: number;
    money: string;
    text_status: string;
    source: string;
    receiving_source: string;
    transfer_source: string;
    color: string;
    created_at: string;
}
