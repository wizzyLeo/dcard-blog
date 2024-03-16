"use client";
import { useState, useRef, useCallback } from "react";
import ReactMarkdown from 'react-markdown';
import '@mdxeditor/editor/style.css'
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import MDEditor from '@uiw/react-md-editor/nohighlight';
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
const MarkdownEditor = ({value, setValue}) =>{
    return (
        <div className="w-full h-full rounded-xl overflow-hidden">
            <MDEditor
                value={value}
                onChange={setValue}
                height={400}
                data-color-mode="light"
            />
        </div>
    )
}






const Editor = ({owner, handlePost}: {owner:string, handlePost:(owner: string, title: string, body: string) => Promise<void>}) => {
    const [body, setBody] = useState("# Hello World")
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [titleValid, setTitleValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [bodyValid, setBodyValid] = useState(true)
    const {toast} = useToast()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const isTitleValid = title && title.trim() !== '';
        const isDescriptionValid = description && description.trim() !== '';
        const isBodyValid = body && body.trim() !== ''
        

        setTitleValid(isTitleValid);
        setDescriptionValid(isDescriptionValid);
        setBodyValid(isBodyValid)

        
        if(!isTitleValid || !isDescriptionValid || !isBodyValid){
            toast({
                title: "Error",
                description: "Please fill out all required fields.",
            });
            console.log("empty fields")
            return
        }
        const formatter = "---\n"+`description:${description}\n`+"---\n"
        const bodyWithFormatter = formatter + body
        handlePost(owner, title, bodyWithFormatter)

        setBody("")
        titleRef.current.value = ""
        descriptionRef.current.value = ""
    }

    return (
        <>
            <h2>Add a title</h2>
            <Input ref={titleRef} placeholder="title" className={`focus:border-primary transition duration-200 ease-in-out w-full ${!titleValid && "border-primary"}`}/>
            <h2>Add a description</h2>
            <Input ref={descriptionRef} placeholder="description" className={`focus:border-primary transition duration-200 ease-in-out w-full ${!descriptionValid && "border-primary"}`}/>
            <div className="w-full h-full mx-8 my-6 flex flex-col items-center gap-4">
                <form className="space-y-6"  onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="rounded-xl overflow-hidden w-[500px] lg:w-[800px] min-h-[300px] lg:min-h-[400px]">
                        <MarkdownEditor value={body} setValue={setBody} className={`${bodyValid && "border-primary"}`}/>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </>
        
    )
}

export default Editor;