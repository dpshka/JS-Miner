import * as validators from "@vuelidate/validators";

export default function (param: string) {
  return {
    $validator: function (value: string) {
      return validators.alphaNum.$validator(value, null, null);
    },
    $params: { param, type: "alphaNum" },
  };
}
