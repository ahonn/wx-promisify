'use strict'

var NOT_PROMISIFY_METHODS_RE = /^(on|create)|Sync$/g
var notPromisifyMethods = {
  stopRecord: true,
  getRecorderManager: true,
  pauseVoice: true,
  stopVoice: true,
  pauseBackgroundAudio: true,
  stopBackgroundAudio: true,
  getBackgroundAudioManager: true,
  createMapContext: true,
  canIUse: true,
  hideToast: true,
  hideLoading: true,
  showNavigationBarLoading: true,
  hideNavigationBarLoading: true,
  pageScrollTo: true,
  drawCanvas: true,
  stopPullDownRefresh: true,
}

function shouldPromisify(methodName) {
  const shouldNotPromisify = NOT_PROMISIFY_METHODS_RE.test(methodName) || notPromisifyMethods[methodName]
  return !shouldNotPromisify
}

function promisifyWx(wx) {
  var wxp = {}
  var wxPropertyNames = Object.getOwnPropertyNames(wx)

  wxPropertyNames.forEach(prop => {
    if (typeof wx[prop] === 'function') {
      if (shouldPromisify(prop)) {
        wxp[prop] = function (options) {
          options = options || {}
          return new Promise((resolve, reject) => {
            options.success = res => resolve(res)
            options.fail = err => reject(err)

            wx[prop](options)
          })
        }
      } else {
        wxp[prop] = wx[prop]
      }
    }
  })

  return wxp
}

var wxp = promisifyWx(wx)
wxp.defualt = wxp

module.exports = wxp
