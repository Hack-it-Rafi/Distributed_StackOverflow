import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/user/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
