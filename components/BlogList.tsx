"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { ComponentProps } from "react";
import { Octokit } from "octokit";
import Image from "next/image";
import { BlogListItemType } from "@/lib/posts";
import moment from 'moment'
import Link from "next/link";
import { useRouter } from "next/router";

interface BlogListProps{
    blogs: BlogListItemType[]
}





const BlogList= ({blogs}:BlogListProps) => {
    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2 p-4 pt-0">
                {blogs.map((blog)=>(
                    <button
                        key={blog.id}
                        className={cn(
                            "flex  items-start gap-6 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
                        )}
                    >
                        <Image src={blog.hero} width={100} height={100}  className="rounded-xl h-full" alt="hero"/>
                        <div className="w-full flex flex-col gap-1">
                            {/* horizontal layout */}
                            <div className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <Link href={`/view/${blog.owner}/${blog.id}`}>
                                        <div className="font-semibold">{blog.title}</div>
                                    </Link>
                                </div>
                                <div
                                    className={cn(
                                        "ml-auto text-xs"
                                    )}
                                    >
                                    {moment(blog.editTime).fromNow()}
                                </div>
                            </div>
                            <div className="text-xs font-medium">description</div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                {blog.content.substring(0, 300)}
                            </div> 
                        </div>
                    </button>
                ))}
            </div>
        </ScrollArea>
    )
}

export default BlogList;

function getBadgeVariantFromLabel(
    label:string
): ComponentProps<typeof Badge>["variant"] {
    if (["work"].includes(label.toLowerCase())) {
        return "default"
      }
    
      if (["life"].includes(label.toLowerCase())) {
        return "outline"
      }
    
      return "secondary"
}