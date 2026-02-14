import {WithId} from "mongodb";
import {Blog} from "../../types/blog";
import {BlogViewModel} from "../../types/blog-view-model";

export function mapToBlogViewModel(blog: WithId<Blog>): BlogViewModel {
    const {_id, name, description, websiteUrl, createdAt, isMembership} = blog
    return {
        id: _id.toString(),
        name,
        description,
        websiteUrl,
        createdAt,
        isMembership
    }
}
