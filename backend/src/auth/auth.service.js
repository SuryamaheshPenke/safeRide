const authRepository = require("./auth.repository");

const { hashPassword } = require("../utils/password");
const { comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

class AuthService {
    

    async register(data) {

        const exists = await authRepository.findByEmail(data.email);

    if (exists) {
        throw new Error("Email already exists");
    }

    const phoneExists = await authRepository.findByPhone(data.phone);

    if (phoneExists) {
        throw new Error("Phone number already exists");
    }

    const hashedPassword = await hashPassword(data.password);

        const user = await authRepository.create({

            firstName: data.firstName,

            lastName: data.lastName,

            email: data.email,

            phone: data.phone,

            password: hashedPassword,

            role: {
                connect: {
                    id: data.roleId
                }
            },

            company: {
                connect: {
                    id: data.companyId
                }
            }

        });

        return user;

    }
    async login(data) {

    const user = await authRepository.findByEmail(data.email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await comparePassword(
        data.password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {

        token,

        user: {

            id: user.id,

            firstName: user.firstName,

            lastName: user.lastName,

            email: user.email,

            role: user.role.name,

            company: user.company.name

        }

    };

}

}

module.exports = new AuthService();