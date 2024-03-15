"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { Button } from "./ui/button";


// rendered on navbar
// rendered only when user is authenticated

const ProfileButton = () => {
    const {data:session} = useSession(); 
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button >
                        <div>{session.user!.name}</div>
                        <Image 
                            src={session.user!.image}
                            height={25} width={25} alt="profile"
                            className="rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Blogs</DropdownMenuItem>
                    <DropdownMenuItem>Create</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => signOut()}>
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}



export default ProfileButton;