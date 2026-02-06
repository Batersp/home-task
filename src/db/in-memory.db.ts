import {Blog} from "../blogs/types/blog";
import {Post} from "../posts/types/post";

type DB = {
    blogs: Blog[],
    posts: Post[]
}

export const db: DB = {
    blogs: [
        {
            id: '1',
            name: 'Cozy blog',
            description: 'some description',
            websiteUrl: 'https://cozy-blog.com',
        },
        {
            id: '2',
            name: 'Blog about dogs',
            description: 'some information about dogs',
            websiteUrl: 'https://dogs-blog.com',
        },
        {
            id: '3',
            name: 'Blog about cats',
            description: 'some information about cats',
            websiteUrl: 'https://cats-blog.com',
        },
        {
            id: '4',
            name: 'Blog about video games',
            description: 'some information about video games',
            websiteUrl: 'https://games-blog.com',
        }
    ],
    posts: [
        {
            id: '1',
            title: 'About dogs',
            shortDescription: 'Dogs are people\'s best animal friends.',
            content: 'some content about dogs',
            blogId: '2',
            blogName: 'Cozy blog',
        },
        {
            id: '2',
            title: 'About cats',
            shortDescription: 'Cats are perhaps one of the best animals for people.',
            content: 'some content about cats',
            blogId: '1',
            blogName: 'Cozy Cats',
        },
        {
            id: '3',
            title: 'About games',
            shortDescription: 'Games are one of the best ways to take a break from work and recharge your batteries.',
            content: 'some content about games',
            blogId: '3',
            blogName: 'Cozy games',
        }
    ]
}