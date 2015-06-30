var path = require('path');

/**
 *
 * @param  {String} p_basedirname Base dir path.
 * @return {Function}             Constructor.
 */
exports = module.exports = function (p_basedirname)
{
  var PathResolver = function (p_basedirname)
  {
    if (!p_basedirname)
    {
      throw new Error('The base dir path is empty ')
    }

    this.basedirname = p_basedirname;

    /**
     * Resolve Path.
     * @param  {String} p_name Relative path.
     * @return {Object}        Absolute path.
     */
    this.resolve = function (p_name)
    {
      return path.join(this.basedirname, p_name);
    };
  };

  return new PathResolver(p_basedirname);
};
