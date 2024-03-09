"use client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

const Navbar = () => {
    const { data: session, status } = useSession();
    return (
        <div className="h-16 flex items-center justify-between w-full px-8 border-b border-slate-400 mb-4">
            <div>Hello</div>
            <div className="flex items-center gap-3">
                {status === "authenticated" ? (
                    <>
                        <div>{session.user.name || session.user.email}</div>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={session.user.image || "/heros/image1.jpg"} className="rounded-full" />
                        </Avatar>
                    </>
                ) : (
                    <button onClick={() => signIn()}>Sign In</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
