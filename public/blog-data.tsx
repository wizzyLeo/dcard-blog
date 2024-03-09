export type BlogType = {
    id: string
    title: string
    editTime: string
    hero: string
    content: string
    labels:string[]
}

export type UserType = {
    id: string
    name: string
}


export const blogData: BlogType[] = [
    {
        id: "blog1",
        title: "Exploring the Great Outdoors",
        editTime: "2023-01-15T14:30:00",
        hero: "/heros/image1.jpg",
        content: "Discovering the beauty of nature through hiking and adventure.",
        labels:['work', 'life']
    },
    {
        id: "blog2",
        title: "The Future of Technology",
        editTime: "2023-01-20T10:00:00",
        hero: "/heros/image2.jpg",
        content: "A deep dive into upcoming technological innovations.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.Discovering the beauty of nature through hiking and adventure.",
        labels: []
    },
    {
        id: "blog3",
        title: "Mastering the Art of Cooking",
        editTime: "2023-01-25T16:45:00",
        hero: "/heros/image3.jpg",
        content: "Simple yet delicious recipes for everyday cooking.",
        labels: []
    },
    {
        id: "blog4",
        title: "The World of Science Fiction",
        editTime: "2023-02-01T12:15:00",
        hero: "/heros/image4.jpg",
        content: "Exploring the boundaries of imagination in sci-fi literature.",
        labels: []
    },
    {
        id: "blog5",
        title: "A Journey Through History",
        editTime: "2023-02-05T18:30:00",
        hero: "/heros/image5.jpg",
        content: "Understanding our past to shape our future.",
        labels: []
    },
    {
        id: "blog6",
        title: "The Beauty of Classical Music",
        editTime: "2023-02-10T09:00:00",
        hero: "/heros/image6.jpg",
        content: "Exploring the timeless pieces of classical music history.",
        labels: []
    },
    {
        id: "blog7",
        title: "Photography Tips for Beginners",
        editTime: "2023-02-15T20:00:00",
        hero: "/heros/image7.jpg",
        content: "Essential tips to improve your photography skills.",
        labels: []
    },
    {
        id: "blog8",
        title: "Learning a New Language",
        editTime: "2023-02-20T17:30:00",
        hero: "/heros/image8.jpg",
        content: "Tips and tricks for mastering a new language.",
        labels: []
    },
    {
        id: "blog9",
        title: "Gardening for Beginners",
        editTime: "2023-02-25T15:20:00",
        hero: "/heros/image9.jpg",
        content: "How to start your own garden, even in small spaces.",
        labels: []
    },
    {
        id: "blog10",
        title: "The World of Digital Art",
        editTime: "2023-03-01T11:00:00",
        hero: "/heros/image10.jpg",
        content: "A look into the evolving landscape of digital art and its impact.",
        labels: []
    }
];

export const userData: UserType[] = [
    {
        id: "user1",
        name: "Alice Johnson"
    },
    {
        id: "user2",
        name: "Bob Smith"
    },
    {
        id: "user3",
        name: "Carol White"
    }
];
