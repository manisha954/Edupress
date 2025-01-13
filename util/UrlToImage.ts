export const imageUrlToFile = async (
  imageUrl: string,
  filename: string = "image.jpg"
): Promise<File> => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};
