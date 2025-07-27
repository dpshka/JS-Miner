export default function (time: string) {
  return {
    $validator: function (value: string) {
      const match = value.match(/^(\d{2})\/(\d{4})$/);

      if (!match) {
        return false;
      }

      const [_, month, year] = match;
      const monthInt = parseInt(month, 10);

      if (monthInt < 1 || monthInt > 12) {
        return false;
      }

      const yearInt = parseInt(year, 10);
      const currentYear = new Date().getFullYear();

      if (yearInt < currentYear) {
        return false;
      }

      const currentMonth = new Date().getMonth() + 1;

      if (yearInt === currentYear && monthInt < currentMonth) {
        return false;
      }

      return true;
    },
    $message: ({ $params }: { $params: { time: string } }) =>
      `Should be available time format.`,
    $params: { time, type: "expireTimeWithMask" },
  };
}
