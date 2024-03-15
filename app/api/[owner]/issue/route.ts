import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Ensure this is the correct path
import { Octokit } from 'octokit';
import matter from 'gray-matter';
import { BlogListItemType } from '@/lib/posts';
export async function GET(request:Request, {params}: {params: {owner: string}}) {
    const owner = params.owner
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
                title: issue.title
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
