const config = require("config");
const bcrypt = require("bcrypt-nodejs");

const DEFAULT_USER = {
    id: "bf632d69b3",
    username: config.username,
    password: "$2a$10$wmv774MsIdmOYw4/DM4RHurIp4eTkPqm4kNjGMIGRsigKVTZcS68.",
    validPassword: _validPassword
};

function _validPassword(p_password)
{
    return bcrypt.compareSync(p_password, this.password);
}

module.exports.findById = function (p_id, p_callback)
{
    if (p_id === DEFAULT_USER.id)
    {
        p_callback(null, DEFAULT_USER);
    }
    else
    {
        p_callback(new Error(`Cannot find user id: ${p_id}`));
    }
};

module.exports.findOne = function (p_query, p_callback)
{
    if (p_query && p_query.username === DEFAULT_USER.username)
    {
        p_callback(null, DEFAULT_USER);
    }
    else
    {
        p_callback();
    }
};
