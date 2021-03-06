
var path = require('path');
var CLI  = require('../..');

var APPS = {};

/**
 * Description
 * @method forkPM2
 * @return pm2
 */
APPS.forkPM2 = function(cb) {
  var pm2 = require('child_process').fork('lib/Satan.js', [], {
    env : process.env,
    silent : process.env.DEBUG ? false : true
  });

  pm2.unref();

  pm2.on('message', function() {
    return cb(null, pm2);
  });
};

APPS.startSomeApps = function(pm2, cb) {
  pm2.start({
    script : './events/custom_action.js',
    name   : 'custom-action'
  }, cb);
};

/**
 * Description
 * @method launchApp
 * @param {} ipm2
 * @param {} script
 * @param {} name
 * @param {} cb
 * @return
 */
APPS.launchApp = function(ipm2, script, name, cb) {
  ipm2.rpc.prepare({
    pm_exec_path    : path.resolve(process.cwd(), 'test/fixtures/' + script),
    pm_err_log_path : path.resolve(process.cwd(), 'test/' + name + 'err.log'),
    pm_out_log_path : path.resolve(process.cwd(), 'test/' + name + '.log'),
    pm_pid_path     : path.resolve(process.cwd(), 'test/child'),
    exec_mode : 'cluster_mode',
    name : name
  }, cb);
};

/**
 * Description
 * @method launchAppFork
 * @param {} ipm2
 * @param {} script
 * @param {} name
 * @param {} cb
 * @return
 */
APPS.launchAppFork = function(ipm2, script, name, cb) {
  ipm2.rpc.prepare({
    pm_exec_path    : path.resolve(process.cwd(), 'test/fixtures/' + script),
    pm_err_log_path : path.resolve(process.cwd(), 'test/errLogasdasd.log'),
    pm_out_log_path : path.resolve(process.cwd(), 'test/outLogasdasd.log'),
    pm_pid_path     : path.resolve(process.cwd(), 'test/child'),
    exec_mode : 'fork_mode',
    name : name
  }, cb);
};

module.exports = APPS;
