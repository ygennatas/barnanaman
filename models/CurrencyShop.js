module.exports = (sequelize, DataTypes) => {
    return sequelize.define('currency_shop', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        cost: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        alcohol_d: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};