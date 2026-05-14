import {NewestLike, Post} from "../types/post";
import {HydratedDocument, model, Model, Schema} from "mongoose";
import {PostInputDto} from "../dto/post.input-dto";
import {LIKE_STATUS} from "../../core/enums/like.enum";

const postSchema = new Schema<Post>({
    title: {type: String, required: true, minlength: 1, maxlength: 100},
    shortDescription: {type: String, required: true, minlength: 1, maxlength: 1000},
    content: {type: String, required: true, minlength: 1, maxlength: 2000},
    blogId: {type: String, required: true, minlength: 1, maxlength: 1000},
    blogName: {type: String, required: true, minlength: 1, maxlength: 100},
    createdAt: {type: String, required: true, default: new Date().toISOString()},
    likesCount: {type: Number, required: true, default: 0},
    dislikesCount: {type: Number, required: true, default: 0},
    newestLikes: {
        type: [{
            addedAt: {type: String, required: true},
            userId: {type: String, required: true},
            login: {type: String, required: true},
        }],
        default: []
    }
})

export class PostEntity {
    private constructor(
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string,
        public createdAt: string,
        public likesCount: number,
        public dislikesCount: number,
        public newestLikes: NewestLike[]
    ) {}

    static createPost(dto: PostInputDto, blogName: string) {
        const {title, content, shortDescription, blogId} = dto
        const post = new PostModel({
            title,
            shortDescription,
            content,
            blogId,
            blogName
        }) as PostDocument
        if (post.title.length < 1 || post.title.length > 100) {
            throw new Error('Title length must be between 1 and 100 characters')
        }
        if (post.shortDescription.length < 1 || post.shortDescription.length > 1000) {
            throw new Error('ShortDescription length must be between 1 and 1000 characters')
        }
        if (post.content.length < 1 || post.content.length > 2000) {
            throw new Error('Content length must be between 1 and 2000 characters')
        }
        return post
    }

    update(dto: PostInputDto) {
        const {title, shortDescription, content, blogId} = dto
        if (title) this.title = title
        if (shortDescription) this.shortDescription = shortDescription
        if (content) this.content = content
        if (blogId) this.blogId = blogId
    }

    updateLikeStatus(userId: string, userLogin: string, oldStatus: LIKE_STATUS, newStatus: LIKE_STATUS) {
        if (oldStatus === LIKE_STATUS.LIKE) this.likesCount--
        if (oldStatus === LIKE_STATUS.DISLIKE) this.dislikesCount--
        if (newStatus === LIKE_STATUS.LIKE) this.likesCount++
        if (newStatus === LIKE_STATUS.DISLIKE) this.dislikesCount++

        if (newStatus !== LIKE_STATUS.LIKE) {
            this.newestLikes = this.newestLikes.filter(l => l.userId !== userId)
            return
        }

        const wasNeverLiked = !this.newestLikes.some(l => l.userId === userId)

        if (newStatus === LIKE_STATUS.LIKE && wasNeverLiked) {
            this.newestLikes = [
                {addedAt: new Date().toISOString(), userId, login: userLogin},
                ...this.newestLikes
            ].slice(0, 3)
        }

    }
}

interface PostMethods {
    update: (dto: PostInputDto) => void
    updateLikeStatus: (userId: string, userLogin: string, oldStatus: LIKE_STATUS, newStatus: LIKE_STATUS) => void
}

type PostStatics = typeof PostEntity;
type PostModel = Model<Post, {}, PostMethods> & PostStatics
export type PostDocument = HydratedDocument<Post, PostMethods>
postSchema.loadClass(PostEntity)
export const PostModel = model<Post, PostModel>('posts', postSchema)
