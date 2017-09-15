/**
 * Created by Gareth on 15/09/2017.
 */
function WeatherTemp(sequelize, DataTypes) {
    return sequelize.define('weatherTemp', {
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
        temp: {
            type: DataTypes.DECIMAL(4,1),
            field: 'temp',
            allowNull: true,
        },
        humid: {
            type: DataTypes.STRING(50),
            field: 'humid',
            allowNull: true,
        },
    }, {
        timestamps: false,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'cust_weatherTemp'
    });
}

module.exports = WeatherTemp;
