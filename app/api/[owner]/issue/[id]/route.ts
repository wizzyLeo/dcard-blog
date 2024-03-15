import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Octokit } from "octokit";
import matter from "gray-matter"

export async function GET(request: Request, {params}: {params: {id:string, owner: string}}) {
    const id = +params.id
    const owner = params.owner
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            const octokit = new Octokit({
                auth: session.accessToken
            });

            const res = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
                owner: owner!,
                repo: "dcard-blog",
                issue_number: id!, 
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            if(!res.data.body){
                throw Error("Issue body is empty")
            }

            const dataAfterParsing = matter(res.data.body)

            const issue = {
                metaData : dataAfterParsing.data,
                body: dataAfterParsing.content,
                createdAt: res.data.created_at,
            };

            // Return the issue data
            return new NextResponse(JSON.stringify(issue), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
