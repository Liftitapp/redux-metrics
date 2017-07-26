import _ from 'lodash'

export const omitDeep = (input, blacklistKeys) => {
  const omitDeepProps = obj => {
    switch (true) {
      case _.isArray(obj):
        return omitDeep(obj, blacklistKeys)
      case !_.isArray(obj) && !_.isObject(obj):
        return obj
      case typeof obj === 'undefined':
        return {}
      default:
        const result = {}
        _.forOwn(obj, (value, key) => {
          result[key] = omitDeep(value, blacklistKeys)
        })
        return _.omit(result, blacklistKeys)
    }
  }
  switch (true) {
    case _.isArray(input):
      return input.map(omitDeepProps)
    case typeof input === 'undefined':
      return {}
    default:
      return omitDeepProps(input)
  }
}

// Default tracker tool, ideal use with
export const defaultTrackingLib = () => ({
  track: (event, payload) => {
    console.log(event)
  },
  identify: (id, payload) => {
    console.log(id)
  }
})

export const generateConfig = config => {
  const deafaultConfig = {
    blacklistActions: [],
    blacklistKeys: [],
    identifyAction: null,
    identifySchemaID: null,
    trackingLib: defaultTrackingLib
  }
  return Object.assign(deafaultConfig, config)
}

export const onBlackList = (blacklistActions, type) =>
  !_.includes(blacklistActions, type)

export const removeType = action => _.omit(action, 'type')
export const getID = (payload, identifySchemaID) =>
  `${_.get(payload, identifySchemaID) || 'NOT_ID'}`
