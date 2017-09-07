export class UserConfig {
    constructor(
        public defaultLang: string,
        public currentBudgetId: string,
        public currentSavingId: string) { }

    static fromJson({defaultLang, currentBudgetId, currentSavingId}): UserConfig {
        return new UserConfig(defaultLang, currentBudgetId, currentSavingId);
    }
}