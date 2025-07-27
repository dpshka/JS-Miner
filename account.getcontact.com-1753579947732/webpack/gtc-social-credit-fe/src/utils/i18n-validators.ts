import * as validators from "@vuelidate/validators";
import type { VueI18n } from "vue-i18n";

import i18n from "@/utils/i18n";

import alphaNumRule from "./custom-validations/isAlphaNumeric";
import isCreditCardRule from "./custom-validations/isCreditCard";
import maxLengthWithMaskRule from "./custom-validations/maxLengthWithMask";
import minLengthWithMaskRule from "./custom-validations/minLengthWithMask";
import expireTimeWithMaskRule from "./custom-validations/expireTimeWithMask";
import phoneNumberMaxRule from "./custom-validations/phoneNumberMax";
import phoneNumberMinRule from "./custom-validations/phoneNumberMin";
import sameLengthRule from "./custom-validations/sameLength";

type MessagePath = ({ $validator }: { $validator: string }) => string;

const { createI18nMessage } = validators;

const { t } = (i18n.global as unknown as VueI18n) || i18n;

// {property}, {model}, {min} gibi degiskenler kullanabiliyoruz

const messagePath: MessagePath = ({ $validator }) => `validation.${$validator}`;

// pass `t` and create your i18n message instance
const withI18nMessage = createI18nMessage({ t, messagePath });

// wrap each validator.
export const required = withI18nMessage(validators.required, { messagePath });

export const requiredIf = withI18nMessage(validators.requiredIf, {
  withArguments: true,
  messagePath,
});

export const minLength = withI18nMessage(validators.minLength, {
  withArguments: true,
  messagePath,
});

export const numeric = withI18nMessage(validators.numeric, {
  withArguments: true,
  messagePath,
});

export const fileSize = (max: number /* KB */) => (file: string) => {
  const stringLength = file.length - "data:image/png;base64,".length;
  const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
  const sizeInKb = sizeInBytes / 1000;
  return sizeInKb > max ? false : true;
};

export const fileResolution =
  (max: { width: number; height: number }) => async (file: string) => {
    const getImageDimensions = async (
      base64: string
    ): Promise<{ w: number; h: number }> => {
      return new Promise(function (resolved) {
        const i = new Image();
        i.onload = function () {
          resolved({ w: i.width, h: i.height });
        };
        i.src = base64;
      });
    };
    const sizes = await getImageDimensions(file);
    return sizes.w <= max.width || sizes.h <= max.height;
  };

export const phoneNumberMin = withI18nMessage(phoneNumberMinRule, {
  withArguments: true,
  messagePath: () => "validation.minLength",
});

export const phoneNumberMax = withI18nMessage(phoneNumberMaxRule, {
  withArguments: true,
  messagePath: () => "validation.maxLength",
});

export const sameLength = withI18nMessage(sameLengthRule, {
  withArguments: true,
  messagePath,
});

export const minLengthWithMask = withI18nMessage(minLengthWithMaskRule, {
  withArguments: true,
  messagePath,
});

export const maxLengthWithMask = withI18nMessage(maxLengthWithMaskRule, {
  withArguments: true,
  messagePath,
});

export const expireTimeWithMask = withI18nMessage(expireTimeWithMaskRule, {
  withArguments: true,
  messagePath,
});

export const isCreditCard = withI18nMessage(isCreditCardRule(), {
  withArguments: false,
  messagePath,
});

export const alphaNumeric = withI18nMessage(alphaNumRule, {
  withArguments: true,
  messagePath,
});

export const containsUppercase = (value: string) => /[A-Z]/.test(value);
export const containsLowercase = (value: string) => /[a-z]/.test(value);
export const containsNumber = (value: string) => /[0-9]/.test(value);
export const containsSpecial = (value: string) =>
  /[&/\\#,+()$~%.'":*?<=>\-_{}!]/.test(value);
export const maxLength = withI18nMessage(validators.maxLength, {
  withArguments: true,
  messagePath,
});

export const isChecked = withI18nMessage((value: boolean) => value, {
  messagePath,
});

export const sameAs = withI18nMessage(validators.sameAs, {
  withArguments: true,
  messagePath,
});

// her zaman sabit bir deger dondureceksek:
// export const maxLength = withI18nMessage(validators.maxLength(10))

export const email = withI18nMessage(validators.email, { messagePath });
