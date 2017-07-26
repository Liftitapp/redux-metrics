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
