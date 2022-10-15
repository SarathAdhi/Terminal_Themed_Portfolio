export const formatTitle = (title: string) => {
  return title.toLowerCase().replaceAll(" - ", " ").replaceAll(" ", "-");
};
