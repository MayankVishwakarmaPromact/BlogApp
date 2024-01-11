import { Children } from "react"

export const ForEach = ({render,of}) => Children.toArray(of.map((item, index)=>render(item, index)))
