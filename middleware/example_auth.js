
import jwt from "jsonwebtoken";
const config = process.env; 

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
      }    
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: "Not Authorized" });
  }
  return next();
};

const validateAPIKey = (req, res, next) => {
  let apiKey = req.headers['x-api-key']
  if ( apiKey === config.API_KEY ) return next();
  else return res.status(401).json({ error: "Not Authorized" });
}

export { verifyToken, validateAPIKey  };

