"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserRegister } from "@/store/store";
import React from "react";
import { UserRegister } from "@/types/types";
import { Roboto } from "next/font/google";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoMdEye } from "react-icons/io";

const Authorization: React.FC = (): any => {
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const {
    initialState: user,
    sendUser,
    getUser,
    checkUser,
    checkNickname,
    checkEmail,
  } = useUserRegister();
  const [exists, setExists] = useState<boolean>(true);
  const [watchPass, setWatchPass] = useState<boolean>(false);
  const [watchPassReplay, setWatchPassReplay] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserRegister>();

  const onSubmit: SubmitHandler<UserRegister> = async (data) => {
    try {
      const isNicknameUsed: any = await checkNickname({
        nickname: data.nickname,
      });

      const isEmailUser: any = await checkEmail({
        email: data.email,
      });

      if (isNicknameUsed) {
        setIsNickname(true);
        return;
      }

      if (!isNicknameUsed) {
        setIsNickname(false);
      }

      if (isEmailUser) {
        setIsEmail(true);
        return;
      }

      if (!isEmailUser) {
        setIsEmail(false);
      }

      if (data.password !== data.repeatPassword) {
        alert("Пароли не совпадают. Пожалуйста, проверьте их.");
        return;
      }

      await sendUser(data);

      alert("Регистрация прошла успешно!");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      alert("Произошла ошибка. Попробуйте снова.");
    }
  };

  const handleGetUser = async (e: any) => {
    e.preventDefault();
    await getUser(), checkUser({ nickname: userName, password: userPassword });
  };

  const password = watch("password");
  return (
    <main className="w-full h-screen bg-blue-500">
      {exists === true ? (
        <div className="flex justify-center items-center">
          <div className="w-[900px] h-[600px] bg-white mt-[150px] rounded-3xl flex">
            <div className="w-[400px] h-[600px] bg-purple-600 rounded-l-3xl ">
              <h1 className="text-3xl font-medium text-center text-white pt-[200px]">
                ДОБРО ПОЖАЛОВАТЬ!
              </h1>
              <p className="text-white text-base text-center mt-[30px]">
                МЫ РАДЫ ВИДЕТЬ ВАС <br /> НА НАШЕМ САЙТЕ!
              </p>
            </div>
            <div className="w-[500px] h-[600px]">
              <h1 className="text-3xl font-medium text-center text-purple-600 pt-[50px]">
                Регистрация
              </h1>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative ">
                    <label className="sr-only">Username</label>
                    <input
                      type="text"
                      placeholder="Username"
                      className={`w-[400px] ml-[40px] mt-[20px] px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.username
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-blue-500"
                      }`}
                      {...register("username", {
                        required: "Имя обязательно!",
                      })}
                    />
                    <FaUser className="absolute ml-[40px] mt-[10px] left-3 top-1/2 transform -translate-y-1/2 text-gray-400 block" />
                    {errors.username && (
                      <p className=" absolute text-red-500 text-sm mt-1 left-[40px]">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="relative ">
                    <label className="sr-only">Email</label>
                    <input
                      type="text"
                      placeholder="Email"
                      className={`w-[400px] ml-[40px] mt-[30px] px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-blue-500"
                      }`}
                      {...register("email", {
                        required: "Email обязателен!",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Некорректный формат email",
                        },
                      })}
                    />
                    <MdEmail className="absolute ml-[40px] mt-[15px] left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    {errors.nickname && errors.nickname.message && (
                      <p className="absolute text-red-500 text-sm mt-1 left-[40px]">
                        {errors.nickname.message}
                      </p>
                    )}
                    {isEmail && (
                      <p className="absolute text-red-500 text-sm mt-1 left-[40px]">
                        Этот Email уже занят.
                      </p>
                    )}
                  </div>
                  <div className="relative ">
                    <label className="sr-only">Nickname</label>
                    <input
                      type="text"
                      placeholder="Nickname"
                      className={`w-[400px] ml-[40px] mt-[30px] px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nickname
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-blue-500"
                      }`}
                      {...register("nickname", {
                        required: "Nickname обязателен!",
                      })}
                    />
                    <FaUser className="absolute ml-[40px] mt-[15px] left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    {errors.nickname && (
                      <p className="absolute text-red-500 text-sm mt-1 left-[40px]">
                        {errors.nickname.message}
                      </p>
                    )}
                    {isNickname && (
                      <p className="absolute text-red-500 text-sm mt-1 left-[40px]">
                        Этот Nickname уже занят.
                      </p>
                    )}
                  </div>
                  <div className="relative ">
                    <label className="sr-only">Password</label>
                    <div className="flex">
                      <input
                        type={!watchPass ? "password" : "text"}
                        placeholder="Password"
                        className={`w-[400px] ml-[40px] mt-[30px] px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.password
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-blue-500"
                        }`}
                        {...register("password", {
                          required: "Пароль обязателен!",
                          minLength: {
                            value: 6,
                            message: "Пароль должен быть не менее 6 символов",
                          },
                        })}
                      />
                      <TbLockPassword className="absolute ml-[40px] mt-[15px] left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <IoMdEye
                        onClick={() => setWatchPass(!watchPass)}
                        className="mt-[37px] ml-[20px] w-[30px] h-[25px] text-gray-400 cursor-pointer "
                      />
                    </div>
                    {errors.password && (
                      <p className="absolute text-red-500 text-sm mt-1 left-[40px]">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="relative ">
                    <label className="sr-only">Repeat Password</label>
                    <div className="flex">
                      <input
                        type={!watchPassReplay ? "password" : "text"}
                        placeholder="Repeat Password"
                        className={`w-[400px] ml-[40px] mt-[30px] px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.repeatPassword
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-blue-500"
                        }`}
                        {...register("repeatPassword", {
                          required: "Повтор пароля обязателен!",
                          validate: (value) =>
                            value === password || "Пароли не совпадают",
                        })}
                      />
                      <TbLockPassword className="absolute ml-[40px] mt-[15px] left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <IoMdEye
                        onClick={() => setWatchPassReplay(!watchPassReplay)}
                        className="mt-[37px] ml-[20px] w-[30px] h-[25px] text-gray-400 cursor-pointer"
                      />
                    </div>
                    {errors.repeatPassword && (
                      <p className="absolute text-red-500 text-sm mt-1 left-[40px]">
                        {errors.repeatPassword.message}
                      </p>
                    )}
                  </div>
                  <button className="h-12 w-[400px] bg-purple-600 ml-10 border rounded-lg mt-[30px] text-gray-50">
                    ЗАРЕГЕСТРИРОВАТЬСЯ
                  </button>
                </form>
                <div className="flex justify-center items-center">
                  <p className="mt-6">Уже есть аккаунт?</p>
                  <button
                    onClick={() => setExists(!exists)}
                    className="h-12 w-[100px] bg-purple-600 ml-10 border rounded-lg mt-[20px] text-gray-50"
                  >
                    ВОЙТИ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-[900px] h-[600px] bg-white mt-[150px] rounded-3xl flex">
            <div className="w-[400px] h-[600px] bg-purple-600 rounded-l-3xl ">
              <h1 className="text-3xl font-medium text-center text-white pt-[200px]">
                ДОБРО ПОЖАЛОВАТЬ!
              </h1>
              <p className="text-white text-base text-center mt-[30px]">
                МЫ РАДЫ ВИДЕТЬ ВАС <br /> НА НАШЕМ САЙТЕ!
              </p>
            </div>
            <div className="w-[500px] h-[600px]">
              <h1 className="text-3xl font-medium text-center text-purple-600 pt-[50px] mb-8">
                Авторизация
              </h1>
              <div>
                <form onSubmit={handleGetUser}>
                  <div>
                    <label className="ml-10 mt-8 font-medium">
                      Введите nickname
                    </label>
                    <input
                      placeholder="Enter Nickname"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={`w-[400px] ml-[40px] mt-[10px] mb-8 px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nickname
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-blue-500"
                      }`}
                    />
                    <FaUser className="absolute ml-[40px] mt-[15px] left-[920px] top-[308px] transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <div>
                    <label className="ml-10 mt-12 font-medium">
                      Введите пароль
                    </label>
                    <div className="flex">
                      <input
                        type={!watchPass ? "password" : "text"}
                        placeholder="Enter password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className={`w-[400px] ml-[40px] mt-[10px] px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.password
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-blue-500"
                        }`}
                      />
                      <TbLockPassword className="absolute ml-[40px] mt-[15px] left-[920px] top-[417px] transform -translate-y-1/2 text-gray-400" />
                      <IoMdEye
                        onClick={() => setWatchPass(!watchPass)}
                        className="mt-[20px] ml-[20px] w-[30px] h-[25px] text-gray-400 cursor-pointer"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="h-12 w-[400px] bg-purple-600 ml-10 border rounded-lg mt-[30px] text-gray-50"
                  >
                    ВОЙТИ
                  </button>
                </form>
                <button
                  onClick={() => setExists(!exists)}
                  className="h-12 w-[400px] bg-purple-600 ml-10 border rounded-lg mt-[30px] text-gray-50"
                >
                  ЗАРЕГЕСТРИРОВАТЬСЯ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Authorization;
