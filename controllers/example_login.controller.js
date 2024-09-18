
import { sendError, sendResponse } from "../service/responseService.js";
import User from "../models/example.model.js"
import { v4 as uuid } from 'uuid';
import signToken from 'jsonwebtoken';
const { sign } = signToken;
import pkg from 'bcryptjs';
const { compare } = pkg;

const login = async (req, res) => {
  let responseData = {}
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      sendError(res, "All input are required !", 400)
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await compare(password, user.password))) {
      // Create token
      const token = sign(
        { user_id: uuid(), email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      const { email: userEmail, role } = user
      responseData = { ...responseData, userEmail, role, token }
      return sendResponse(res, "Successfully logged in", { ...responseData }, 200)
    }
    return sendError(res, "Invalid Credentials!", 400)
  } catch (err) {
    console.log(err)
    return sendError(res, "Error while logging in", 400);
  }
};


export { login };