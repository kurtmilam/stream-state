/**
 * Created by Kurt on 2017-04-10.
 */

//import libraries
import * as L from 'partial.lenses'



const always = a => _ => a
const compose = f => g => ( ...h ) => f( g( ...h ) )
const identity = a => a
const flip = fn => a => b => fn( b )( a )
const tap = fn => a => {
  fn( a )
  return a
}
const map = L.modify( L.elems )
import equals from 'ramda/src/equals.js'
const not = a => !a
// is is copied from https://github.com/ramda/ramda/blob/v0.23.0/src/is.js
const is = Ctor => a =>
  a != null && a.constructor === Ctor || a instanceof Ctor
import complement from 'ramda/src/complement.js'
// const complement = f => R__.compose( not )( f ) // not working - have to lift it

const R__ =
  { always
  , compose
  , identity
  , flip
  , tap
  , map
  , equals
  , not
  , is
  , complement
  }

module.exports = R__
