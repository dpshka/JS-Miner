export default function (min: number) {
  return {
    $validator: function (value: string) {
      const adjoining = value.replace(/\s+/g, "");
      return value === "" || adjoining.length > min;
    },
    $message: ({ $params }: { $params: { min: number } }) =>
      `Should be min ${$params.min} characters.`,
    $params: { min, type: "minLengthWithMask" },
  };
}
