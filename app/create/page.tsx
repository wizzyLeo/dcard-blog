"use client";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import '@mdxeditor/editor/style.css'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import { linkPlugin, linkDialogPlugin } from "@mdxeditor/editor";
import Editor from "@/components/Editor";
import { Input } from "@/components/ui/input";
import { Octokit } from "octokit";
import { useSession } from "next-auth/react";

async function createIssue(owner: string, title: string, body: string) {
    const octokit = new Octokit({
        auth: "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"
    });

    try {
        await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: owner,
            repo: 'dcard-blog',
            title: title,
            body: body,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
    } catch (error) {
        console.error("Post error:", error);
    }
}



const CreatePage = () => {
    const [markdown, setMarkdown] = useState("");
    const { data: session, status } = useSession();
    if(!session){
        console.log("user not login")
    }
    const handleInputChange = (e) => {
        setMarkdown(e.target.value);
    }

    return (
        <div className="gap-2  md:max-w-[500px] xl:max-w-[800px] w-full mx-auto p-4">
            <Editor owner={session?.user?.name} handlePost={createIssue}/>
        </div>
    )
}

export default CreatePage;