{
    "name": "Sale order line sales history",
    "version": "14.0.1.0.0",
    "category": "Sales Management",
    "author": "Nuxly," "Adgensee," "Odoo Community Association (OCA)",
    "website": "https://github.com/OCA/sale-workflow",
    "license": "AGPL-3",
    
    "depends": [
        "sale"
    ],
    
    "data": [
        "security/ir.model.access.csv",
        "wizards/sale_order_line_sales_history.xml",
        "views/sale_order.xml",
        "views/assets.xml",
    ],
    
    "qweb": ["static/src/xml/sale_line_sales_history_widget.xml"],
    
    "installable": True,
}
