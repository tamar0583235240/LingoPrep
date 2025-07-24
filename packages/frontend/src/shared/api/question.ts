import { ProgressStats } from '../../features/dashboard/types/aiInsightsType';
import { api } from './api';


export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProgressStats: builder.query<ProgressStats, string>({
            query: (userId) => `questions/progress/${userId}`,
        })
    })
})
export const {
    useGetProgressStatsQuery
} = authApi;
