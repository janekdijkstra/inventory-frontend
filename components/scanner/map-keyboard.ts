export const mapENToDE = (string: string): string => {
  const res: string[] = [];

  for (let i = 0; i < string.length; i++) {
    res[i] = mapChar(string[i]);
  }

  return res.join("");
};

const mapChar = (char: string) => {
  switch (char) {
    case "Ö":
      return ":";
    case "ß":
      return "-";
    case "y":
      return "z";
    case "z":
      return "y";
    default:
      return char;
  }
};
