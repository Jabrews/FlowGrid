// side dropper display
import React from 'react';
import { AlarmClock } from 'lucide-react';
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

// Home Menu
import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import { X } from 'lucide-react';




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

    // Grid And Workspace Components
    case 'Timer':
      return React.createElement(AlarmClock, { size });
    case 'Tracker':
      return React.createElement(Cable, { size });
    case 'Sticky-Notes':
      return React.createElement(StickyNote, { size });
    case 'Table-List':
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
    default:
      console.log('getSvgIcons : couldnt find icon : ', icon, ' size : ', size)
      return null;
  }
}