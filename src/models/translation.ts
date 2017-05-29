export class Translation {
    constructor(public en: string, public pl?: string) { }

    static fromJson({en, pl}): Translation {
        return new Translation(en, pl);
    }

    static fromJsonArray(json: any[]): Translation[] {
        return json.map(trans => Translation.fromJson(trans));
    }
}