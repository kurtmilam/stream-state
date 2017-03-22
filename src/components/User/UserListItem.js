/**
 * Created by Kurt on 2017-03-16.
 */
// src/components/User/UserListItem.js

// import libraries
import m from 'mithril'
import R from 'ramda'
// import btn from 'polythene/button/button'
import * as X from 'xioup.main.utils'

// import model
import M from 'User/UserModel'

module.exports = vn =>
    <div class={ `${ M.itemName }-list-item` } key={ vn.id } onclick={ console.log }>
      <span>{ M.firstAndLastName( vn ) }</span>
      &nbsp;&nbsp;
      <a class="button" href={ X.showItemHref( M.itemName, vn ) } oncreate={ m.route.link }>View</a>
      &nbsp;&nbsp;
      <a class="button" href={ X.editItemHref( M.itemName, vn ) } oncreate={ m.route.link }>Edit</a>
      &nbsp;&nbsp;
      <button class="button">Remove</button>
      &nbsp;&nbsp;
      <btn label="IT FINALLY WORKS!" raised={ true }/>
    </div>

