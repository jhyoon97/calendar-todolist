export default {
  weekday: (value: string | number): string => {
    switch (value) {
      case 1: // dayjs.get("day")
        return "월";
      case 2: // dayjs.get("day")
        return "화";
      case 3: // dayjs.get("day")
        return "수";
      case 4: // dayjs.get("day")
        return "목";
      case 5: // dayjs.get("day")
        return "금";
      case 6: // dayjs.get("day")
        return "토";
      case 0: // dayjs.get("day")
        return "일";
      default:
        return "-";
    }
  },
};
