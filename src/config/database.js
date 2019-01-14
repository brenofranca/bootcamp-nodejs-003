module.exports = {
  sequelize: {
    dialect: 'postgres',
    username: 'docker',
    password: 'docker',
    database: 'bootcamp_challenge_2',
    host: '127.0.0.1',
    operatorsAlias: false,
    timezone: 'America/Fortaleza',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  },
  mongo: {
    uri: process.env.MONGODB_URL
  }
}
