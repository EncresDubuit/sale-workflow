from odoo import fields, models

class SaleOrderLine(models.Model):
    _inherit = "sale.order.line"

    # In core this a related field. We need to trigger its value on view, so we can
    # have it even when we're in a NewId
    order_partner_id = fields.Many2one(depends=["product_id"])

    def _compute_already_sold(self):
        for line in self:
            domain = [
                ("product_id", "=", line.product_id.id),
                ("state", "in", ["sale", "done"]),
                ("order_partner_id", "child_of", line.order_id.partner_id.commercial_partner_id.ids),
            ]
            order_lines = line.env["sale.order.line"].search(domain, limit=1)

            if order_lines:
                line.already_sold = True
            else:
                line.already_sold = False

    already_sold = fields.Boolean(compute=_compute_already_sold)

