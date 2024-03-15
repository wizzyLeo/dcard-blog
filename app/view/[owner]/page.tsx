import BlogList from "@/components/BlogList";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { blogData, userData } from "@/public/blog-data";
import Navbar from "@/components/Navbar";
import { Octokit } from "octokit";
import { BlogListItemType } from "@/lib/posts";
import { Suspense } from "react";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import matter from "gray-matter";

async function getProcessedBlogReponse(owner: string) {
  try {
      // Extracting session with getServerSession
      const session = await getServerSession(authOptions);
      
      if (session) {
          const octokit = new Octokit({
              auth: process.env.GITHUB_ACCESS_TOKEN
          });
          
          const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
              owner: owner!,
              repo: 'dcard-blog',
              headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
              }
          });

          

          // Extracting the required fields
          const issues:BlogListItemType[] = res.data.map(issue => {
              if(!issue.body){
                  throw Error("Issue body not found")
              }
              return ({
              hero: matter(issue.body).data.hero || "/heros/default-hero.jpg",
              description: matter(issue.body).data.description || "",
              editTime: issue.created_at,
              id: issue.number,
              title: issue.title,
              content: matter(issue.body).content,
              owner: issue.user!.login
              })
          }) || [];

          // Returning the extracted data
          return new NextResponse(JSON.stringify(issues, null, 2), {
              status: 200,
              headers: {
                  "Content-Type": "application/json",
              },
          });
      } else {
          // If no session, handle accordingly
          return new NextResponse("Unauthorized", { status: 401 });
      }
  } catch (error) {
      // Handle any errors
      return new NextResponse(`Internal Server Error ${error}`, { status: 500 });
  }
}

async function getBlogData(owner: string){
  const res = await getProcessedBlogReponse(owner)

  if(!res.ok){
    throw new Error('Failed to fetch blog data')
  }

  const blogData= await res.json()

  return blogData
}


export default async function ViewHome({params}: {params: {owner:string}}) {
  const owner  = params.owner;
  const blogData: BlogListItemType[] = await getBlogData(owner)
  console.log(blogData)
  return (
    <div className="w-[1000px] h-screen grid grid-center mx-auto">
      <Suspense fallback={<p>Loading Block</p>}>
        <BlogList blogs={blogData}></BlogList>
      </Suspense>
      <Button>Hello World</Button>
    </div>
  );
}
