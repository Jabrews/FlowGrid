// test

// side dropper display
import React from 'react';
import { AlarmClock, Folders } from 'lucide-react';
import { Cable } from 'lucide-react';
import { StickyNote } from 'lucide-react';
import {TableProperties} from 'lucide-react'
// side droppe close / open icon
import { PanelLeftOpen } from 'lucide-react';
import { PanelLeftClose } from 'lucide-react';
// side droppe close / open icon MOBILE
import { PanelTopOpen } from 'lucide-react';
import { PanelBottomOpen } from 'lucide-react';
// side dropper mobile lock
import {Lock} from 'lucide-react'
// mobile item preview
import {Move} from 'lucide-react'
// tracker input / output
import { Plug } from 'lucide-react';
import { Unplug } from 'lucide-react';
// sticky note line symbols
import { Square } from 'lucide-react';
import { SquareCheck } from 'lucide-react';
import { Dot } from 'lucide-react';
import { Minus } from 'lucide-react';
// zoom btns
import { ZoomIn } from 'lucide-react';
import { ZoomOut } from 'lucide-react';

// Home Menu
import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import { X } from 'lucide-react';
import { Pen } from 'lucide-react';

// Navbar
import {User} from 'lucide-react'
import { Lightbulb } from 'lucide-react';

// Note Menu
import { NotebookPen } from 'lucide-react'; 
import { Notebook } from 'lucide-react';
import { Folder } from 'lucide-react';
import { FolderOpen } from 'lucide-react';
import { ScrollText } from 'lucide-react';
import { Check } from 'lucide-react';
import { Scroll } from 'lucide-react';
// Note text are btns
import { CornerDownRight } from 'lucide-react';
import { CornerDownLeft} from 'lucide-react';
import { Highlighter } from 'lucide-react';
import { Bold } from 'lucide-react';
import { Italic } from 'lucide-react';
import { HeadingIcon} from 'lucide-react';
import { Heading1Icon, Heading2Icon, Heading3Icon} from 'lucide-react';






type UseSvgIconArguments = {
    icon : string,
    size : number,
}

export function get_svg_icons({ icon, size }: UseSvgIconArguments) {
  switch (icon) {

    // Home Menu
    case 'Item-Closed' :
      return React.createElement(ChevronDown, {size})
    case 'Item-Open' :
      return React.createElement(ChevronUp, {size})
    case 'Folder-Close' :
      return React.createElement(X, {size})
    case 'Folder-Nav-Open' :
        return React.createElement(PanelLeftOpen, { size });    
    case 'Change-Input' :
        return React.createElement(Pen, {size})

    // Navbar
    case 'User-Logo' :
        return React.createElement(User, { size });    
    case 'tutorial-btn' :
        return React.createElement(Lightbulb, {size})

    // zoom btns
    case 'zoom-in' :
      return React.createElement(ZoomIn, {size})
    case 'zoom-out' :
      return React.createElement(ZoomOut, {size})

    // Grid And Workspace Components
    case 'timer':
      return React.createElement(AlarmClock, { size });
    case 'tracker':
      return React.createElement(Cable, { size });
    case 'sticky_note':
      return React.createElement(StickyNote, { size });
    case 'table':
      return React.createElement(TableProperties, { size });
    case 'Side-Dropper-Open':
      return React.createElement(PanelLeftOpen, { size });
    case 'Side-Dropper-Close':
      return React.createElement(PanelLeftClose, { size });
    case 'Side-Dropper-Open-Mobile' :
      return React.createElement(PanelBottomOpen, { size });
    case 'Side-Dropper-Close-Mobile' :
      return React.createElement(PanelTopOpen, { size });
    case 'Lock' :
      return React.createElement(Lock, { size });
    case 'Item-Preview-Drag-Handle' :
      return React.createElement(Move, { size });

    // grid items
    
    // tracker input & output
    case "plug" :
      return React.createElement(Plug, { size });
    case "unplug" :
      return React.createElement(Unplug, { size });

    // sticky note
    case "checkbox_empty" :
      // these are switched 
      return React.createElement(SquareCheck, { size });
    case "checkbox_filled" :
      return React.createElement(Square, { size });
    case "bullet" :
      return React.createElement(Dot, { size });
    case "dash" :
      return React.createElement(Minus, {size})
    case "none" :
      return React.createElement(
        "p",
        { style: { backgroundColor: "lightgray" } },
        ""
      );

      // Note Mneu
      case 'notebook_open' :
        return React.createElement(NotebookPen, {size})
      case 'notebook_close' :
        return React.createElement(Notebook, {size})
      case 'folders' :
        return React.createElement(Folders, {size})
      case 'folder-open' : 
        return React.createElement(FolderOpen, {size})
      case 'folder-close' : 
        return React.createElement(Folder, {size})
      case 'note-icon' :
        return React.createElement(ScrollText, {size})
      case 'check' :
        return React.createElement(Check, {size})
      case 'new-note' :
        return React.createElement(Scroll, {size})


        // text area btns
      case 'indent-right' :
        return React.createElement(CornerDownRight, {size})
      case 'indent-left' :
        return React.createElement(CornerDownLeft, {size})
      case 'highlight' :
        return React.createElement(Highlighter, {size})
      case 'bold' :
        return React.createElement(Bold, {size})
      case 'italic' :
        return React.createElement(Italic, {size})
      case 'heading-0' : 
        return React.createElement(Heading1Icon, {size})
      case 'heading-1' : 
        return React.createElement(HeadingIcon, {size})
      case 'heading-2' : 
        return React.createElement(Heading3Icon, {size})
      case 'heading-3' : 
        return React.createElement(Heading2Icon, {size})



       




    default:
      console.log('getSvgIcons : couldnt find icon : ', icon, ' size : ', size)
      return null;
  }
}