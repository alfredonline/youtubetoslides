import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { FaGem } from "react-icons/fa6";

const ProfilePopover = ({ user, tokenCount}: { user: KindeUser, tokenCount: number | undefined }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          {user?.given_name?.charAt(0).toUpperCase()}{" "}
          {user?.family_name?.charAt(0).toUpperCase()}
          <span className="sr-only">Open profile menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/settings" className="flex items-center gap-2">
            <span className="text-sm">Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/account-information" className="flex items-center gap-2">
            <span className="text-sm">Account information</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutLink className="flex items-center gap-2">
            <span className="text-sm text-red-500">Log out</span>
          </LogoutLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      <DropdownMenuItem>
        <FaGem className="h-5 w-5 mr-2" />
        <span className="text-sm">Gem Count: {tokenCount}</span>
      </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfilePopover;
