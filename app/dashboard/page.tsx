import SectionTitle from "@/components/common/SectionTitle";
import prisma from "@/lib/prisma";
import { GeneratedPowerpoint, UserDB } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FaFaceSadTear } from "react-icons/fa6";
import PresentationCard from "@/components/cards/PresentationCard";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();

  if (!user) {
    redirect("/");
  }

  const dbUser: UserDB | null = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      powerpoints: true,
    },
  });

  if (!dbUser) {
    redirect("/auth-callback");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center flex-wrap">
        <SectionTitle
          title="Your presentations"
          paragraph="Here are the presentations you've generated."
        />
        <Link
          href="/generate"
          className={buttonVariants({
            variant: "default",
          })}
        >
          Generate new slides
        </Link>
      </div>
      <div className="mt-8">
        {dbUser.powerpoints.length === 0 ? (
          <div>
            <div className="text-center">
              <FaFaceSadTear className="h-12 w-12 text-gray-500 mx-auto mt-10" />
              <h2 className="text-2xl font-semibold text-gray-900 mt-6">
                You have no presentations yet.
              </h2>
              <p className="text-gray-500 mt-6">
                You can generate a new presentation by clicking the button
                above.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {dbUser.powerpoints?.reverse().map((Powerpoint: GeneratedPowerpoint) => (
              <div key={Powerpoint.id}>
                <PresentationCard
                    presentation={Powerpoint}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
