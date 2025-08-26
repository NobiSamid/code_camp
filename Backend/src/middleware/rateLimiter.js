import ratelimit from '../config/upstash.js';

const rateLimiter = async(req, res, next) => {
  try{
    const {success} = await ratelimit.limit("ekhane user id na diye ip dile better")
    if(!success){
      return res.status(429).json({message: "Too many requests pore try korio"})
    }

    next();
  }catch(error){
    console.log("rate limit error hoise", error);
    next(error);
  }
}

export default rateLimiter;

