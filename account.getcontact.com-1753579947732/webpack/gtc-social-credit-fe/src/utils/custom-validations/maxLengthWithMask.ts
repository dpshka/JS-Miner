export default function (max: number) {
  return {
    $validator: function (value: string) {
      const adjoining = value.replace(/\s+/g, "");
      return value === "" || adjoining.length <= max;
    },
    $message: ({ $params }: { $params: { max: number } }) =>
      `Should be max ${$params.max} characters.`,
    $params: { max, type: "maxLengthWithMask" },
  };
}
