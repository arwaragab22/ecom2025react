import React, { ReactNode } from 'react'
import styles from "./style.module.css";
const {heading} = styles;
type Propstype = {
    children:ReactNode
}

function Heading({ children }: Propstype) {

    return <div className={`${heading} text-capitalize `}>{children}</div>;
}

export default Heading