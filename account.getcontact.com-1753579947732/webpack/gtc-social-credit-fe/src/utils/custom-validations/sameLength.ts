export default function (count: number) {
  return {
    $validator: function (value: string) {
      const adjoining = value.replace(/\s+/g, "");
      return value === "" || adjoining.length === count;
    },
    $message: ({ $params }: { $params: { count: number } }) =>
      `Should be ${$params.count} characters.`,
    $params: { count, type: "sameLength" },
  };
}
