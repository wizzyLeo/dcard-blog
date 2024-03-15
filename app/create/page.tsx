"use client";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import '@mdxeditor/editor/style.css'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import { linkPlugin, linkDialogPlugin } from "@mdxeditor/editor";
import Editor from "@/components/Editor";



const CreatePage = () => {
    const [markdown, setMarkdown] = useState("");

    const handleInputChange = (e) => {
        setMarkdown(e.target.value);
    }

    return (
        <>
            <Editor/>
        </>
    )
}

export default CreatePage;