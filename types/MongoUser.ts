export interface MongoUser {
  email: string;
  clerkId: string;
  name: string;
  _id: string;
  seenQuests: boolean;
  completedQuests: Array<number>
}
