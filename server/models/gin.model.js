const { DataTypes } = require("sequelize");
const sequelize = require("../db_access/sequelize").sequelize;

const Gin = sequelize.define("gins", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING
    },
    alcohol_content: {
      type: DataTypes.FLOAT(3,1)
    },
    origin_country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin_city: {
        type: DataTypes.STRING,
    },
    botanicals: {
        type: DataTypes.STRING
    },
    main_notes: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_tipp: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
 });

 sequelize.sync({ force: true }).then(() => {
    console.log('Gin table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = {
    Gin
};