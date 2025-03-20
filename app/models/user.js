import {DataTypes} from 'sequelize' 
import sequelize from '../lib/sequalize'

const User = sequelize.define("user",{
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User