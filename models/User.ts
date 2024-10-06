export interface User {
	id: number,
	name: string,
	age: number,
	email: string
}

export const users: User[] = [
	{
		id: 1,
		name: "John Doe",
		age: 25,
		email: "john.doe@gmail.com"
	},
	{
		id: 2,
		name: "Jane Smith",
		age: 30,
		email: "jane.smith@gmail.com"
	},
	{
		id: 3,
		name: "Alice Johnson",
		age: 28,
		email: "alice.johnson@gmail.com"
	},
	{
		id: 4,
		name: "Bob Brown",
		age: 35,
		email: "bob.brown@gmail.com"
	},
	{
		id: 5,
		name: "Thanh Tung",
		age: 27,
		email: "thanhtung3523@gmail.com"
	}
];
