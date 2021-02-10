import { HttpException, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput, UserType } from 'src/graphql';

const FAKE_USERS: UserType[] = [
	{
		id: 1,
		firstName: 'Bob',
		lastName: 'Smith',
		email: 'bob@hi.com',
	},
	{
		id: 2,
		firstName: 'Candy',
		lastName: 'Bacon',
		email: 'candy@hi.com',
	},
];

@Resolver(UserType)
export class UserResolver {
	@Query()
	getUser(@Args('id') id: number) {
		const user = FAKE_USERS.find((user) => user.id === id);
		if (!user) {
			throw new NotFoundException('User Not Found');
		}
		return user;
	}

	@Mutation()
	createUser(@Args('input') input: UserInput) {
		FAKE_USERS.push({
			id: FAKE_USERS.length + 1,
			...input,
		});
		return FAKE_USERS;
	}
}
