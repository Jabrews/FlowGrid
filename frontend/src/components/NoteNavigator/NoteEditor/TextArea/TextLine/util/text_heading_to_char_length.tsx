
export default function text_heading_to_char_length(text : string) {


        // first char check
        const firstChar = text.substring(0,1)
        if (firstChar !== '#') {
            return 75
        } 

        // other char check 0,3)
        const chars = text.substring(0,3)
        let headingSize = 0
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] == '#')
            headingSize += 1
        }


        switch (headingSize) {
            case 1 : 
                return 61    
           case 2 : 
                return 64
           case 3 : 
                return 67
        }


    }
