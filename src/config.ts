import "dotenv/config";

export default {
	app: {
		port: process.env.PORT || 4000,
	},
	DB: {
		URI: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.0kfw6.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
		USER: process.env.USER,
		PASSWORD: process.env.PASSWORD,
		DATABASE: process.env.DATABASE,
	},
};
