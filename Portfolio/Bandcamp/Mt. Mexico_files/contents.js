(function() {
    Cart.init_data = {"currency":"USD","is_default":true,"country_name":"United States","country":"US"};
    var html = "\u003Cdiv id=\"sidecart\" style=\"display: none\">\n    \u003Cdiv id=\"sidecartReveal\" class=\"reveal\">\n        \u003Cdiv id=\"sidecartBody\">\n            \u003Cdiv id=\"sidecartHeader\">\n                \n                \u003Ch3 class=\"title\">shopping cart\u003C/h3>\n                \n            \u003C/div>\n            \u003Cdiv id=\"sidecart-phone-reveal\">\n                \u003Cdiv id=\"sidecartContents\">\n                    \u003Cdiv id=\"item_list\">\n                        \n                    \u003C/div>\n                \u003C/div>\n                \u003Cdiv id=\"sidecartFooter\">\n                    \u003Cdiv id=\"sidecartSummary\">\n                        \n                        \n                        \n                        \n                        \n                        \n                        \n                        \n                        \n                        \n                        \n                        \n                        \n\n\n\u003Ctable id=\"summary\">\n  \n  \n  \n    \u003Ctr class=\"total\">\n        \u003Cth>total\u003C/th>\n        \u003Ctd class=\"numeric\">\u003C/span>\u003C/td>\n        \u003Ctd class=\"currency\">\u003Ca href=\"/no_js/country_picker\">USD\u003C/a>\u003C/td>\n    \u003C/tr>\n  \n\u003C/table>\n\n\u003Cdiv class=\"summary-notes\">\n  \n\u003C/div>\n                    \u003C/div>\n                    \u003Ch4>\u003Ca id=\"sidecartCheckout\" class=\"buttonLink notSkinnable\" href=\"#\">Checkout\u003C/a>\u003C/h4>\n                \u003C/div>\n            \u003C/div>\n        \u003C/div>\n    \u003C/div>\n\u003C/div>\n";
    if (Cart.renderInitial)
        Cart.renderInitial(html);
    else
        document.write(html);  // push compatibility
})();