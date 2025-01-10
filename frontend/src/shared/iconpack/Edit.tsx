import { SVGProps } from 'react'

export const Edit = (props: SVGProps<SVGSVGElement>) => (
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"
{...props}>
<circle cx="15" cy="15" r="15" fill="white"/>
<path d="M12 15L10 9L22.6667 15M12 15L10 21L22.6667 15M12 15H22.6667" stroke="#A5B4CB" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

)