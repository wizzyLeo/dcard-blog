import { BlogType } from "@/public/blog-data";

interface BlogProps{
    blog: BlogType
}

const Blog = ({blog} : BlogProps) => {
    return (
        <li>{blog.content}</li>
    )
}

export default Blog;