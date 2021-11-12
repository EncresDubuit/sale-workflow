odoo.define("sale_order_line_sales_history.sales_history_widget", function (require) {
    "use strict";

    var Widget = require("web.Widget");
    var widget_registry = require("web.widget_registry");

    var SaleOrderLineSalesHistoryWidget = Widget.extend({
        template: "sale_order_line_sales_history.sales_history_widget",
        events: _.extend({}, Widget.prototype.events, {
            "click .sales_history": "_onClickButton",
        }),

        init: function (parent, params) {
            this.data = params.data;
            this._super(parent);
        },

        updateState: function (state) {
            var candidate = state.data[this.getParent().currentRow];
            if (candidate) {
                this.data = candidate.data;
                this.renderElement();
            }
        },

        _onClickButton: function () {
            // When it's a new line, we can't rely on a line id for the wizard, but
            // we can provide the proper element to find the historic lines.
            this.$el.find(".sales_history").prop("special_click", true);
            var additional_context = {};
            if (this.data.id) {
                additional_context = {active_id: this.data.id};
            } else {
                additional_context = {
                    default_partner_id: this.data.order_partner_id.res_id,
                    default_product_id: this.data.product_id.res_id,
                };
            }
            this.do_action(
                "sale_order_line_sales_history.sale_order_line_sales_history_action",
                {
                    additional_context: additional_context,
                }
            );
        },
    });

    widget_registry.add(
        "sale_line_sales_history_widget",
        SaleOrderLineSalesHistoryWidget
    );

    return SaleOrderLineSalesHistoryWidget;
});
