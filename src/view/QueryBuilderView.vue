<template>
  <div class="control-section">
    <div class="top-right-element">
      <ejs-button id="json-btn" :onClick="handleClick">Import JSON</ejs-button>
    </div>
    <ejs-dialog id="dialog" ref="Dialog" :header="header" :width="width" :height="height" :isModal="true" :buttons="buttons" :visible="visible" :content="dlgContent" :beforeOpen="beforeOpen" :animationSettings="animateSettings" :showCloseIcon="showCloseIcon"></ejs-dialog>
    <div class="col-lg-12 querybuilder-control">
      <ejs-querybuilder id="querybuilder" :dataSource="dataSource" ref="querybuilder" :rule="importRules" width="100%" :ruleChange="updateRule" :created="onQrybldrCreated">
        <e-columns>
          <e-column field='EmployeeID' label='Employee ID' type='number' />
          <e-column field='FirstName' label='First Name' type='string' />
          <e-column field='TitleOfCourtesy' label='Title Of Courtesy' type='boolean' :values="values" />
          <e-column field='Title' label='Title' type='string' />
          <e-column field='HireDate' label='Hire Date' type='date' format='dd/MM/yyyy' />
          <e-column field='Country' label='Country' type='string' />
          <e-column field='City' label='City' type='string' />
        </e-columns>
      </ejs-querybuilder>
      <div class="e-query-json-preview" id="e-query-json-preview" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div style="border: none; width: 100%;" >
          <label style="padding: 10px;">JSON</label>
          <div class="copy-tooltip" style='display: none' @click="copyClipboard">
            <ejs-tooltip id="tooltipClick" opensOn='Click' content='Copied to clipboard'>
              <div class="e-icons copycode"></div>
            </ejs-tooltip>
          </div>
        </div>
        <textarea :readonly="isReadOnly" class="e-json-content" id="json-textarea" title="JSON Content"></textarea>
      </div>
    </div>
  </div>
</template>



<script>
import { QueryBuilderComponent, ColumnDirective, ColumnsDirective, QueryLibrary } from "@syncfusion/ej2-vue-querybuilder";
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
import { DialogPlugin, DialogComponent, TooltipComponent } from '@syncfusion/ej2-vue-popups';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-vue-navigations';
import { RadioButtonComponent, ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { Browser, getComponent } from '@syncfusion/ej2-base';
import dataSource from './data-source.json';

import "@syncfusion/ej2-base/styles/tailwind.css";
import "@syncfusion/ej2-buttons/styles/tailwind.css";
import "@syncfusion/ej2-popups/styles/tailwind.css";
import "@syncfusion/ej2-splitbuttons/styles/tailwind.css";
import "@syncfusion/ej2-dropdowns/styles/tailwind.css";
import "@syncfusion/ej2-inputs/styles/tailwind.css";
import "@syncfusion/ej2-lists/styles/tailwind.css";
import "@syncfusion/ej2-calendars/styles/tailwind.css";
import "@syncfusion/ej2-querybuilder/styles/tailwind.css";

export default {
  data: function() {
    return {
      isReadOnly: true,
      header: 'JSON',
      boolOperators: [
        { value: 'equal', key: 'Equal' },
      ],
      importRules:  {
        'condition': 'and',
        'rules': [{
          'label': 'EmployeeID',
          'field': 'EmployeeID',
          'type': 'number',
          'operator': 'equal',
          'value': 1
        },
          {
            'label': 'Title',
            'field': 'Title',
            'type': 'string',
            'operator': 'equal',
            'value': 'Sales Manager'
          }]
      },
      animateSettings: { effect: 'Zoom' },
      width:'700px',
      height:'420px',
      content: '',
      dlgContent: "<textarea class='json-content-area' id='json-content-area'></textarea>"+"<span id='dlgSpan' :style='{ visibility: 'hidden'}'>Invalid Query</span>",
      showCloseIcon: true,
      visible: false,
      buttons: [
        {
          buttonModel: { isPrimary: false, content: 'Cancel' },
          click: function () {
            this.hide();
          },
        },
        {
          buttonModel: { isPrimary: true, content: 'Import' },
          click: this.importQuery
        },
      ],
      animationSettings: { effect: 'Zoom' },
      model_header: 'User details',
      isModal: true,
      dataSource: dataSource.employeeData,
      values: ['Mr.', 'Mrs.']
    };
  },
  components: {
    'ejs-querybuilder': QueryBuilderComponent,
    'ejs-dialog': DialogComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective,
    'ejs-tooltip': TooltipComponent,
    'ejs-button': ButtonComponent,
  },
  provide: {
    // Injecting QueryLibrary module
    QueryBuilderComponent: [QueryLibrary]
  },
  methods: {
    onQrybldrCreated: function() {
      if(Browser.isDevice) {
        this.$refs.querybuilder.$el.ej2_instances[0].summaryView = true;
      }
      var validRule = this.$refs.querybuilder.ej2Instances.getValidRules(this.$refs.querybuilder.ej2Instances.rule);
      this.content = JSON.stringify(validRule, null, 4);
      (document.getElementById('json-textarea')).value = this.content;
    },
    importQuery () {
      try {
        var textAreacontent = document.getElementById('json-content-area');
        this.$refs.querybuilder.ej2Instances.setRules(JSON.parse(textAreacontent.value));
        this.updateRule();
        this.$refs.Dialog.hide();
      } catch (error) {
        var errorElem = document.getElementById('dlgSpan');
        if (!errorElem.classList.contains("error")) {
          errorElem.style.visibility = 'visible';
          errorElem.classList.add("error");
        }
      }
    },
    beforeOpen: function (args) {
      var dlgContentElement = document.getElementById('json-content-area');
      var errorElem = document.getElementById('dlgSpan');
      if (dlgContentElement) {
        var validRule = this.$refs.querybuilder.ej2Instances.getValidRules(this.$refs.querybuilder.ej2Instances.rule);
        this.content = JSON.stringify(validRule, null, 4);
        dlgContentElement.value = this.content;
        errorElem.style.visibility = 'hidden';
        if (errorElem.classList.contains("error")) {
          errorElem.classList.remove("error");
        }
      }
    },
    updateRule () {
      var validRule = this.$refs.querybuilder.ej2Instances.getValidRules(this.$refs.querybuilder.ej2Instances.rule);
      this.content = JSON.stringify(validRule, null, 4);
      (document.getElementById('json-textarea')).value = this.content;
      (document.getElementById('json-textarea')).readOnly = true;
    },
    copyClipboard: function (args) {
      navigator.clipboard.writeText(this.content);
      setTimeout(function () {
        (getComponent(args.target.closest('.e-tooltip'), 'tooltip')).close();
      }, 1000);
    },
    handleMouseEnter() {
      var elem = document.getElementsByClassName("copy-tooltip");
      elem[0].style.display = 'block';
    },
    handleMouseLeave() {
      var elem = document.getElementsByClassName("copy-tooltip");
      elem[0].style.display = 'none';
    },
    handleClick() {
      this.$refs.Dialog.show();
    },
  }
};
</script>
