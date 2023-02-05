export const isPasswordValid = (password: String) => {
  if (password.length < 8) {
    throw new Error("password length should more than 8 characters");
  }
  return true;
}