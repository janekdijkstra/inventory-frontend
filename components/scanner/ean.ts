export const isEan = (candidate: string): boolean => {
  if (candidate.length != 13) {
    return false;
  }
  if (!/^\d+$/.test(candidate)) {
    return false;
  }

  let specialSum = 0;
  for (let i = 0; i < 12; i++) {
    const factor = i % 2 === 0 ? 1 : 3;
    specialSum += (factor * +candidate[i]) % 10;
  }
  const checksum = (10 - (specialSum % 10)) % 10;
  return checksum === +candidate[12];
};
