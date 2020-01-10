import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'Socialiiz7WebPartStrings';
import Socialiiz7 from './components/Socialiiz7';
import { ISocialiiz7Props } from './components/ISocialiiz7Props';

export interface ISocialiiz7WebPartProps {
  description: string;
}

export default class Socialiiz7WebPart extends BaseClientSideWebPart<ISocialiiz7WebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISocialiiz7Props > = React.createElement(
      Socialiiz7,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
