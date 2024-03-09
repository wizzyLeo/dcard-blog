"use client";
import BlogList from "@/components/BlogList";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { blogData, userData } from "@/public/blog-data";
import Navbar from "@/components/Navbar";
import { Octokit } from "octokit";

async function createIssues(){
  const octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN
  })

  console.log("starting getting issues")
  try{
      const response = await octokit.request("POST /repos/{owner}/{repo}/issues", {
          owner: 'wizzyleo',
          repo: 'data-viz-final-project',
          title: 'New Issue 1',
          body: 'I\'m having a problem with this.',
          // assignees: [
          //     'octocat'
          // ],
          milestone: 1,
          labels: [
              'bug'
          ],
          headers: {
              'X-GitHub-Api-Version': '2022-11-28'
          }
      })
  }catch(error){
      console.log("error creating issue: ", error);
  };
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <div className="w-[500px] h-screen grid grid-center mx-auto">
          <BlogList blogs={blogData}></BlogList>
      </div>
      <div className="w-[200px]">
        <Button onClick={() => {createIssues()}}>Create</Button>
      </div>
      
    </div>
  );
}
