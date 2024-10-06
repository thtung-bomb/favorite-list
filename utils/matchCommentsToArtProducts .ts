// utils/matchCommentsToArtProducts.ts
import { ArtProduct } from "@/models/ArtProduct";
import { Comment } from "@/models/Comment";

export const matchCommentsToArtProducts = (artProducts: ArtProduct[], comments: Comment[]) => {
	return artProducts.map((product) => ({
		...product,
		comments: comments.filter(comment => comment.artProductId === product.id),
	}));
};
