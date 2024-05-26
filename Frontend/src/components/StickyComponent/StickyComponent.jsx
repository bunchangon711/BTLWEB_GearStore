import React from 'react'
import sticky1 from '../../assets/images/sticky1.webp'
import sticky2 from '../../assets/images/sticky2.webp'
import { StickyBanner, StickyImageLeft, StickyImageRight } from './style'

const StickyComponent = () => {
    return (
        <StickyBanner>
            <a href='http://localhost:3000/product-details/66431ba57b87e82a38f78168'>
                <StickyImageLeft src={sticky1} alt="banner left" preview="false" />
            </a>
            <a href='http://localhost:3000/product-details/664378ece92d04311175e04a'>
                <StickyImageRight src={sticky2} alt="banner right" preview="false" />
            </a>
        </StickyBanner>
    )
}

export default StickyComponent