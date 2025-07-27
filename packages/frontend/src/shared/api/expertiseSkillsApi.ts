import { api } from "./api";

export const expertiseSkillsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExpertiseSkills: build.query<
      {
        id: number;
        category: string;
        name: string;
        level?: string;
      }[],
      string
    >({
      query: (userId) => `expertise-skills/${userId}`,
    }),
    createExpertiseSkill: build.mutation<
      void,
      {
        user_id: string;
        category: string;
        name: string;
        level?: string;
      }
    >({
      query: ({ user_id, ...rest }) => ({
        url: `expertise-skills/${user_id}`,
        method: "POST",
        body: rest,
      }),
    }),
    updateExpertiseSkill: build.mutation<
      any,
      {
        user_id: string;
        id: number;
        category: string;
        name: string;
        level?: string;
      }
    >({
      query: ({ user_id, id, ...body }) => ({
        url: `expertise-skills/${user_id}/${id}/visibility`,
        method: "PUT",
        body,
      }),
    }),
    deleteExpertiseSkill: build.mutation<void, { user_id: string; id: number }>(
      {
        query: ({ user_id, id }) => ({
          url: `expertise-skills/${user_id}/${id}`,
          method: "DELETE",
        }),
      }
    ),
  }),
});

export const {
  useGetExpertiseSkillsQuery,
  useCreateExpertiseSkillMutation,
  useUpdateExpertiseSkillMutation,
  useDeleteExpertiseSkillMutation,
} = expertiseSkillsApi;
