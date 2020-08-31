const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                min: {
                    args: 3,
                    msg: 'Username must be between 3 and 40 characters.'
                },
                max: {
                    args: 40,
                    msg: 'Username must be between 3 and 40 characters.'
                },
                is: {
                    args: /^[A-Za-z][A-Za-z0-9-_]+$/i,
                    msg: 'Username must start with a letter, and can include letters, numbers, dashes, and underscores.'
                }
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:  {
                args: true,
                msg: 'An account with this email address already exists. Please try to login.',
                fields: [sequelize.fn('lower', sequelize.col('email'))]
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please provide a valid email address.'
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: 6,
                    msg: 'Password must be between 6 and 40 characters.'
                },
                max: {
                    args: 40,
                    msg: 'Password must be between 6 and 40 characters.'
                }
            },
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(newUserData, 10);
                return updatedUserData
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User; 