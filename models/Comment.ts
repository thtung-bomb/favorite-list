import { ArtProduct } from "./ArtProduct";
import { User, users } from "./User";

export interface Comment {
	user: User,
	feedback: string[],
	rating: number,
	artProductId: string,
}

export const comments: Comment[] = [
	// Art Product 1
	{
		user: users[0],
		feedback: ["Amazing experience!", "The colors are so vibrant."],
		rating: 5,
		artProductId: '1'
	},
	{
		user: users[1],
		feedback: ["Not bad.", "Could use a little more detail."],
		rating: 3,
		artProductId: '1'
	},
	{
		user: users[2],
		feedback: ["Exceptional quality!", "Worth every penny."],
		rating: 5,
		artProductId: '1'
	},
	{
		user: users[3],
		feedback: ["Pretty good.", "Happy with my purchase."],
		rating: 4,
		artProductId: '1'
	},
	{
		user: users[4],
		feedback: ["Love it!", "Perfect for my living room."],
		rating: 5,
		artProductId: '1'
	},
	{
		user: users[5],
		feedback: ["Not quite what I expected.", "Colors are dull."],
		rating: 2,
		artProductId: '1'
	},

	// Art Product 2
	{
		user: users[0],
		feedback: ["Stunning piece!", "It looks amazing on my wall."],
		rating: 5,
		artProductId: '2'
	},
	{
		user: users[1],
		feedback: ["Decent artwork.", "Could be better."],
		rating: 3,
		artProductId: '2'
	},
	{
		user: users[2],
		feedback: ["Lovely design!", "Brings warmth to the room."],
		rating: 4,
		artProductId: '2'
	},
	{
		user: users[3],
		feedback: ["It's okay.", "Not the best quality."],
		rating: 3,
		artProductId: '2'
	},
	{
		user: users[4],
		feedback: ["Absolutely beautiful!", "A true work of art."],
		rating: 5,
		artProductId: '2'
	},
	{
		user: users[5],
		feedback: ["Very disappointing.", "The print was blurry."],
		rating: 1,
		artProductId: '2'
	},

	// Art Product 3
	{
		user: users[0],
		feedback: ["Just what I was looking for!", "Fits perfectly in my office."],
		rating: 5,
		artProductId: '3'
	},
	{
		user: users[1],
		feedback: ["Good product, but pricey.", "I expected a bit more."],
		rating: 4,
		artProductId: '3'
	},
	{
		user: users[2],
		feedback: ["Nice artwork.", "Not bad overall."],
		rating: 3,
		artProductId: '3'
	},
	{
		user: users[3],
		feedback: ["Absolutely stunning!", "Can't stop looking at it."],
		rating: 5,
		artProductId: '3'
	},
	{
		user: users[4],
		feedback: ["Fantastic quality!", "Will buy again."],
		rating: 5,
		artProductId: '3'
	},
	{
		user: users[5],
		feedback: ["It’s okay, but smaller than expected.", "Could have been bigger."],
		rating: 2,
		artProductId: '3'
	},

	// Art Product 4
	{
		user: users[0],
		feedback: ["The artwork didn't match the description.", "Very disappointed."],
		rating: 1,
		artProductId: '4'
	},
	{
		user: users[1],
		feedback: ["It's alright.", "Not my favorite."],
		rating: 3,
		artProductId: '4'
	},
	{
		user: users[2],
		feedback: ["Good quality, would recommend.", "Very happy with my purchase."],
		rating: 4,
		artProductId: '4'
	},
	{
		user: users[3],
		feedback: ["Average quality.", "Expected better."],
		rating: 3,
		artProductId: '4'
	},
	{
		user: users[4],
		feedback: ["Not impressed.", "Expected more for the price."],
		rating: 2,
		artProductId: '4'
	},
	{
		user: users[5],
		feedback: ["Love this piece!", "It really brightens up my room."],
		rating: 5,
		artProductId: '4'
	},

	// Art Product 5
	{
		user: users[0],
		feedback: ["Incredible detail!", "A masterpiece."],
		rating: 5,
		artProductId: '5'
	},
	{
		user: users[1],
		feedback: ["Not bad.", "Just okay for me."],
		rating: 3,
		artProductId: '5'
	},
	{
		user: users[2],
		feedback: ["Fantastic!", "I love it!"],
		rating: 5,
		artProductId: '5'
	},
	{
		user: users[3],
		feedback: ["Disappointed.", "Not as vibrant as I hoped."],
		rating: 2,
		artProductId: '5'
	},
	{
		user: users[4],
		feedback: ["Perfect!", "Exceeded my expectations."],
		rating: 5,
		artProductId: '5'
	},
	{
		user: users[5],
		feedback: ["Okay, but not worth the price.", "Expected better quality."],
		rating: 3,
		artProductId: '5'
	},

	// Art Product 6
	{
		user: users[0],
		feedback: ["Great value for money!", "I would recommend this."],
		rating: 4,
		artProductId: '6'
	},
	{
		user: users[1],
		feedback: ["Very unique!", "Glad I purchased it."],
		rating: 5,
		artProductId: '6'
	},
	{
		user: users[2],
		feedback: ["Just average.", "Not my style."],
		rating: 3,
		artProductId: '6'
	},
	{
		user: users[3],
		feedback: ["Not what I expected.", "Quality could be better."],
		rating: 2,
		artProductId: '6'
	},
	{
		user: users[4],
		feedback: ["Absolutely stunning!", "Will buy more!"],
		rating: 5,
		artProductId: '6'
	},
	{
		user: users[5],
		feedback: ["Very disappointed.", "Artwork was damaged upon arrival."],
		rating: 1,
		artProductId: '6'
	},

	// Art Product 7
	{
		user: users[0],
		feedback: ["Poor quality.", "Very disappointed."],
		rating: 1,
		artProductId: '7'
	},
	{
		user: users[1],
		feedback: ["It's okay.", "Could be better."],
		rating: 3,
		artProductId: '7'
	},
	{
		user: users[2],
		feedback: ["Great for the price!", "I like it."],
		rating: 4,
		artProductId: '7'
	},
	{
		user: users[3],
		feedback: ["Fantastic piece!", "Highly recommend."],
		rating: 5,
		artProductId: '7'
	},
	{
		user: users[4],
		feedback: ["Not for me.", "Didn't match my expectations."],
		rating: 2,
		artProductId: '7'
	},
	{
		user: users[5],
		feedback: ["Beautiful colors!", "Absolutely love this piece."],
		rating: 5,
		artProductId: '7'
	},

	// Art Product 8
	{
		user: users[0],
		feedback: ["Not as expected.", "Quality could be improved."],
		rating: 2,
		artProductId: '8'
	},
	{
		user: users[1],
		feedback: ["Pretty nice.", "Overall happy with the product."],
		rating: 4,
		artProductId: '8'
	},
	{
		user: users[2],
		feedback: ["Incredible detail!", "Will buy again."],
		rating: 5,
		artProductId: '8'
	},
	{
		user: users[3],
		feedback: ["Could be better.", "Not what I expected."],
		rating: 3,
		artProductId: '8'
	},
	{
		user: users[4],
		feedback: ["Not impressed.", "Expected better quality."],
		rating: 2,
		artProductId: '8'
	},
	{
		user: users[5],
		feedback: ["Amazing artwork!", "It looks stunning on my wall."],
		rating: 5,
		artProductId: '8'
	},

	// Art Product 9
	{
		user: users[0],
		feedback: ["Stunning!", "A great addition to my collection."],
		rating: 5,
		artProductId: '9'
	},
	{
		user: users[1],
		feedback: ["Just okay.", "Not too impressed."],
		rating: 3,
		artProductId: '9'
	},
	{
		user: users[2],
		feedback: ["Perfect size and quality.", "Very satisfied."],
		rating: 5,
		artProductId: '9'
	},
	{
		user: users[3],
		feedback: ["Disappointed with the delivery time.", "Product is fine."],
		rating: 3,
		artProductId: '9'
	},
	{
		user: users[4],
		feedback: ["Absolutely love it!", "Highly recommend this artist."],
		rating: 5,
		artProductId: '9'
	},
	{
		user: users[5],
		feedback: ["Not what I expected.", "Color was off."],
		rating: 2,
		artProductId: '9'
	},
];

