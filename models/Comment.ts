import { User, users } from "./User";

export interface Comment {
	user: User,
	feedback: string[],
	rating: number
}

export const comments: Comment[] = [
	{
		user: users[0],
		feedback: ["Great experience", "Very professional service"],
		rating: 5
	},
	{
		user: users[1],
		feedback: ["Satisfactory", "Could be better in terms of response time"],
		rating: 3
	},
	{
		user: users[2],
		feedback: ["Amazing quality!", "Highly recommend"],
		rating: 4
	},
	{
		user: users[3],
		feedback: ["Not satisfied", "Had some issues with communication"],
		rating: 2
	},
	{
		user: users[4],
		feedback: ["Perfect", "Quick service and friendly staff"],
		rating: 5
	}
];
