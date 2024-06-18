import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema =  new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        trim: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
    },{
    timestamps: true, 
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update: any = this.getUpdate();
    let passwordHash;
    if (update.$set.password) {
        const salt = await bcrypt.genSalt(10);
        passwordHash = await bcrypt.hash(update.$set.password, salt);
        update.$set.password = passwordHash;
    }

    update.$set.updatedAt = new Date();
    next();
});

const userModel = model('user', userSchema)
export default userModel
