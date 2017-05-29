import { UserConfig } from "./user-config";

export class User {
    constructor(public $key: string, public email: string, public name: string, public config: UserConfig) { }

    static fromJson({$key, email, name, config}): User {
        return new User($key, email, name, config);
    }

    static fromJsonArray(json: any[]): User[] {
        return json.map(user => User.fromJson(user));
    }

}