module.exports = (sequelize, DataTypes) => {
    Usuario = sequelize.define('Usuario', {
        IdUsuario: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        Nome: {
            type: DataTypes.STRING, allowNull: false
        },
        Sobrenome: {
            type: DataTypes.STRING, allowNull: false
        },
        Email: {
            type: DataTypes.STRING, unique: true, allowNull: false
        },
        Cpf: {
            type: DataTypes.STRING(11), allowNull: false,
        },
        Telefone: {
            type: DataTypes.STRING
        },
        DataNascimento: {
            type: DataTypes.DATE, allowNull: false
        },
        Status: {
            type: DataTypes.ENUM("Ativo", "Inativo"), defaultValue: "Ativo", allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'Usuario'
    }
    );

    return Usuario;
}