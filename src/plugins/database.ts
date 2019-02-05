const db = require('../../models');

import Loggr from '../loggr';
const console = Loggr.get('Discord');

export class Database {
	name: string = 'Database';

	[key: string]: any;

	public async onLoad() {
		for (const key in db) {
			if (db[key]) {
				this[key] = db[key];
			}
		}
	}

	get db() {
		return db;
	}

	get literal() {
		return db.sequelize.literal;
	}

	get Op() {
		return db.Sequelize.Op;
	}

	async findUserByName(name: string) {
		const where = {
			[db.Sequelize.Op.or]: [
				{ name },
				{
					aliases: {
						[db.Sequelize.Op.contains]: [name]
					}
				}
			]
		};

		try {
			return await db.user.findOne({
				where
			});
		} catch (err) {
			console.error(err);
			// console.log(where);
			return null;
		}
	}

	async findUser(userId: string) {
		const where = {
			[db.Sequelize.Op.or]: [
				{ userId: userId },
				{
					idAliases: {
						[db.Sequelize.Op.contains]: [userId]
					}
				}
			]
		};

		try {
			return await db.user.findOne({
				where
			});
		} catch (err) {
			console.error(err);
			// console.log(where);
			return null;
		}
	}
}