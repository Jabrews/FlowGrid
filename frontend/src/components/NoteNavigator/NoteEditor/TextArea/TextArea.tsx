
// hooks
import { useSetActiveTextLineNum, useActiveTextLineNum } from "./TextLine/hooks/ActiveTextLineStore";

// utill
import type { RawObj } from "./util/text_area_types";

// components
import TextAreaBtns from "./TextAreaBtns/TextAreaBtns";
import DisplayLine from "./DisplayLine/DisplayLine";
import TextLine from "./TextLine/TextLine";

type TextAreaProps = {
    rawObjs: RawObj[]
    setRawObjs: React.Dispatch<React.SetStateAction<RawObj[]>>
}

export default function TextArea({ rawObjs, setRawObjs }: TextAreaProps) {

    // hook init
    const setActiveTextLineNum = useSetActiveTextLineNum()
    const activeTextLineNum = useActiveTextLineNum()

    // handle nav
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'ArrowUp') {
            setActiveTextLineNum(activeTextLineNum - 1)
        }
        if (e.key == 'ArrowDown') {
            setActiveTextLineNum(activeTextLineNum + 1)
        }


    }


    return (
        <div className='text-area-container'>

            <div
                className='text-line-container'
                onKeyDown={handleKeyDown}
            >
                {/* render based upon line num*/}
                {rawObjs.map((rawObj: RawObj) => {
                    return rawObj.lineNum === activeTextLineNum ? (
                        <div
                            className="text-line-item-container"
                            key={`textlineitem-${rawObj.lineNum}`}
                        >
                            <TextLine
                                setRawObjs={setRawObjs}
                                rawObjs={rawObjs}
                                initText={rawObj.text}
                                lineNum={rawObj.lineNum}
                            />
                        </div>
                    ) : (
                        <div
                            className="display-line-item-container"
                            key={`displaylineitem-${rawObj.lineNum}`}
                        >
                            <DisplayLine
                                text={rawObj.text}
                                lineNum={rawObj.lineNum}
                            />
                        </div>
                    )
                })}
            </div>

            <TextAreaBtns rawObjs={rawObjs} setRawObjs={setRawObjs} />
        </div>


    )



}
