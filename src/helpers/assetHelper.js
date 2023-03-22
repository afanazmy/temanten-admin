export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;

export const stringToHslColor = (username) => {
  let hash = 0;

  // param
  const str = username;
  const s = 50;
  const l = 50;
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let h = hash % 300;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};
