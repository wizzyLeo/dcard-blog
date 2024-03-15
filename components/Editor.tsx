"use client";
import { useState, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import '@mdxeditor/editor/style.css'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, tablePlugin, InsertTable, listsPlugin, quotePlugin, markdownShortcutPlugin, InsertImage, DialogButton, CreateLink, ListsToggle, BlockTypeSelect, InsertThematicBreak, InsertCodeBlock, InsertSandpack, InsertAdmonition, InsertFrontmatter, AdmonitionDirectiveDescriptor, frontmatterPlugin } from '@mdxeditor/editor'
import { linkPlugin, linkDialogPlugin, imagePlugin, directivesPlugin } from "@mdxeditor/editor";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { DirectiveDescriptor, GenericDirectiveEditor } from "@mdxeditor/editor";
import { Button } from "./ui/button";

async function imageUploadHandler(image: File) {
    const formData = new FormData()
    formData.append('image', image)
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await fetch('/uploads/new', {
      method: 'POST',
      body: formData
    })
    const json = (await response.json()) as { url: string }
    return json.url
  }
  const CalloutDirectiveDescriptor: DirectiveDescriptor = {
    name: 'callout',
    testNode(node) {
      return node.name === 'callout'
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: [],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: true,
    Editor: GenericDirectiveEditor
  }

const Editor = () => {
    const [markdown, setMarkdown] = useState("");

    const handleInputChange = (e) => {
        setMarkdown(e.target.value);
    }

    return (
        <div className="w-full h-full mx-8 my-6 flex flex-col items-center gap-4">
            <MDXEditor 
                className="border border-slate-300 rounded-lg bg-white min-w=[480px] aspect-video min-h-[500px] "
                markdown="write your markdown here..." 
                plugins={[
                    toolbarPlugin({
                    toolbarContents: () => (
                        <>
                        {' '}
                        <UndoRedo />
                        <Separator/>
                        <BoldItalicUnderlineToggles />
                        <Separator/>
                        <ListsToggle/>
                        <Separator/>
                        <CreateLink/>
                        <InsertImage/>
                        <Separator/>
                        <InsertTable/>
                        <Separator/>
                        <InsertCodeBlock/>
                        </>
                    )
                    }),
                    linkPlugin(), 
                    linkDialogPlugin(),
                    imagePlugin({ imageUploadHandler }),
                    tablePlugin({toolbarContents: ()=> <InsertTable/>}),
                    listsPlugin(),
                    quotePlugin(),
                    markdownShortcutPlugin(),

                ]}
            />
            <div className="flex items-center gap-4">
                <Button>Preview</Button>
                <Button>Submit</Button>
            </div>
        </div>
    )
}

export default Editor;