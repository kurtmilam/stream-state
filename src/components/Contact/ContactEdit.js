/**
 * Created by Kurt on 2017-03-09.
 */
// src/components/Contact/ContactEdit.js

// import libraries
import m from '../../utils/m-mock'
import * as X from '../../utils/xioup.main.utils'

// import model
import M from 'Contact/ContactModel'

module.exports =
  { oninit: vn => M.loadItem( vn.attrs.id )
  , onremove: M.item.end()
  , view: () =>
    <div>
      <label class="label">
        First Name
        <input
          class="input"
          type="text"
          placeholder="First Name"
          onchange={ M.setItemPropToValueAttr( 'firstName' ) }
          value={ M.getItemProp( 'firstName' ) }
        />
      </label>
      <label class="label">
        Last Name
        <input
          class="input"
          type="text"
          placeholder="Last Name"
          onchange={ M.setItemPropToValueAttr( 'lastName' ) }
          value={ M.getItemProp( 'lastName' ) }
        />
      </label>
      <button class="button" onclick={ M.validateAndSaveItem }>Save</button>
      &nbsp;
      <a class="button" href={ `/${ M.itemName }/` }  oncreate={ m.route.link }>Cancel</a>
    </div>
  }