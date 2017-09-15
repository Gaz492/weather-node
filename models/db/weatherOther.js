/**
 * Created by Gareth on 15/09/2017.
 */
function WeatherOther(sequelize, DataTypes) {
    return sequelize.define('weatherOther', {
        id: {
            type: DataTypes.INTEGER(11),
            field: 'id',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        insertDate: {
            type: DataTypes.DATE,
            field: 'date',
            allowNull: true
        },
        baro: {
            type: DataTypes.STRING(50),
            field: 'baro',
            allowNull: true,
        },
        forecast: {
            type: DataTypes.STRING(50),
            field: 'forecast',
            allowNull: true,
        },
    }, {
        timestamps: false,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'cust_weatherOther'
    });
}

module.exports = WeatherOther;