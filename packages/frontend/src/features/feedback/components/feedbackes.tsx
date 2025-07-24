

import { useState } from "react"
import { MessageCircle, ChevronDown, ChevronUp, User, Calendar } from "lucide-react"
import { useGetFeedbacksBySharedRecordingIdQuery } from "../services/feedbackApi"
import { Users } from "../types/UsersType"
import { Button } from "../../../shared/ui/button"
import { CardSimple } from "../../../shared/ui/card"
import { GridContainer } from "../../../shared/ui/GridContainer"
import { IconWrapper } from "../../../shared/ui/IconWrapper"
import { SummaryBox } from "../../../shared/ui/SummaryBox"
import { Heading1, Paragraph } from "../../../shared/ui/typography"


import { feedbackType } from "../types/feedbackType";



export const Feedbackes = ({
    props,
}: {
    props: { sharedRecordingId: string; usersList: Users[] };
}) => {
    const { sharedRecordingId, usersList } = props;
    const {
        data: feedbacks,
        isLoading,
        error,
    } = useGetFeedbacksBySharedRecordingIdQuery(sharedRecordingId);

    const [flagShow, setFlagShow] = useState<boolean>(false);

    function getUserName(userId: string): string {
        const user = usersList.find((user) => user.id === userId);
        return user ? `${user.first_name} ${user.last_name}` : "Unknown User";
    }

    function showFeedbacks(): void {
        console.log(feedbacks);
        setFlagShow(!flagShow);
        console.log(error);
    }

    if (isLoading) {
        return (
            <GridContainer maxWidth="lg" className="text-center">
                <CardSimple className="p-8">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                </CardSimple>
            </GridContainer>
        )
    }

    if (error) {
        return (
            <GridContainer maxWidth="lg">
                <CardSimple className="p-6 border-red-200 bg-red-50">
                    <div className="flex items-center gap-3 text-red-600">
                        <IconWrapper color="danger" size="md">
                            <MessageCircle size={20} />
                        </IconWrapper>
                        <Paragraph className="text-red-600 mb-0">
                            שגיאה בטעינת הפידבקים. אנא נסה שוב מאוחר יותר.
                        </Paragraph>
                    </div>
                </CardSimple>
            </GridContainer>
        )
    }

    return (
        <GridContainer maxWidth="lg" className="space-y-6">

            <div className="flex justify-center">
                <Button
                    onClick={showFeedbacks}  
                    variant="primary-dark"
                    size="lg"
                    icon={flagShow ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    iconPosition="right"
                    className="min-w-[200px]"
                >
                    {flagShow ? 'הסתר פידבקים' : 'הצג פידבקים'} ({feedbacks?.length || 0}) 
                </Button>

            </div>

           
            {flagShow && (
                <div className="space-y-4">
                    {feedbacks && feedbacks.length > 0 ? (
                        <div className="grid gap-4">
                            {feedbacks.map(f => (
                                <CardSimple key={f?.id} className="p-6 hover:shadow-md transition-shadow">
                                    <div className="space-y-4">
                                       
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                            <div className="flex items-center gap-3">
                                                <IconWrapper color="muted" size="sm">
                                                    <User size={16} />
                                                </IconWrapper>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        {getUserName(f?.given_by_user_id)}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Calendar size={16} />
                                                <span className="text-sm">
                                                    {f?.created_at && new Date(f.created_at).toLocaleDateString('he-IL')}
                                                </span>
                                            </div>
                                        </div>

                                     
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <Paragraph className="text-gray-800 leading-relaxed mb-0">
                                                {f?.comment || 'אין תוכן פידבק'}
                                            </Paragraph>
                                        </div>
                                    </div>
                                </CardSimple>
                            ))}
                        </div>
                    ) : (
                        <CardSimple className="p-8 text-center">
                            <IconWrapper color="muted" size="lg" className="mx-auto mb-4">
                                <MessageCircle size={24} />
                            </IconWrapper>
                            <Paragraph className="text-gray-500 mb-0">
                                עדיין לא התקבלו פידבקים על ההקלטה הזו
                            </Paragraph>
                        </CardSimple>
                    )}
                </div>
            )}
        </GridContainer>
    )
}