import { atom } from 'recoil'

const user_token = atom({
  key: "UserToken",
  default: null,
});

export { user_token }
