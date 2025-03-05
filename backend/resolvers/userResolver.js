import { users } from "../dummyData/data.js"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

const userResolver = {
    Mutation: {
        signUp: async(_, {input}, context) => {
            try {
                const {username, name, password, gender} = input;
                if(!username || !name || !password || !gender) {
                    throw new Error("All fields are required");
                }
                const existingUser = await User.findOne({username});
                if(existingUser) {
                    throw new Error("User already exists");
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                    gender
                })

                await newUser.save();
                await context.login(newUser);
                return newUser;

            } catch (error) {
                console.error("Error in signup:", error);
                throw new Error(error.message || "Internal server error");
            }
        },

        login: async(_, {input}, context) => {
            try {
                const {username, password} = input;
                if (!loginData.username || !loginData.password) throw new Error("All fields are required");
                const {user} = await context.authenticate("graphql-local", {username, password});

                await context.login(user);
                return user;
            } catch (error) {
                console.log("Error in login:", error);
                throw new Error(error.message || "Internal server error");
            }
        },

        logout: async(_, __, context) => {
            try {
                await context.logout();
                context.req.session.destroy((err) => {
                    if(err) throw err
                })
                context.res.clearCookie("connect.sid");

                return {message: "Logout successful"}
            } catch (error) {
                console.log("Error in logout:", error);
                throw new Error(error.message || "Internal server error");
            }
        }
    },

    Query: {
        authUser: async (_,__, context) => {
            try {
                
                const user = await context.getUser()
                return user;
            } catch (error) {
                console.error("Error in authUser", error);
                throw new Error( "Internal server error");
            }
        },
        user: async (_, {userId}) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (error) {
                console.error("Error in user query", error);
                throw new Error( "Internal server error"); 
            }
        }
    },

    //add user transaction

}

export default userResolver;