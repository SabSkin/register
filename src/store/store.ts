import { create } from "zustand";
import axios from "axios";
import { UserRegister } from "../types/types";

interface UserRegisterState {
  initialState: UserRegister | null;
  currentState: UserRegister | null;

  userNickName: boolean;
  sendUser: (data: UserRegister) => Promise<void>;
  getUser: () => Promise<void>;
  checkUser: (data: { nickname: string; password: string }) => void;
  checkNickname: (data: { nickname: string }) => void;
  checkEmail: (data: { email: any }) => void;
}

export const useUserRegister = create<UserRegisterState>((set, get) => ({
  initialState: null,
  currentState: null,

  userNickName: false,
  sendUser: async (data) => {
    try {
      const response = await axios.post(
        "https://6765561852b2a7619f5f3883.mockapi.io/test/users",
        data
      );

      console.log("Пользователь успешно зарегистрирован:", response.data);

      set(() => ({
        initialState: response.data,
      }));
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Произошла ошибка при регистрации. Попробуйте ещё раз.");
    }
  },

  getUser: async () => {
    try {
      const response = await axios.get(
        "https://6765561852b2a7619f5f3883.mockapi.io/test/users"
      );
      console.log("Полученные пользователи:", response.data);
      set(() => ({
        currentState: response.data,
      }));
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  },

  checkUser: (data: { nickname: string; password: string }) => {
    const { currentState } = get();

    if (currentState && Array.isArray(currentState)) {
      const user = currentState.find(
        (user: UserRegister) =>
          user.nickname === data.nickname && user.password === data.password
      );

      if (user) {
        alert("Добро пожаловать");
        set(() => ({ currentState: null }));
      } else {
        alert("Ошибка");
      }
    } else {
      console.log(
        "Данные пользователя не загружены или формат данных неверен."
      );
    }
  },
  checkNickname: async (data: { nickname: string }) => {
    try {
      const response = await axios.get(
        "https://6765561852b2a7619f5f3883.mockapi.io/test/users"
      );
      const userExists = response.data.some(
        (user: UserRegister) => user.nickname === data.nickname
      );

      return userExists;
    } catch (error) {
      console.error("Ошибка при проверке никнейма:", error);
      throw new Error("Не удалось проверить никнейм");
    }
  },
  checkEmail: async (data: { email: any }) => {
    try {
      const response = await axios.get(
        "https://6765561852b2a7619f5f3883.mockapi.io/test/users"
      );
      const userExists = response.data.some(
        (user: UserRegister) => user.email === data.email
      );

      return userExists;
    } catch (error) {
      console.error("Ошибка при проверке email:", error);
      throw new Error("Не удалось проверить email");
    }
  },
}));
