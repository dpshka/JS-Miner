/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BusinessPackage = {
    /**
     * Identifier of the package price.
     */
    priceId?: string;
    /**
     * Name of the package.
     */
    name?: string;
    /**
     * Zotlo package ID of the package.
     */
    packageId?: string;
    /**
     * Zotlo description of the package.
     */
    description?: string;
    /**
     * Price of the package returned as two decimal float number formatted. If a price found with currency of the business company, this always returns the price of the business company's currency. Otherwise it will return the default price of package.
     */
    price?: string;
    /**
     * Trial price of the package returned as two decimal float number formatted.  If a trial price found with currency of the business company, this always returns the trial price of the business company's currency. Otherwise it will return the default trial price of package.
     */
    trialPrice?: string;
    /**
     * Currency of the package. If a price found with currency of the business company, this always returns in business company's currency. Otherwise it will return the default currency of package.
     */
    currency?: string;
    /**
     * Limit of the package. Which is defined at Getcontact Admin Panel. If the package does not have limit will return null.
     */
    usageLimit?: string;
    /**
     * The price per usage after the limit is exceeded.
     */
    usageLimitPrice?: string;
    /**
     * Trial price text as it's defined on Zotlo. Which can be used to display trial price value. Will return the formatted value as defined on GTC Admin panel currency settings if not defined on Zotlo.
     */
    usageLimitPriceText?: string;
    /**
     * Period amount of the package.
     */
    period?: string;
    /**
     * Period type of the package.
     */
    periodType?: BusinessPackage.periodType;
    /**
     * Trial period amount of the package.
     */
    trialPeriod?: string;
    /**
     * Trial period type of the package.
     */
    trialPeriodType?: BusinessPackage.trialPeriodType;
    /**
     * Price text as it's defined on Zotlo. Which can be used to display price value. Will return the formatted value as defined on GTC Admin panel currency settings if not defined on Zotlo.
     */
    priceText?: string;
    /**
     * Trial price text as it's defined on Zotlo. Which can be used to display trial price value. Will return the formatted value as defined on GTC Admin panel currency settings if not defined on Zotlo.
     */
    trialPriceText?: string;
    /**
     * Limit of the package. Which is defined at Getcontact Admin Panel. If the package does not have limit will return null.
     */
    limit?: number;
};

export namespace BusinessPackage {

    /**
     * Period type of the package.
     */
    export enum periodType {
        DAY = 'day',
        MONTH = 'month',
        YEAR = 'year',
    }

    /**
     * Trial period type of the package.
     */
    export enum trialPeriodType {
        DAY = 'day',
        MONTH = 'month',
        YEAR = 'year',
    }


}
