/**
 * Created by Kurt on 2017-03-09.
 */
// src/components/User/UserModel.js

// import libraries
import * as R__ from 'xioup.ramda'
import R from 'ramda'
import * as L from 'partial.lenses'
import * as X from '../../utils/xioup.main.utils'
import * as laser from '../../utils/xioup.laser'
import * as D from '../../utils/xioup.data'

// import stateContainer
import stateContainer from 'App/AppModel'

// config
const entityName = 'users'

const state = stateContainer()
// const state = stateContainer

// helpers
const apiTableUrl = `${ X.apiUrlRoot }/${ entityName }`
const apiRowUrl = `${ apiTableUrl }/:id`

// stateContainer setup
// probably add it to the container
const containerType = 'table'
const initTable =
  { id: containerType + ':' + entityName
  , rows: []
  , type: containerType
  , ui: { filter: { by: '' }, sort: { by: [ 'id' ] } }
  }

// Need to keep this in order to initiate the table with all of its fields
const table$ = stateContainer( [ entityName ], initTable )

// The following also works:
// const table$ = flyd.stream( initTable )

const rowsL   = [ entityName, 'rows' ]
// const rowsA   = laser.lensedAtom( rowsL, state, [] )
const rowsUIL = [ entityName, 'ui' ]
// const testAtom = laser.lensedAtom( [ 'test', 'delete', 'me' ], stateContainer(), [] )
// window.testAtom = testAtom
window.state = state

//computed properties
const listRowLabel = record =>
  L.get( [ 'data', 'id' ], record )
  + '. '
  + L.get( [ 'data', 'firstName' ], record )
  + ' '
  + L.get( [ 'data', 'lastName' ], record )

// api methods
// TODO: Try to merge the following two functions into one?
const loadTableFromApi =
  R.composeP( laser.setOn$( state )( rowsL )
            , D.loadTableFromApi( apiTableUrl )
            )

// reloads the table if called with []
// useful for conditionally loading from the Api when the atom is empty
const loadTable = R__.when( R__.equals( [] ) )( loadTableFromApi )

// TODO: lensCreator? lc() returns the lens, lc(x) returns new lc with x appended to previous lens
const rowByIdL = id =>
  X.appendTo( rowsL )
            ( L.find( R.whereEq( { id } ) ) )
const getRowL = R__.compose( rowByIdL )
                         ( Number )
// const getById = id =>
//   laser.lensedAtom( rowByIdL( id ), state )

const saveRow = D.saveRowToApi_( apiRowUrl )

const validateAndSaveRow = dataL =>
  R__.compose( saveRow( dataL ) )
           ( R__.compose( laser.over$( [ dataL, 'firstName' ] )
                               ( R.trim )
                      )
                      ( laser.over$( [ dataL, 'lastName' ] )
                               ( R.trim )
                      )
           )

module.exports =
  { entityName
  , state
  // , table$
  , rowsL
  , rowsUIL
  , loadTableFromApi
  , loadTable
  , rowByIdL
  , getRowL
  // , getById
  , validateAndSaveRow
  , listRowLabel
  }
