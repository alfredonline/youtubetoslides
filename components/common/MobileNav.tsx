"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button, buttonVariants } from "../ui/button";
import { BiSolidSlideshow } from "react-icons/bi";
import { siteName } from "@/data";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { FaGem } from "react-icons/fa";

const MobileNav = ({
  user,
  tokenCount,
}: {
  user: KindeUser;
  tokenCount: number | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="text-base bg-white md:hidden hover:bg-transparent">
          <h2 className="border-2 border-black px-4 py-2 rounded-md text-black">
            Menu
          </h2>
          <span className="sr-only">Open main menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="pr-0">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-normal font-semibold flex gap-2 items-center"
        >
          <BiSolidSlideshow className="h-6 w-6 inline-block" />
          <span>{siteName}</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            <Link href="/examples" onClick={() => setIsOpen(false)}>
              Examples
            </Link>
            <Link href="/purchase-gems" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            {user ? (
              <div className="flex flex-col gap-2">
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <Link
                  href="/account-information"
                  onClick={() => setIsOpen(false)}
                >
                  Account Information
                </Link>
                <Link href="/settings" onClick={() => setIsOpen(false)}>
                  Settings
                </Link>
                <div className="flex items-center gap-2">
                  <span className="flex gap-2 items-center">
                    <FaGem className="h-5 w-5 mr-2" />
                    <div>{tokenCount}</div>
                  </span>
                </div>
                <LogoutLink
                  onClick={() => setIsOpen(false)}
                  className="text-red-500"
                >
                  Logout
                </LogoutLink>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <LoginLink
                  onClick={() => setIsOpen(false)}
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-32",
                  })}
                >
                  Login
                </LoginLink>
                <RegisterLink
                  onClick={() => setIsOpen(false)}
                  className={buttonVariants({
                    variant: "default",
                    className: "w-32",
                  })}
                >
                  Register
                </RegisterLink>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
