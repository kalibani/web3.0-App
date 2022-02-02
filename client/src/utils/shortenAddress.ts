export const shortenAdress = (address: string | any) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
