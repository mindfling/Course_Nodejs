export const getPasswordCharsetLength = (charset = ' ', length = 8) => {
  // password from charset
  let password = '';
  // генерируем пароль точной длины с готоворо charset
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * charset.length);
    password += charset[index];
  }
  // возвращаем наш пароль
  return password;
}

