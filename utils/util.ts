export const isEmail = (email: string | undefined) => {
  if (!email) {
    return false;
  }

  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
}

export const getUrl = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return isProduction ? 'https://template.dannyisadog.com' : 'http://localhost:3000'
}