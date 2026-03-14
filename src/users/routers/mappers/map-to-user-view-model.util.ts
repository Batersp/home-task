import {WithId} from "mongodb";
import {User} from "../../types/user";
import {UserViewModel} from "../../types/user-view-model";

export function mapToUserViewModel(user: WithId<User>): UserViewModel {
    const {_id, email, createdAt, login} = user
    return {
        id: _id.toString(),
        email,
        createdAt,
        login
    }
}
