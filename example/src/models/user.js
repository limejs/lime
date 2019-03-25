
/**
 * @file UserModel
 * @date 2018-11-11
 * @author sheldon<websheldoncui@gmail.com>
 */

const UserModel = {
    username: String,
    password: String,
    phone: String,
    salesNotes: [
        {
            date: Date,
            salespersonId: Number,
            notes: String
        }
    ],
    // 短名称
    getShortName() {
        return this.name.slice(0, 5)
    }
}

module.exports = UserModel