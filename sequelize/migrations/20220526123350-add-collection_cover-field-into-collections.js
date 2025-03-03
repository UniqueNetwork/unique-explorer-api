'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('collections', 'collection_cover', {
      type: Sequelize.DataTypes.STRING,
      length: 255,
      allowNull: true
    });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('collections', 'collection_cover');
  }
};
