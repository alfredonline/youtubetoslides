import SubmissionForm from "@/components/SubmissionForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex justify-center">
      <SubmissionForm user={user} />
    </div>
  );
};

export default Page;
