/**
 * Created by Kurt on 2017-03-09.
 */
// src/components/User/UserModel.js

// import libraries
import m from 'mithril'
import R from 'ramda'
import * as L from 'partial.lenses'
import * as X from 'xioup.main.utils'

// import state
import state from 'App/AppModel'

// config
const itemName = 'users'

// helpers
const apiItemList = `${ X.apiUrlRoot }/users`
const apiItem = `${ apiItemList }/:id`

// state setup
const modelsOptic = [ 'models' ]
const itemRootOptic = R.append( itemName, modelsOptic )
const item = state( R.append( 'current', itemRootOptic ), {} )
const itemList = state( R.append( 'list', itemRootOptic ), [] )

// api methods
const loadItemList = X.loadItemListFromApi( apiItemList, itemList )

const loadItem = X.loadItemFromApi( apiItem, item )

const saveItem = X.saveItemToApi( apiItem, item )

// state functions
const setItemPropToValueAttr = X.setStreamPropToValueAttr( item )
const getItemProp = X.getStreamProp( item )

const validateAndSaveItem = () =>
  R.compose( saveItem
           // the next line is for flyd only
           , R.tap( item )
           , L.modify( 'firstName', R.trim )
           , L.modify( 'lastName', R.trim )
           )( item() )

//computed properties
const firstAndLastName = model => `${ L.get( 'firstName', model ) } ${ L.get( 'lastName', model ) }`
const listItemLabel = firstAndLastName

module.exports =
  { itemName
  , item
  , itemList
  , loadItemList
  , loadItem
  , setItemPropToValueAttr
  , getItemProp
  , validateAndSaveItem
  , firstAndLastName
  , listItemLabel
  }
