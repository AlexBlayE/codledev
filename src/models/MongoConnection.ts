import mongoose, { type Model, type ObjectId } from "mongoose";

class Mongo {
	private static instance: Mongo;
	private connection: mongoose.Connection;

	private constructor() {
		this.connection = mongoose.createConnection(
			process.env.MONGODB_URI as string,
			{
				tls: true,
				tlsCertificateKeyFile: process.env.MONGODB_PEM_PATH as string,
				dbName: process.env.MONGODB_DB_NAME as string
			}
		);
	}

	public static getInstance(): Mongo {
		if (Mongo.instance) {
			return Mongo.instance;
		} else {
			Mongo.instance = new Mongo();
			return Mongo.instance;
		}
	}

	public getConnection(): mongoose.Connection {
		return this.connection;
	}

	public static async find<T>(
		model: Model<T>,
		filter: Partial<T>,
		projection: object,
		skip: number,
		limit: number
	) {
		return model.find(filter, projection).skip(skip).limit(limit);
	}

	public static async findById<T>(model: Model<T>, id: string, projection?: object) {
		if (projection) {
			return model.findById(id, projection);
		} else {
			return model.findById(id);
		}
	}

	public static async findOne<T>(model: Model<T>, filter: Partial<T>, projection?: object) {
		if (projection) {
			return model.findOne(filter, projection);
		} else {
			return model.findOne(filter);
		}
	}

	public static async exists<T>(model: Model<T>, filter: Partial<T>) {
		return model.exists(filter);
	}

	public static async create<T>(model: Model<T>, params: object) {
		const newDocument = new model(params);
		await newDocument.save();
	}

	public static async update<T>(model: Model<T>, id: string, params: Partial<T>) {
		await model.findByIdAndUpdate(id, params);
	}

	public static async getObjectId<T>(model: Model<T>, id: number): Promise<ObjectId> {
		return (await model.findById(id))?._id as ObjectId;
	}

	public static async count<T>(model: Model<T>, filter: Partial<T>) {
		return model.countDocuments(filter);
	}

	public static async delete<T>(model: Model<T>, filter: object) {
		await model.deleteOne(filter);
	}
}

export default Mongo;
