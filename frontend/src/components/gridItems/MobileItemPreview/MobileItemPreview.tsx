// util
import { get_svg_icons } from "../../util/get_svg_icons"

type MobileItemPreviewProps = {
    type : string,
    i : string,
}

export default function MobileItemPreview({type, i} : MobileItemPreviewProps) {

    return (
        <div className='item-preview-mobile-container'>
            <p> {type} </p>
            {get_svg_icons({icon : type, size : 64})}
        </div>
    )


}