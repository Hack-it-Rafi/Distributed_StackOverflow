
import { TQueryParam } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";

const userAccessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/post",
          method: "GET",
          params: params,
        };
      },
    }),

    getSinglePost: builder.query({
      query: (roomId: string) => {
        return {
          url: `/post/${roomId}`,
          method: "GET",
        };
      },
    }),

    getPostFile: builder.query({
      query: (fileName: string) => {
        return {
          url: `/post/file/${fileName}`,
          method: "GET",
        };
      },
    }),

    createPost: builder.mutation({
      query: (data) => {
        return {
          url: "/post/create-Post",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["posts"],
    }),

    getAllNotifications: builder.query({
      query: (args?) => ({
        url: "/notification",
        method: "GET",
      }),
    }),

    updateNotifications: builder.mutation({
      query: (args) => ({
        url: `/notification/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["notifications"],
    }),
    
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useGetPostFileQuery,
  useGetAllNotificationsQuery,
  useUpdateNotificationsMutation,
  useCreatePostMutation,
  
} = userAccessApi;
