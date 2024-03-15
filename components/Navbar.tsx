"use client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { Button } from "./ui/button";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
    const { data: session, status } = useSession();
    return (
        <div className="h-24 flex items-center justify-between w-full px-8 border-b-2 mb-4">
            <div>BLOG</div>
            <div className="flex items-center gap-3">
                {status === "authenticated" ? (
                    <ProfileButton/>
                ) : (
                    <Button onClick={() => signIn()}>Sign In</Button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
