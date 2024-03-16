"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { ComponentProps, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BlogListItemType } from "@/lib/posts";
import moment from 'moment'
import Link from "next/link";
import markdownToText from 'markdown-to-txt';

interface BlogListProps{
    blogs: BlogListItemType[]
}


function getSlicedContent(content:string, width: number){
    return content.substring(0, width > 400 ? 300 : 200) + "..."
}




const BlogList= ({blogs}:BlogListProps) => {
    
    return (
        <ScrollArea className="w-full h-full flex flex-col items-center">
            <div className="flex flex-col gap-8 py-12 px-24 pt-0 ">
                {blogs.map((blog)=>{
                    return (
                        <div 
                            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl"
                            key={blog.id}
                            >
                            <div className="md:flex lg:w-[1200px] min-h-[300px]">
                                <div className="md:shrink-0">
                                    <Image height={500} width={500} className="h-full w-full object-cover object-center md:h-full md:w-48" src={blog.hero} alt="Modern building architecture"/>
                                </div>
                                <div className="p-8 md:w-[500px] ">
                                    <div className="uppercase tracking-wide text-sm text-primary font-semibold"><Link href={`/view/${blog.owner}/${blog.id}`}>{blog.title}</Link></div>
                                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{blog.description}</a>
                                    <p className="mt-2 text-slate-500">{markdownToText(blog.content).substring(0, 300) + "..."}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
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