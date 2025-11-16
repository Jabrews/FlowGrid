// hooks
import useIsMobileScreen from "../hooks/useIsMobileScreen"; 

// Grid
import GridMobile from "../Grid/GridMobile/GridMobile";
import GridDesktop from "../Grid/GridDesktop/GridDesktop";

export default function WorkSpace() {

    // hook init
    const isMobileScreen = useIsMobileScreen()

    console.log('is mobile screen : ', isMobileScreen)

    return (
        <>
        {isMobileScreen &&
            <GridMobile />
        }
        {!isMobileScreen &&
            <GridDesktop />
        }
        </>
           )




}