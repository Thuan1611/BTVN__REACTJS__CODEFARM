export const dateTime = () => {
  const date = new Date();
  const newData = new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).formatToParts(date);
  const get = (type) => {
    const { value } = newData.find((p) => {
      if (p.type == type) {
        return p.value;
      }
    });
    return value;
  };
  const day = get("day");
  const month = get("month").split(" ")[1];
  const year = get("year");
  const minute = get("minute");
  const hour = get("hour");
  const hours = `${hour}:${minute}`;
  return [hours, hour, day, month, year];
};
