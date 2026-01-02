export const formatDateKorean = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });
};
