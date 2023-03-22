export default interface IPost {
  id: number;
  title: string;
  body: string;
  sourceUrl: string;
  isPublished: boolean;
  authorId: number;
}
