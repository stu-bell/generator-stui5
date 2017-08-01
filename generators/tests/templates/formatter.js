sap.ui.require(
  [
    "<%= formatterNamespace %>",
    "sap/ui/core/Locale",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/thirdparty/sinon",
    "sap/ui/thirdparty/sinon-qunit"
  ],
  function (formatter, Locale, ResourceModel) {
    "use strict";
    
    QUnit.module("This is a name of a module under test");
    
    // Example Unit test
    QUnit.test("Formatter function someFunctionReturning1 should always return 1", function (assert) {
      var iShouldBe1 = formatter.someFunctionReturning1();
      assert.strictEqual(iShouldBe1, 1, "The formatter function correctly returned 1");
    });
    
    QUnit.module("This is another module which may have other QUnit.tests below");
    
    QUnit.module("This is another module. This one with a setup", {
      // Some formatters being tested use i18n so we need to setup that
      setup: function () {
        this._oResourceModel = new ResourceModel({
          bundleUrl : jQuery.sap.getModulePath(
            "<%= appNamespace %>",
            "../../../i18n/i18n.properties")
        });
      },
      teardown: function () {
        this._oResourceModel.destroy();
      }
    });
    
    
    QUnit.test("This is a sample test which stubs the view and controller to test a formatter which calls this.getView().getModel('i18n')",
               function(assert) {
                 // First isolate the formatter as it uses i18n
                 // Help: https://openui5beta.hana.ondemand.com/1.34.7/docs/guide/e1ce1de315994a02bf162f4b3b5a9f09.html
                 var  oViewStub = {
                   getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
                 };
                 var oControllerStub = {
                   getView: this.stub().returns(oViewStub)
                 };
                 // System under test
                 var fnIsolatedFormatter = formatter.documentStatus.bind(oControllerStub);
                 var s = null;
                 
                 // Call fnIsolatedFormatter as if it was a normal function. it will grab the i18n by
                 // calling this.getView().getModel('i18n') which goes to the stub setup above.
                 s = fnIsolatedFormatter(/*some parameter*/);
                 assert.strictEqual(s, "Some expected result",
                                    "Formatted value correctly");
               });
    
  }
);
