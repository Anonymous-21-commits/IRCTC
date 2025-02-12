const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: 'Email or password missing in the request'
        });
    }
    next();
}
const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            err: 'User id not given',
            message: 'Something went wrong'
        })
    }
    next();
}
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

const validateAdminApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; 

  if (!apiKey) {
    return res.status(403).json({
      success: false,
      message: 'API key is required',
    });
  }

  if (apiKey !== ADMIN_API_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Invalid API key',
    });
  }

  // If the API key is valid, proceed to the next middleware or controller
  next();
};


module.exports={
    validateUserAuth,
    validateIsAdminRequest,
    validateAdminApiKey
}