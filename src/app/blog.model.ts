export class Blog {

    constructor(
        public title: string,
        public author: string,
        public createdAtDate: Date,
        public content: string,
        public keywords: Array<string>,
        public status: string = BlogStatus.ACTIVE,
        public id: number,
        public imageUrl = ''
    ) {}

}
export enum BlogStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}
