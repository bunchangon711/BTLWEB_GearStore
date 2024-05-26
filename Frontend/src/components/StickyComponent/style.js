import styled from "styled-components";

export const StickyBanner = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0px;
    margin: auto;
    z-index: 1;
    width: 1600px;
`

export const StickyImageLeft = styled.img`
    scale: 45%;
    position: absolute;
    left: -180px;
    top: -180px;
    cursor: pointer;
`

export const StickyImageRight = styled.img`
    scale: 45%;
    position: absolute;
    right: -180px;
    top: -180px;
    cursor: pointer;
`
