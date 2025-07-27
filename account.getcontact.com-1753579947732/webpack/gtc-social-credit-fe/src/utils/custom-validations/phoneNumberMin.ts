export default function (min: number) {
  return {
    $validator: function (value: string, siblings: { phone_code: string }) {
      return value?.length + siblings?.phone_code?.length >= min;
    },
    $message: ({ $params }: { $params: { min: number } }) =>
      `Should be at least ${$params.min} characters long`,
    $params: { min, type: "phoneNumberMin" },
  };
}
