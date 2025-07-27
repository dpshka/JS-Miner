/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AcceptPopupTermsResponse } from '../models/AcceptPopupTermsResponse';
import type { BusinessApiCreateTokenInitSuccessResultResponse } from '../models/BusinessApiCreateTokenInitSuccessResultResponse';
import type { BusinessApiTokenList } from '../models/BusinessApiTokenList';
import type { BusinessApiTokenTransactionResponse } from '../models/BusinessApiTokenTransactionResponse';
import type { BusinessCompanyNumberListResponse } from '../models/BusinessCompanyNumberListResponse';
import type { BusinessLandingInitResponse } from '../models/BusinessLandingInitResponse';
import type { BusinessType } from '../models/BusinessType';
import type { CallCardInitResponse } from '../models/CallCardInitResponse';
import type { CallCardListField } from '../models/CallCardListField';
import type { CallCardReportsFiltersResponse } from '../models/CallCardReportsFiltersResponse';
import type { CallCardReportsInitResponse } from '../models/CallCardReportsInitResponse';
import type { CallCardReportsList } from '../models/CallCardReportsList';
import type { CallCardWaiting } from '../models/CallCardWaiting';
import type { CallerIdInitSuccessResultResponse } from '../models/CallerIdInitSuccessResultResponse';
import type { CancelSubscriptionResponse } from '../models/CancelSubscriptionResponse';
import type { Content } from '../models/Content';
import type { Country } from '../models/Country';
import type { CurrentPackage } from '../models/CurrentPackage';
import type { CustomerAreaInitResultResponse } from '../models/CustomerAreaInitResultResponse';
import type { CustomerAreaMainPageResultResponse } from '../models/CustomerAreaMainPageResultResponse';
import type { CustomerAreaUserVerifyResultResponse } from '../models/CustomerAreaUserVerifyResultResponse';
import type { CustomPackage } from '../models/CustomPackage';
import type { GtcAdsAgencyResponse } from '../models/GtcAdsAgencyResponse';
import type { GtcAdsDirectResponse } from '../models/GtcAdsDirectResponse';
import type { ManageNumbersInitSuccessResultResponse } from '../models/ManageNumbersInitSuccessResultResponse';
import type { MetaSuccess } from '../models/MetaSuccess';
import type { NumberPriceList } from '../models/NumberPriceList';
import type { PackagesList } from '../models/PackagesList';
import type { PaymentResponse } from '../models/PaymentResponse';
import type { PlanSummaryCallCardNumber } from '../models/PlanSummaryCallCardNumber';
import type { PlanSummaryUserVerify } from '../models/PlanSummaryUserVerify';
import type { ReferenceItems } from '../models/ReferenceItems';
import type { ServiceItems } from '../models/ServiceItems';
import type { SpamApiReportsInitResponse } from '../models/SpamApiReportsInitResponse';
import type { SpamApiReportsList } from '../models/SpamApiReportsList';
import type { SpamApiResponse } from '../models/SpamApiResponse';
import type { TagViewReportsInitResponse } from '../models/TagViewReportsInitResponse';
import type { TagViewReportsList } from '../models/TagViewReportsList';
import type { TagViewResponse } from '../models/TagViewResponse';
import type { TotalAmountObject } from '../models/TotalAmountObject';
import type { UserVerificationReportsInitResponse } from '../models/UserVerificationReportsInitResponse';
import type { UserVerifyReportsList } from '../models/UserVerifyReportsList';
import type { UserVerifyRequestParams } from '../models/UserVerifyRequestParams';
import type { UserVerifyResponse } from '../models/UserVerifyResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Use this method to get business types and countries to be used in register page.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getRegister({
        lang,
    }: {
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            business_type_list?: Array<BusinessType>;
            country_list?: Array<Country>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/register',
            query: {
                'lang': lang,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to create a new business company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postRegister({
        lang,
        body,
    }: {
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * Which page to redirect.
             */
            profileForm?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/register',
            query: {
                'lang': lang,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get customer area menu items, langugage list, help, contact and business company info.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getInit({
        xBusinessToken,
        lang,
        googleAnalyticsClientKey,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        /** GA Client key on user browser (example: GA.1111.01.22321) **/
        googleAnalyticsClientKey?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: CustomerAreaInitResultResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/init',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
                'Google Analytics Client Key': googleAnalyticsClientKey,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to login customers to the app.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postLogin({
        lang,
        body,
    }: {
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * Which page to redirect.
             */
            redirectTo?: string;
            /**
             * Which page to redirect.
             */
            businessLandingApiToken?: {
                /**
                 * Token
                 */
                token?: string;
                /**
                 * How many seconds for token to expire.
                 */
                expiresAt?: number;
            };
            /**
             * Which page to redirect.
             */
            businessCompany?: {
                /**
                 * Business Company account name
                 */
                accountName?: string;
                /**
                 * Business Company email address.
                 */
                email?: string;
                /**
                 * Two digit region code (`ISO 3166-1 alpha-2 code`. example: US, TR, ...)
                 */
                country?: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            query: {
                'lang': lang,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to import business company numbers.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postNumberImport({
        xBusinessToken,
        lang,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * A message that can be shown to customer.
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/number-import',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to add a single number to business company numbers.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postNumberAdd({
        xBusinessToken,
        lang,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * A message that can be shown to customer.
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/number-add',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to update a single number to business company numbers.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postNumberUpdate({
        xBusinessToken,
        lang,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * A message that can be shown to customer.
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/number-update',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to delete a single number to business company numbers.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postNumberDelete({
        xBusinessToken,
        lang,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * A message that can be shown to customer.
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/number-delete',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to delete multiple numbers of the business company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postNumberMultipleDelete({
        xBusinessToken,
        lang,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * A message that can be shown to customer.
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/number-multiple-delete',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the phone numbers of the company by given filters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postNumberList({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: BusinessCompanyNumberListResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/number-list',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Export csv file by given filters
     * @returns any Csv file was exported on success response
     * @throws ApiError
     */
    public static postNumberExport({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/number-export',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Create a business api token by given name to use business api
     * @returns any Successful response
     * @throws ApiError
     */
    public static postCreateBusinessApiToken({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: BusinessApiTokenTransactionResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/create-business-api-token',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Updates a business api token by given parameters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postUpdateBusinessApiToken({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: BusinessApiTokenTransactionResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/update-business-api-token',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Delete a business api token by given ID
     * @returns any Successful response
     * @throws ApiError
     */
    public static postBusinessApiTokenDelete({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: BusinessApiTokenTransactionResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/business-api-token-delete',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the business api tokens of the company by given filters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postBusinessApiTokenList({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: BusinessApiTokenList;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/business-api-token-list',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get customer area main page information.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getMainPage({
        xBusinessToken,
        lang,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: CustomerAreaMainPageResultResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/main-page',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get customer area main page information.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getUserVerifyInit({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: CustomerAreaUserVerifyResultResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user-verify-init',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to sign-out.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getSignOut({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sign-out',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                401: `Unauthorized request. Request with passive, invalid, inactive or expired token.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to change language.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postChangeLanguage({
        xBusinessToken,
        lang,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/change-language',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
            },
            errors: {
                401: `Unauthorized request. Request with passive, invalid, inactive or expired token.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * This method does confirms user's email.
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public static getEmailCallback({
        hash,
    }: {
        /** It must be attached to the hash link sent to the user. Like this: /email-callback?hash=123123 **/
        hash: string,
    }): CancelablePromise<{
        success?: boolean;
        token?: string;
        tokenExpiredTime?: string;
        redirectTo?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/email-callback',
            query: {
                'hash': hash,
            },
            errors: {
                401: `Unauthorized request. Request with passive, invalid, inactive or expired token.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to create password for customers to the app.
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public static postCreatePassword({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * Message for the endpoint
             */
            message?: string;
            /**
             * Which page to redirect.
             */
            redirectTo?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/create-password',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to create new password for customers to the app.
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public static postForgotPassword({
        body,
    }: {
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * Which page to redirect.
             */
            redirectTo?: string;
            /**
             * Message for the endpoint
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/forgot-password',
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * This method does redirection for password reset.
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public static getForgotPasswordCallback({
        hash,
    }: {
        /** It must be attached to the hash link sent to the user. Like this: /forgot-password-callback?hash=123123 **/
        hash: string,
    }): CancelablePromise<{
        success?: boolean;
        tempToken?: string;
        redirectTo?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/forgot-password-callback',
            query: {
                'hash': hash,
            },
            errors: {
                401: `Unauthorized request. Request with passive, invalid, inactive or expired token.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get caller area menu items.
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public static getCallerIdInit({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: CallerIdInitSuccessResultResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/caller-id-init',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to change currency.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postChangeCurrency({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/change-currency',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                401: `Unauthorized request. Request with passive, invalid, inactive or expired token.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Get the users call count count.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getCallCardCount({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * call card count
             */
            callCardCount?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/call-card-count',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get all caller id categories.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getCallCardInit({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: CallCardInitResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/call-card-init',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get call card reports init page.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getCallCardReportsInit({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: CallCardReportsInitResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/call-card-reports-init',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get user verify reports init page.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getUserVerifyReportsInit({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: UserVerificationReportsInitResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user-verify-reports-init',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get tag view reports init page.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getTagViewReportsInit({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: TagViewReportsInitResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tag-view-reports-init',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get spam-api reports init page.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getSpamApiReportsInit({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: SpamApiReportsInitResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/spam-api-reports-init',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to upload business company files.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postUploadFiles({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * A message that can be shown to customer.
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/upload-files',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to retreive active call card packages for the business customer of the sent X-Business-Token
     * @returns any Successful response
     * @throws ApiError
     */
    public static getCallCardPackages({
        xBusinessToken,
        lang,
        page,
        limit,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        /** page of the paginated list. **/
        page?: number,
        /** Maximum number of records shown in the paginated list. **/
        limit?: number,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            currentPackage?: CurrentPackage;
            /**
             * Pagination info and data for packages
             */
            packagesList?: PackagesList;
            customPackage?: CustomPackage;
            /**
             * Header info title and description
             */
            content?: Content;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/call-card-packages',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to retrieve active call card and number packages for the business customer of the sent X-Business-Token
     * @returns any Successful response
     * @throws ApiError
     */
    public static postCallCardNumberPackages({
        xBusinessToken,
        lang,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            callCardPackages?: {
                currentPackage?: CurrentPackage;
                /**
                 * Pagination info and data for packages
                 */
                packagesList?: PackagesList;
                /**
                 * Header info title and description
                 */
                content?: Content;
            };
            numberPackages?: {
                currentPackage?: CurrentPackage;
                priceList?: NumberPriceList;
                /**
                 * Pagination info and data for packages
                 */
                packagesList?: PackagesList;
                /**
                 * Header info title and description
                 */
                content?: Content;
                /**
                 * Gives information about is subcription reactivate or not
                 */
                isReactivatable?: boolean;
            };
            totalAmount?: TotalAmountObject;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/call-card-number-packages',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to retreive active number packages for the business customer of the sent X-Business-Token
     * @returns any Successful response
     * @throws ApiError
     */
    public static getNumberPackages({
        xBusinessToken,
        lang,
        page,
        limit,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        /** page of the paginated list. **/
        page?: number,
        /** Maximum number of records shown in the paginated list. **/
        limit?: number,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            currentPackage?: CurrentPackage;
            priceList?: NumberPriceList;
            /**
             * Pagination info and data for packages
             */
            packagesList?: PackagesList;
            customPackage?: CustomPackage;
            /**
             * Header info title and description
             */
            content?: Content;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/number-packages',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to retreive active user verify packages for the business customer of the sent X-Business-Token
     * @returns any Successful response
     * @throws ApiError
     */
    public static getUserVerifyPackages({
        xBusinessToken,
        lang,
        page,
        limit,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        /** page of the paginated list. **/
        page?: number,
        /** Maximum number of records shown in the paginated list. **/
        limit?: number,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            currentPackage?: CurrentPackage;
            /**
             * Pagination info and data for packages
             */
            packagesList?: PackagesList;
            customPackage?: CustomPackage;
            /**
             * Header info title and description
             */
            content?: Content;
            /**
             * Status to list the tag viewing plan for current company.
             */
            isTagViewActive?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user-verify-packages',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to retrieve active tag view packages for the business customer of the sent X-Business-Token
     * @returns any Successful response
     * @throws ApiError
     */
    public static getTagViewPackages({
        xBusinessToken,
        lang,
        page,
        limit,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        /** page of the paginated list. **/
        page?: number,
        /** Maximum number of records shown in the paginated list. **/
        limit?: number,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            currentPackage?: CurrentPackage;
            /**
             * Pagination info and data for packages
             */
            packagesList?: PackagesList;
            customPackage?: CustomPackage;
            /**
             * Header info title and description
             */
            content?: Content;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tag-view-packages',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Get active package types for given business customer
     * @returns any Successful response
     * @throws ApiError
     */
    public static getSinglePackagesInit({
        xBusinessToken,
        lang,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * List of active packages
             */
            packagesTypes?: any[];
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/single-packages-init',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to retrieve active single packages for the business customer of the sent X-Business-Token
     * @returns any Successful response
     * @throws ApiError
     */
    public static getSinglePackages({
        xBusinessToken,
        lang,
        page,
        limit,
        type,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        /** page of the paginated list. **/
        page?: number,
        /** Maximum number of records shown in the paginated list. **/
        limit?: number,
        /** Business package type for listing the single packages **/
        type?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            currentPackage?: CurrentPackage;
            /**
             * Pagination info and data for packages
             */
            packagesList?: PackagesList;
            customPackage?: CustomPackage;
            /**
             * Status to list the tag viewing plan for current company.
             */
            isTagViewActive?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/single-packages',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
                'page': page,
                'limit': limit,
                'type': type,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to retreive active boost ads packages for the business customer of the sent X-Business-Token
     * @returns any Successful response
     * @throws ApiError
     */
    public static getBoostAdsPackages({
        xBusinessToken,
        lang,
        page,
        limit,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code (`ISO 639-1:2002 code`. example: en, tr, ...) **/
        lang?: string,
        /** page of the paginated list. **/
        page?: number,
        /** Maximum number of records shown in the paginated list. **/
        limit?: number,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            currentPackage?: CurrentPackage;
            /**
             * Pagination info and data for packages
             */
            packagesList?: PackagesList;
            customPackage?: CustomPackage;
            /**
             * Header info title and description
             */
            content?: Content;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/boost-ads-packages',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            query: {
                'lang': lang,
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to list company's call cards with waiting and active status.
     * @returns any Successful response, the company has 1 card with waiting status on this example. The response can contain many items or be empty.
     * @throws ApiError
     */
    public static getCallerIdList({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Waiting and active call cards of the business company
             */
            caller_id_list?: Array<CallCardWaiting>;
            /**
             * Call cards table fields come through with translation
             */
            caller_id_field?: Array<CallCardListField>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/caller-id-list',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                401: `Unauthorized request. Request with passive, invalid, inactive or expired token.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * The business company uses this method to create a callcard.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postCallerIdCreate({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Always returns true
             */
            success?: boolean;
            /**
             * A message that can be shown to customer.
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/caller-id-create',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. Request with missing or invalid parameters (invalid category id, invalid label, invalid profile picture etc.)`,
                401: `Unauthorized request. Request with passive, invalid, inactive or expired token.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get a lang and cdnUrl value for localization.
     * @returns any Successful response. If no cdn url is found matching the X-Lang header value, the response would be 'en', with the cdnUrl associated with 'en'.
     * @throws ApiError
     */
    public static getLocalization({
        xLang,
    }: {
        /** Two digit lang code. Example: en, tr, ... **/
        xLang?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Language value
             */
            lang?: string;
            /**
             * Cdn url value
             */
            cdnUrl?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/localization',
            headers: {
                'X-Lang': xLang,
            },
            errors: {
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get fields for creating manage numbers page. This endpoint returns different response if BusinessCompany has existing numbers.
     * @returns any Successful response. If there is no existing BusinessCompanyNumber
     * @throws ApiError
     */
    public static getManageNumbersInit({
        xBusinessToken,
        xLang,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code. Example: en, tr, ... **/
        xLang?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: ManageNumbersInitSuccessResultResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/manage-numbers-init',
            headers: {
                'X-Business-Token': xBusinessToken,
                'X-Lang': xLang,
            },
            errors: {
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Get informations of payment form as cards, convenience of wallet payment and total amount
     * @returns any Successful response
     * @throws ApiError
     */
    public static postPlanSummaryUserVerify({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: PlanSummaryUserVerify;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/plan-summary-user-verify',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Get informations of payment form as cards, convenience of wallet payment and total amount
     * @returns any Successful response
     * @throws ApiError
     */
    public static postPlanSummaryCallCardNumber({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: PlanSummaryCallCardNumber;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/plan-summary-call-card-number',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this endpoint to receive the package's price, associated with the given number.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postNumberPackageCalculatePrice({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Total price
             */
            totalAmount?: number;
            /**
             * Currency name
             */
            totalAmountCurrency?: string;
            /**
             * Text representation of the total amount price and currency.
             */
            totalAmountText?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/number-package-calculate-price',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. Request with missing or invalid 'package_number' parameter.`,
                401: `Unauthorized request. Request with passive, invalid, inactive or expired token.`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the phone numbers of the company by given filters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postCallCardReports({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            callCardReportsList?: CallCardReportsList;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/call-card-reports',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the phone numbers of the company by given filters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postUserVerifyReports({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            userVerifyReportsList?: UserVerifyReportsList;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user-verify-reports',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the tag viewing reports of the company by given filters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postTagViewReports({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            tagViewReportList?: TagViewReportsList;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tag-view-reports',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the spam-api reports of the company by given filters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postSpamApiReports({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            tagViewReportList?: SpamApiReportsList;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/spam-api-reports',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the phone numbers of the company by given filters
     * @returns any Csv file was exported on success response
     * @throws ApiError
     */
    public static postExportCallCardReports({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/export-call-card-reports',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the phone numbers of the company by given filters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postExportUserVerifyReports({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Returns true if sending mail is successful
             */
            success?: boolean;
            /**
             * Returns success if sending mail is successful
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/export-user-verify-reports',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Export the reports of the company by given filters for any types of single(having only filters by start and end dates) package
     * @returns any Csv file was exported on success response
     * @throws ApiError
     */
    public static postExportReports({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/export-reports',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the phone numbers of the company by given filters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postExportCallCardReportsMail({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Returns true if sending mail is successful
             */
            success?: boolean;
            /**
             * Returns success if sending mail is successful
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/export-call-card-reports-mail',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List the phone numbers of the company by given filters
     * @returns any Successful response
     * @throws ApiError
     */
    public static postExportUserVerifyReportsMail({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Returns true if sending mail is successful
             */
            success?: boolean;
            /**
             * Returns success if sending mail is successful
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/export-user-verify-reports-mail',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Send email the reports of the company by given filters for any types of single(having only filters by start and end dates) package
     * @returns any Successful response
     * @throws ApiError
     */
    public static postExportReportsMail({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Returns true if sending mail is successful
             */
            success?: boolean;
            /**
             * Returns success if sending mail is successful
             */
            message?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/export-reports-mail',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted request sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Export csv file by given filters
     * @returns any Csv file was exported on success response
     * @throws ApiError
     */
    public static postExampleCsv({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/example-csv',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * To buy a single package, use this service to handle payment request. If redirectUrl is empty, you must handle the result yourself. If not, you must open that link, then page will be automatically redirected to success or failure url.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postPayUserVerify({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: PaymentResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pay-user-verify',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * To buy a bundle package, use this service to handle payment request. If redirectUrl is empty, you must handle the result yourself. If not, you must open that link, then page will be automatically redirected to success or failure url.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postPayBundle({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: PaymentResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pay-bundle',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this service to cancel a certaion subscription.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postCancelSubscription({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: CancelSubscriptionResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cancel-subscription',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Business Company Subscription to Custom Single Package
     * @returns any Successful response
     * @throws ApiError
     */
    public static postPackageManagementUserVerifyCustomPackage({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Success Message
             */
            success?: any;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/package-management/user-verify/custom-package',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Business Company Subscription to Custom Number and Call Card Package
     * @returns any Successful response
     * @throws ApiError
     */
    public static postPackageManagementNumberAndCallCardPackageCustomPackage({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Success Message
             */
            success?: any;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/package-management/number-and-call-card-package/custom-package',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this endpoint to receive Google Site Key and if the endpoint requested needs to use Google Recaptcha
     * @returns any Successful response
     * @throws ApiError
     */
    public static postGoogleRecaptchaKey({
        body,
    }: {
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Returns true if requested endpoint needs to be verified via recaptcha.
             */
            useRecaptcha?: boolean;
            /**
             * Returns Google Site Key to be used in the g-recaptcha-response request if useRecaptcha is true.
             */
            googleRecaptchaKey?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/google-recaptcha-key',
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this endpoint to get the service options, that will be shown on contact-us form
     * @returns any Successful response
     * @throws ApiError
     */
    public static getContactUs(): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * List that holds service values
             */
            serviceList?: Array<ServiceItems>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/contact-us',
            errors: {
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this endpoint to create a contact us record
     * @returns any Successful response
     * @throws ApiError
     */
    public static postContactUs({
        body,
    }: {
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Success Message
             */
            success?: any;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/contact-us',
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, ip or email has reached the limit`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this endpoint to get the reference and service options, that will be shown on quotation form
     * @returns any Successful response
     * @throws ApiError
     */
    public static getQuotationRequest(): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * List that holds reference values
             */
            referenceList?: Array<ReferenceItems>;
            /**
             * List that holds service values
             */
            serviceList?: Array<ServiceItems>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quotation-request',
            errors: {
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this endpoint to create a quotation request record
     * @returns any Successful response
     * @throws ApiError
     */
    public static postQuotationRequest({
        body,
    }: {
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Success Message
             */
            success?: any;
            /**
             * Response message
             */
            message?: any;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quotation-request',
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, ip or email has reached the limit`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * For companies that will send a plan upgrade request, endpoint that allows the request to be forwarded to the team.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postPackageUpgradeRequest({
        body,
    }: {
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Returns true if requested endpoint needs to be verified via recaptcha.
             */
            result?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/package-upgrade-request',
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method to get fields for creating create token page.
     * @returns any Successful response.
     * @throws ApiError
     */
    public static getBusinessApiCreateTokenInit({
        xBusinessToken,
        xLang,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        /** Two digit lang code. Example: en, tr, ... **/
        xLang?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: BusinessApiCreateTokenInitSuccessResultResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business-api-create-token-init',
            headers: {
                'X-Business-Token': xBusinessToken,
                'X-Lang': xLang,
            },
            errors: {
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this endpoint for getting static page contents. Such as privacy policy or terms and conditions.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postStaticPage({
        xLang,
        body,
    }: {
        /** Two digit lang code. Example: en, tr, ... **/
        xLang?: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Success Message
             */
            success?: any;
            /**
             * Content of the requested static page.
             */
            content?: string;
            /**
             * Two digit lang code of the response's content. This might be different from what you requested. If a static page with the requested langCode can not be found response will return the English version of it.
             */
            langCode?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/static-page',
            headers: {
                'X-Lang': xLang,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this endpoint for accept popup terms in the context of a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static postAcceptPopupTerms({
        xLang,
    }: {
        /** Two digit lang code. Example: en, tr, ... **/
        xLang?: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: AcceptPopupTermsResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accept-popup-terms',
            headers: {
                'X-Lang': xLang,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Endpoint fetching the contents of the filters required for the call card report page
     * @returns any Successful response
     * @throws ApiError
     */
    public static postCallCardReportsFilters({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: CallCardReportsFiltersResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/call-card-reports-filters',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Endpoint gives landing api init response
     * @returns any Successful response
     * @throws ApiError
     */
    public static getLandingInit(): CancelablePromise<{
        meta?: MetaSuccess;
        result?: BusinessLandingInitResponse;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/landing-init',
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * List all api packages as well as current package of company the if exist.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getAllSinglePackages({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            buss_userverify?: {
                /**
                 * Current package object of the company of the package prefix node. Null if no current package.
                 */
                currentPackage?: CurrentPackage;
                packagesList?: PackagesList;
                /**
                 * Gives information about is subcription reactivate or not
                 */
                isReactivatable?: boolean;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/all-single-packages',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Endpoint import gtc ads agency request to business
     * @returns any Successful response
     * @throws ApiError
     */
    public static postGtcAdsAgency({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: GtcAdsAgencyResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/gtc-ads-agency',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Endpoint import gtc ads direct request to business
     * @returns any Successful response
     * @throws ApiError
     */
    public static postGtcAdsDirect({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: GtcAdsDirectResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/gtc-ads-direct',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Business Company Subscription to Custom Single Package
     * @returns any Successful response
     * @throws ApiError
     */
    public static postPackageManagementCustomPackage({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * Success Message
             */
            success?: any;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/package-management/custom-package',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, etc.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Use this method for getting is customer country in EEA Countries
     * @returns any Successful response
     * @throws ApiError
     */
    public static getConsentMode({
        xBusinessToken,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: {
            /**
             * true/false
             */
            status?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/consent-mode',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            errors: {
                400: `Bad request. 400000: contentType is not valid, json body invalid, vs.`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * User verify endpoint from gtc.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postVerifyUser({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: UserVerifyRequestParams,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: UserVerifyResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/verify-user',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: Invalid phone number`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Spam api endpoint from gtc.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postSpamApi({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: SpamApiResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/spam-api',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: Invalid phone number`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

    /**
     * Spam api endpoint from gtc.
     * @returns any Successful response
     * @throws ApiError
     */
    public static postTagView({
        xBusinessToken,
        body,
    }: {
        /** b5060d949025bfcc28c7b6db430348d93abe905e95ce519eb98e89... **/
        xBusinessToken: string,
        body?: any,
    }): CancelablePromise<{
        meta?: MetaSuccess;
        result?: TagViewResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tag-view',
            headers: {
                'X-Business-Token': xBusinessToken,
            },
            body: body,
            errors: {
                400: `Bad request. 400000: Invalid phone number`,
                401: `403003: Request signature mismatch. 403025: Request decryption error (if encrypted requst sent by client).`,
                500: `Unexpected error.`,
            },
        });
    }

}