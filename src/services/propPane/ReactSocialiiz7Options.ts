import {
    IPropertyPanePage,
    PropertyPaneLabel,
    IPropertyPaneLabelProps,
    PropertyPaneHorizontalRule,
    PropertyPaneTextField, IPropertyPaneTextFieldProps,
    PropertyPaneLink, IPropertyPaneLinkProps,
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    IPropertyPaneDropdownOption
  } from '@microsoft/sp-webpart-base';

  import { Pivot, IPivotStyles, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
  import { Image, ImageFit, ImageCoverStyle,IImageProps,IImageState } from 'office-ui-fabric-react/lib/Image';

  import * as strings from 'Socialiiz7WebPartStrings';

  export class Socialiiz7OptionsGroup {


    public leftNavChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        {   index: 0,   key: 'naviation', text: "Navigation"  },
        {   index: 1,   key: 'choice', text: "Choice"  },
    ];
    
    //Currently may not be neccessary
    public getLeftNav (findMe) {
        return findMe;
    }

  }

  export let socialiiz7OptionsGroup = new Socialiiz7OptionsGroup();