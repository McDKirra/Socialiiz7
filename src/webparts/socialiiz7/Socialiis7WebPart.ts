import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

// npm install @pnp/logging @pnp/common @pnp/odata @pnp/sp --save
import { sp } from '@pnp/sp';

//Updated Jan 5, 2020 per https://pnp.github.io/pnpjs/getting-started/
import { Web } from "@pnp/sp/presets/all";

import { propertyPaneBuilder } from '../../services/propPane/PropPaneBuilder';
import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../services/createAnalytics';

import { PageContext } from '@microsoft/sp-page-context';


import * as strings from 'Socialiiz7WebPartStrings';
import Socialiiz7 from './components/Socialiiz7';
import { ISocialiiz7Props } from './components/ISocialiiz7Props';

export interface ISocialiiz7WebPartProps {

  // 0 - Context
  description: string;
  pageContext: PageContext;

  // 1 - Analytics options
  useListAnalytics: boolean;
  analyticsWeb?: string;
  analyticsList?: string;
  stressMultiplier?: number;

  // 2 - Source and destination list information
  sourceListURL: string;
  sourceListTitle: string;

  // 8 - Pivot Choices - Top Bar
  pivotSize: string;
  pivotFormat: string;
  pivotOptions: string;
  pivotTab: string;  //May not be needed because we have projectMasterPriority

  navigationType: string;

}

export default class Socialiiz7WebPart extends BaseClientSideWebPart<ISocialiiz7WebPartProps> {

    //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
    public onInit():Promise<void> {
      return super.onInit().then(_ => {
        // other init code may be present
  
        //https://stackoverflow.com/questions/52010321/sharepoint-online-full-width-page
        if ( window.location.href &&  
          window.location.href.indexOf("layouts/15/workbench.aspx") > 0 ) {
            
          if (document.getElementById("workbenchPageContent")) {
            document.getElementById("workbenchPageContent").style.maxWidth = "none";
          }
        } 
        
        //console.log('window.location',window.location);
        sp.setup({
          spfxContext: this.context
        });
      });
    }
  
    public getUrlVars(): {} {
      var vars = {};
      vars = location.search
      .slice(1)
      .split('&')
      .map(p => p.split('='))
      .reduce((obj, pair) => {
        const [key, value] = pair.map(decodeURIComponent);
        return ({ ...obj, [key]: value }) ;
      }, {});
      return vars;
    }


  public render(): void {
    const element: React.ReactElement<ISocialiiz7Props > = React.createElement(
      Socialiiz7,
      {
        description: this.properties.description,
        // 0 - Context
        pageContext: this.context.pageContext,
        tenant: this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl,""),
        urlVars: this.getUrlVars(),
      
        // 1 - Analytics options  
        useListAnalytics: this.properties.useListAnalytics,
        analyticsWeb: strings.analyticsWeb,
        analyticsList: strings.analyticsList,
      
        // 2 - Source and destination list information
        sourceListURL: this.properties.sourceListURL, //Get from list item  
        sourceListTitle: this.properties.sourceListTitle,  // Static Name of list (for URL) - used for links and determined by first returned item

      
        // 3 - 
      
        // 4 - 
      
        // 5 - UI Defaults
      
        // 6 - User Feedback
      
        // 7 - Media Choices - Left Side bar
        navigationType: this.properties.navigationType,

        // 8 - Pivot Choices - Top Bar
        pivotSize: this.properties.pivotSize,
        pivotFormat: this.properties.pivotFormat,
        pivotOptions: this.properties.pivotOptions,
        pivotTab: 'Projects', //this.properties.pivotTab (was setTab in pivot-tiles)
        
        // 9 - Other web part options

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
    return propertyPaneBuilder.getPropertyPaneConfiguration(this.properties);
  }
  
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {

    /**
     * Use this section when there are multiple web part configurations
     */
      /*
          let newMap : any = {};
          if (this.properties.scenario === 'DEV' ) {
            //newMap = availableListMapping.getListColumns(newValue);
          } else if (this.properties.scenario === 'TEAM') {
            //newMap = availableListMapping.getListColumns(newValue);  
          } else if (this.properties.scenario === 'CORP') {
            //newMap = availableListMapping.getListColumns(newValue); 
          }

          const hasValues = Object.keys(newMap).length;

          if (hasValues !== 0) {
            //this.properties.listTitle = newMap.listDisplay;
          } else {
            console.log('Did NOT List Defintion... updating column name props');
          }
          this.context.propertyPane.refresh();

      /**
     * Use this section when there are multiple web part configurations
     */

    /**
     * This section is used to determine when to refresh the pane options
     */
    let updateOnThese = [
      'setSize','setTab','otherTab','setTab','otherTab','setTab','otherTab','setTab','otherTab',
      'navigationType'
    ];

    if (updateOnThese.indexOf(propertyPath) > -1 ) {
      this.properties[propertyPath] = newValue;   
      this.context.propertyPane.refresh();

    } else { //This can be removed if it works

    }
    this.render();
  }
}
