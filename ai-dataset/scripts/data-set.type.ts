export interface ITx {
    readonly txHash: string;
    readonly block: number;
    readonly timestamp: number;
    readonly amount: string;
    readonly from: string;
    readonly to: string;
}

export interface IAddress {
    readonly address: string;
    readonly type: 'clean' | 'dirty';
    readonly txs: ITx[];
}

export interface IDataset {
    readonly addresses: IAddress[];
}
