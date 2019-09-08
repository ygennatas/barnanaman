const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'database.sqlite',
});

const CurrencyShop = sequelize.import('models/CurrencyShop');
sequelize.import('models/Users');
sequelize.import('models/UserItems');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    const shop = [
        CurrencyShop.upsert({ name: 'Tea', cost: 1, alcohol_d: 2 }),
        CurrencyShop.upsert({ name: 'Coffe', cost: 2, alcohol_d: 3 }),
        CurrencyShop.upsert({ name: 'Cake', cost: 5, alcohol_d: 3 }),
    ];
    await Promise.all(shop);
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);