import { PublicProfile } from '../types/PublicProfile';
import { api } from '../../../shared/api/api';

export const publicProfileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPublicProfile: builder.query<PublicProfile, string>({
            query: (slug) => `/public-profile/${slug}`,
        }),
    }),
});

export const { useGetPublicProfileQuery } = publicProfileApi;