/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CurrentPackage = {
    /**
     * Current package ID of the relevant package endpoint.
     */
    packageId?: string;
    /**
     * Current translated package name of the relevant package endpoint.
     */
    packageName?: string;
    /**
     * Sale price of the package. Comes from receipt.
     */
    price?: string;
    /**
     * Sale currency of the package. Comes from receipt.
     */
    currency?: string;
    /**
     * Text representation of the price. With currency symbol.
     */
    priceText?: string;
    /**
     * Sale quantity of the package. Comes from receipt.
     */
    quantity?: string;
    /**
     * Renewal date of the subscription. Comes from subscription.
     */
    renewalDate?: string;
    /**
     * Remaining usage limit of the relevant endpoint. Comes from subscription feature usage. This value will not be returned by /number-packages endpoint.
     */
    remainingAmount?: string;
    /**
     * Active number amount in use. This value is only returned by /number-packages endpoint.
     */
    numberAmountInUse?: string;
    /**
     * Status of whether the current package is cancelled. Possible values: [0, 1]
     */
    isCancel?: string;
    /**
     * Period amount of the package.
     */
    period?: string;
    /**
     * Trial period type of the package.
     */
    periodType?: CurrentPackage.periodType;
    /**
     * Text representation of the overdraft amount. With currency symbol. Can be null.
     */
    overdraftAmount?: string;
    /**
     * Cancellation prevents it from canceling again until zotlo responds.
     */
    cancellationInProgressValue?: boolean;
};

export namespace CurrentPackage {

    /**
     * Trial period type of the package.
     */
    export enum periodType {
        DAY = 'day',
        MONTH = 'month',
        YEAR = 'year',
    }


}
