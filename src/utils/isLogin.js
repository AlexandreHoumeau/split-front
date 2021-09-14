export const isLogin = () => {
  if (localStorage.getItem('SPLIT_TOKEN')) {
      return true;
  }

  return false;
}