export default function (max: number) {
  return {
    $validator: function (value: string, siblings: { phone_code: string }) {
      return value?.length + siblings?.phone_code?.length <= max;
    },
    $message: ({ $params }: { $params: { max: number } }) =>
      `Should be at most ${$params.max} characters long`,
    $params: { max, type: "phoneNumberMax" },
  };
}
