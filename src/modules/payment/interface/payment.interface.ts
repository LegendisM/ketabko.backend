export enum PaymentStatus {
    Pending = 'pending',
    Processing = "processing",
    Fail = 'fail',
    Complete = 'complete'
}

export interface IPaymentRequest {
    authority: string;
    url: string;
}

export interface IPaymentVerify {
    state: boolean;
    code: number;
    paymentId: string;
    tracking: string;
}