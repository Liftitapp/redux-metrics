import {
  onBlackList,
  removeType,
  omitDeep,
  getID,
  generateConfig
} from './helpers'

/**
 * Transform your actions with following options
 *
 * @namespace
 * @param {object} config - config for metrics
 * @param {array} config.blacklistActions - actions ignore to not send to metrics warehouse
 * @param {array} config.blacklistKeys - keys remove on payload objects to keep secure sensible data
 * @param {string} config.identifyAction - action type to report new identify
 * @param {string} config.identifySchemaID - extract for payload the custom id for user
 * @param {function} config.trackingLib - custom tracking lib to report
 *
 * @returns {function} metrics middleware
 */
const createMetrics = config => {
  return store => next => action => {
    next(action)
    const {
      blacklistActions,
      blacklistKeys,
      identifyAction,
      identifySchemaID,
      trackingLib
    } = generateConfig(config)

    if (onBlackList(blacklistActions, action.type)) {
      const payload = removeType(action)
      const cleanPayload = omitDeep(payload, blacklistKeys)
      switch (action.type) {
        case identifyAction:
          trackingLib.identify(
            getID(cleanPayload, identifySchemaID),
            cleanPayload
          )
          break
        default:
          break
      }
      trackingLib.track(action.type, cleanPayload)
    }
  }
}

export default createMetrics
