import {
  omitDeep,
  removeType,
  onBlackList,
  generateConfig,
  defaultTrackingLib
} from '../src/helpers'
import { expect, assert } from 'chai'
import _ from 'lodash'

describe('omitDeep helper method Test', () => {
  let payload = omitDeep(
    {
      name: 'Angel Botto',
      email: 'angel@liftit.co',
      token: 'SENSIBLE_DATA',
      orgs: [{ token: 'MORE_SENSIBLE DATA', secure: 'yep' }]
    },
    ['token']
  )

  it('Remove sensible keys from payload object', () =>
    expect(payload).to.not.have.all.deep.keys('token'))

  it('Validate object schema from sensible data', () =>
    expect(payload).to.have.all.deep.keys('name', 'email', 'orgs'))
})

describe('defaultTrackingLib helper method Test', () => {
  let trackingLib = defaultTrackingLib()

  it('validate have track and identify methods', () =>
    expect(trackingLib).to.have.all.deep.keys('track', 'identify'))

  it('tracking lib has track as a function', () =>
    assert.isFunction(trackingLib.track))

  it('tracking lib has identify as a function', () =>
    assert.isFunction(trackingLib.identify))
})

describe('generateConfig helper method Test', () => {
  it('Config has all keys', () =>
    expect(generateConfig()).to.have.all.deep.keys(
      'blacklistActions',
      'blacklistKeys',
      'identifyAction',
      'identifySchemaID',
      'trackingLib'
    ))
})

describe('Test another helpers', () => {
  it('onBlackList filter', () =>
    assert.isFalse(onBlackList(['SESSION_SUCCESS'], 'SESSION_SUCCESS')))
  it('removeType', () =>
    expect(removeType({ type: 'HI' })).to.not.have.property('type'))
})
