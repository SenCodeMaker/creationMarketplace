import React, { useCallback } from 'react'
import { Responsive } from 'decentraland-ui'

import { VendorName } from '../../modules/vendor/types'
import { Menu } from '../Menu'
import { MenuItem } from '../Menu/MenuItem'
import { Props } from './VendorStrip.types'
import './VendorStrip.css'

const VendorStrip = (props: Props) => {
  const { vendor, address, onBrowse } = props

  const handleClick = useCallback(
    (vendor: VendorName) => {
      onBrowse({ vendor, address })
    },
    [onBrowse, address]
  )

  const species = VendorName.SPECIES

  return (
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <Menu className="VendorStrip">
        <MenuItem
          key={species}
          value={species}
          currentValue={vendor}
          image={`/${species}.png`}
          onClick={() => handleClick(species)}
        />
        {/* {getPartners().map(partner => (
          <MenuItem
            key={partner}
            value={partner}
            currentValue={vendor}
            image={`/${partner}.png`}
            onClick={() => handleClick(partner)}
          />
        ))} */}
      </Menu>
    </Responsive>
  )
}

export default React.memo(VendorStrip)
