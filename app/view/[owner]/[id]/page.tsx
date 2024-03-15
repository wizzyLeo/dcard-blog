import { Octokit } from "octokit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { BlogListItemType } from "@/lib/posts";
import { NextResponse } from "next/server";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import Image from "next/image";

async function getProcessedBlogReponse(owner: string, id: number) {
    try {
        // Extracting session with getServerSession
        const session = await getServerSession(authOptions);
        
        if (session) {
            const octokit = new Octokit({
                auth: process.env.GITHUB_ACCESS_TOKEN
            });
            
            const res = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
                owner: owner!,
                repo: 'dcard-blog',
                issue_number: id,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            
            
            const rawIssue = res.data;
            if(!rawIssue.body){
                throw Error(`Issue ${id} from ${owner}: Body is empty`);
            }
            // Extracting the required fields
            const issue:BlogListItemType = {
                hero: matter(rawIssue.body).data.hero || "/heros/default-hero.jpg",
                description: matter(rawIssue.body).data.description || "",
                editTime: rawIssue.created_at,
                id: rawIssue.number,
                title: rawIssue.title,
                content: matter(rawIssue.body).content,
                owner: rawIssue.user!.login
            }
  
            // Returning the extracted data
            return new NextResponse(JSON.stringify(issue, null, 2), {
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
  
  async function getBlogData(owner: string, id:number){
    const res = await getProcessedBlogReponse(owner, id)
  
    if(!res.ok){
      throw new Error('Failed to fetch blog data')
    }
  
    const blogData= await res.json()
  
    return blogData
  }

export default async function PostPage({params} : {params: {owner: string, id: string}}){
    const owner = params.owner
    const id = +params.id
    console.log("owner: ", owner)
    console.log("id: ", id)
    const blogData:BlogListItemType = await getBlogData(owner, id)
    console.log(blogData.hero)
    return (
        <div className="mx-8 my-6 p-4 w-screen flex flex-col items-center justify-around">
                <Image src={blogData.hero} width={1200} height={500} alt="hero" className="aspect-video"/>
                <ReactMarkdown className="markdown w-[1200px] bg-white p-6">{blogData.content}</ReactMarkdown>
        </div>
        
    )
}