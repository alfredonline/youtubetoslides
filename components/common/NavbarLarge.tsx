import Link from "next/link";
import { BiSolidSlideshow } from "react-icons/bi";
import { siteName } from "@/data/index";
import { buttonVariants } from "../ui/button";
import { MdOutlineDashboard } from "react-icons/md";
import { LiaGemSolid } from "react-icons/lia";
import MobileNav from "./MobileNav";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import ProfilePopover from "../ProfilePopover";
import prisma from "@/lib/prisma";

const NavbarLarge = async () => {
  const { getUser } = getKindeServerSession();
  const user = (await getUser()) as KindeUser;

  const userInDB = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
  });

  return (
    <div className="flex items-center justify-between px-8 py-4 w-full text-gray-900 border-b border-gray-300">
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className="text-normal font-semibold flex gap-2 items-center"
        >
          <BiSolidSlideshow className="h-6 w-6 inline-block" />
          <span>{siteName}</span>
        </Link>
        <div className="space-x-8 hidden md:flex text-sm">
          <Link href="/examples">Examples</Link>
          <Link href="/purchase-gems">Pricing</Link>
        </div>
      </div>
      <MobileNav user={user} tokenCount={userInDB?.tokenCount} />
      {user ? (
        <div className="space-x-4 items-center hidden md:flex">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "default",
                className: "flex gap-2 items-center",
              })}
            >
              Dashboard
              <MdOutlineDashboard className="h-5 w-5 inline-block" />
            </Link>
            <Link
              href="/purchase-gems"
              className={buttonVariants({
                variant: "outline",
                className: "flex gap-2 items-center",
              })}
            >
              Buy Gems <LiaGemSolid className="h-6 w-6" />
            </Link>
            <ProfilePopover user={user} tokenCount={userInDB?.tokenCount} />
          </div>
        </div>
      ) : (
        <div className="space-x-4 items-center hidden md:flex">
          <LoginLink
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Log in
          </LoginLink>
          <RegisterLink
            className={buttonVariants({
              variant: "default",
            })}
          >
            Create account
          </RegisterLink>
        </div>
      )}
    </div>
  );
};

export default NavbarLarge;
