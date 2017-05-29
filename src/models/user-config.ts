export class UserConfig {
    constructor(public defaultLang: string, public currentBudgetId: string) { }

    fromJson({defaultLang, currentBudgetId}): UserConfig {
        return new UserConfig(defaultLang, currentBudgetId);
    }
}