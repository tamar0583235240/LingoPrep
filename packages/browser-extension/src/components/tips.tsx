import { Wrench } from "lucide-react";
import { getTips } from "../api/api";
import { CardWrapper } from "../ui/CardWrapper";
import { useEffect, useState } from "react";

export const Tips = ({ token }: { token: string }) => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        getTips(token).then((tips) => {
            setData(tips);
        });
    }, [token]);
    return (
        <CardWrapper
            title="הצעות לשיפור מה-AI"
            icon={<Wrench size={24} />}
        >
            <div
                className="overflow-y-auto pr-2 scrollbar-none h-64"
                style={{ maxHeight: "13rem" }}
            >
                <ul className="space-y-4">
                    {data.map((item) => (
                        <li key={item.id} className="flex items-center gap-3 text-[--color-text] bg-white p-2 rounded-lg">
                            <span>{item.improvements}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </CardWrapper>
    );
};
