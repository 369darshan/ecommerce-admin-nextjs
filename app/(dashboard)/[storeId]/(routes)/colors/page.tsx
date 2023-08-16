import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";


const ColorsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col m-7">
            <div className="flex-1 space-y-4 ">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    );
}

export default ColorsPage;