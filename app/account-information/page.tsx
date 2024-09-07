import SectionTitle from "@/components/common/SectionTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();

  if (!user) {
    redirect("/");
  }

  const userInDB = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!userInDB) {
    redirect("/auth-callback");
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <SectionTitle
        title="Account Information"
        paragraph="Everything about your account."
      />
      <div className="flex flex-col mt-10">
        <h2 className="text-2xl font-semibold">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <Card>
            <CardHeader className="font-semibold text-lg">Name</CardHeader>
            <CardContent>
              <span>{userInDB?.name.split(" ")[0]}</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="font-semibold text-lg">
              Gem Balance
            </CardHeader>
            <CardContent>{userInDB.tokenCount}</CardContent>
          </Card>
          <Card>
            <CardHeader className="font-semibold text-lg">
              Total Spend
            </CardHeader>
            <CardContent>{userInDB.totalSpend}</CardContent>
          </Card>
          <Card>
            <CardHeader className="font-semibold text-lg">
              Last Purchase
            </CardHeader>
            <CardContent>{userInDB.lastCoinPurchase?.toString()}</CardContent>
          </Card>
          <Card>
            <CardHeader className="font-semibold text-lg">
              Account Created
            </CardHeader>
            <CardContent>{userInDB.createdAt?.toString()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
