const db = require('../config/db');

class User {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(user) {
        const { name, email } = user;
        const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        return result.insertId;
    }

    static async update(id, user) {
        const { name, email } = user;
        await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    }

    static async delete(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }
}

module.exports = User;