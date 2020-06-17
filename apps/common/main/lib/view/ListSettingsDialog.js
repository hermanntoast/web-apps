/*
 *
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

/**
 *  ListSettingsDialog.js
 *
 *  Created by Julia Radzhabova on 30.10.2019
 *  Copyright (c) 2019 Ascensio System SIA. All rights reserved.
 *
 */

if (Common === undefined)
    var Common = {};

define([
    'common/main/lib/component/Window',
    'common/main/lib/component/MetricSpinner',
    'common/main/lib/component/ThemeColorPalette',
    'common/main/lib/component/ColorButton',
    'common/main/lib/view/SymbolTableDialog'
], function () { 'use strict';

    Common.Views.ListSettingsDialog = Common.UI.Window.extend(_.extend({
        options: {
            type: 0, // 0 - markers, 1 - numbers
            width: 280,
            height: 255,
            style: 'min-width: 240px;',
            cls: 'modal-dlg',
            split: false,
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            this.type = options.type || 0;
            this.subtype = options.subtype || 1;

            _.extend(this.options, {
                title: this.txtTitle
            }, options || {});

            this.template = [
                '<div class="box">',
                    '<div style="margin-bottom: 16px;">',
                        '<button type="button" class="btn btn-text-default auto" id="id-dlg-list-bullet" style="border-top-right-radius: 0;border-bottom-right-radius: 0;">', this.textBulleted,'</button>',
                        '<button type="button" class="btn btn-text-default auto" id="id-dlg-list-numbering" style="border-top-left-radius: 0;border-bottom-left-radius: 0;border-left-width: 0;margin-left: -1px;">', this.textNumbering,'</button>',
                    '</div>',
                    '<div style="height:120px;">',
                        '<table cols="3">',
                            '<tr>',
                                '<td style="padding-right: 5px;padding-bottom: 8px;min-width: 50px;">',
                                    '<label class="text">' + this.txtType + '</label>',
                                '</td>',
                                '<td style="padding-right: 5px;padding-bottom: 8px;width: 100px;">',
                                    '<div id="id-dlg-list-numbering-format" class="input-group-nr" style="width: 100px;"></div>',
                                    '<div id="id-dlg-list-bullet-format" class="input-group-nr" style="width: 100px;"></div>',
                                '</td>',
                                '<td style="padding-bottom: 8px;"></td>',
                            '</tr>',
                            '<tr>',
                                '<td style="padding-right: 5px;padding-bottom: 8px;min-width: 50px;">',
                                    '<label class="text">' + this.txtSize + '</label>',
                                '</td>',
                                '<td style="padding-right: 5px;padding-bottom: 8px;width: 100px;">',
                                    '<div id="id-dlg-list-size"></div>',
                                '</td>',
                                '<td style="padding-bottom: 8px;">',
                                    '<label class="text" style="white-space: nowrap;">' + this.txtOfText + '</label>',
                                '</td>',
                            '</tr>',
                            '<tr class="numbering">',
                                '<td style="padding-right: 5px;padding-bottom: 8px;min-width: 50px;">',
                                    '<label class="text" style="white-space: nowrap;">' + this.txtStart + '</label>',
                                '</td>',
                                '<td style="padding-right: 5px;padding-bottom: 8px;width: 100px;">',
                                    '<div id="id-dlg-list-start"></div>',
                                '</td>',
                                '<td style="padding-bottom: 8px;"></td>',
                            '</tr>',
                            '<tr>',
                                '<td style="padding-right: 5px;padding-bottom: 8px;min-width: 50px;">',
                                    '<label class="text">' + this.txtColor + '</label>',
                                '</td>',
                                '<td style="padding-right: 5px;padding-bottom: 8px;width: 100px;">',
                                    '<div id="id-dlg-list-color"></div>',
                                '</td>',
                                '<td style="padding-bottom: 8px;"></td>',
                            '</tr>',
                        '</table>',
                    '</div>',
                '</div>'
            ].join('');

            this.props = options.props;
            this.options.tpl = _.template(this.template)(this.options);

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var me = this,
                $window = this.getChild();
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));

            me.btnBullet = new Common.UI.Button({
                el: $('#id-dlg-list-bullet'),
                enableToggle: true,
                toggleGroup: 'list-type',
                allowDepress: false,
                pressed: true
            });
            me.btnBullet.on('click', _.bind(me.onListTypeClick, me, 0));

            me.btnNumbering = new Common.UI.Button({
                el: $('#id-dlg-list-numbering'),
                enableToggle: true,
                toggleGroup: 'list-type',
                allowDepress: false
            });
            me.btnNumbering.on('click', _.bind(me.onListTypeClick, me, 1));

            this.cmbNumFormat = new Common.UI.ComboBox({
                el          : $('#id-dlg-list-numbering-format'),
                menuStyle   : 'min-width: 100%;max-height: 183px;',
                editable    : false,
                cls         : 'input-group-nr',
                data        : [
                    { displayValue: this.txtNone,       value: -1 },
                    { displayValue: 'A, B, C,...',      value: 4 },
                    { displayValue: 'a), b), c),...',   value: 6 },
                    { displayValue: 'a, b, c,...',      value: 6 },
                    { displayValue: '1, 2, 3,...',      value: 1 },
                    { displayValue: '1), 2), 3),...',   value: 2 },
                    { displayValue: 'I, II, III,...',   value: 3 },
                    { displayValue: 'i, ii, iii,...',   value: 7 }
                ]
            });
            this.cmbNumFormat.on('selected', _.bind(function (combo, record) {
                if (this._changedProps) {
                    if (record.value == -1) {
                        // this._changedProps.put_ListType(-1);
                    } else {
                        // this._changedProps.put_ListType(1);
                        // this._changedProps.put_ListSubType(record.value);
                    }
                }
            }, this));

            var itemsTemplate =
                [
                    '<% _.each(items, function(item) { %>',
                    '<li id="<%= item.id %>" data-value="<%= item.value %>"><a tabindex="-1" type="menuitem">',
                    '<%= item.displayValue %><% if (item.value === 0) { %><span style="font-family:<%=item.font%>;"><%=item.symbol%></span><% } %>',
                    '</a></li>',
                    '<% }); %>'
                ];
            var template = [
                '<div class="input-group combobox input-group-nr <%= cls %>" id="<%= id %>" style="<%= style %>">',
                '<div class="form-control" style="padding-top:3px; line-height: 14px; cursor: pointer; <%= style %>"></div>',
                '<div style="display: table-cell;"></div>',
                '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="caret img-commonctrl"></span></button>',
                '<ul class="dropdown-menu <%= menuCls %>" style="<%= menuStyle %>" role="menu">'].concat(itemsTemplate).concat([
                '</ul>',
                '</div>'
            ]);
            this.cmbBulletFormat = new Common.UI.ComboBoxCustom({
                el          : $('#id-dlg-list-bullet-format'),
                menuStyle   : 'min-width: 100%;max-height: 183px;',
                style       : "width: 100px;",
                editable    : false,
                template    : _.template(template.join('')),
                itemsTemplate: _.template(itemsTemplate.join('')),
                data        : [
                    { displayValue: this.txtNone,       value: -1 },
                    { displayValue: this.txtSymbol + ': ', value: 0, symbol: "·", font: 'Symbol' },
                    { displayValue: this.txtSymbol + ': ', value: 0, symbol: "o", font: 'Courier New' },
                    { displayValue: this.txtSymbol + ': ', value: 0, symbol: "§", font: 'Wingdings' },
                    { displayValue: this.txtSymbol + ': ', value: 0, symbol: "v", font: 'Wingdings' },
                    { displayValue: this.txtSymbol + ': ', value: 0, symbol: "Ø", font: 'Wingdings' },
                    { displayValue: this.txtSymbol + ': ', value: 0, symbol: "ü", font: 'Wingdings' },
                    { displayValue: this.txtSymbol + ': ', value: 0, symbol: "¨", font: 'Symbol' },
                    { displayValue: this.txtSymbol + ': ', value: 0, symbol: "–", font: 'Arial' },
                    { displayValue: this.txtNewBullet, value: 1 }
                ],
                updateFormControl: function(record) {
                    var formcontrol = $(this.el).find('.form-control');
                    if (record) {
                        if (record.get('value')==0)
                            formcontrol[0].innerHTML = record.get('displayValue') + '<span style="font-family:' + (record.get('font') || 'Arial') + '">' + record.get('symbol') + '</span>';
                        else
                            formcontrol[0].innerHTML = record.get('displayValue');
                    } else
                        formcontrol[0].innerHTML = '';
                }
            });
            this.cmbBulletFormat.on('selected', _.bind(function (combo, record) {
                if (this._changedProps) {
                    if (record.value === 1) {
                        var me = this,
                            props = me.bulletProps,
                            handler = function(dlg, result, settings) {
                                if (result == 'ok') {
                                    var store = combo.store;
                                    if (!store.findWhere({value: 0, symbol: settings.symbol, font: settings.font}))
                                        store.add({ displayValue: me.txtSymbol + ': ', value: 0, symbol: settings.symbol, font: settings.font }, {at: store.length-1});
                                    combo.setData(store.models);
                                    combo.selectRecord(combo.store.findWhere({value: 0, symbol: settings.symbol, font: settings.font}));

                                    props.changed = true;
                                    props.code = settings.code;
                                    props.font = settings.font;
                                    props.symbol = settings.symbol;
                                    if (me._changedProps) {
                                        me._changedProps.asc_putBulletFont(props.font);
                                        me._changedProps.asc_putBulletSymbol(props.symbol);
                                    }
                                }
                            },
                            win = new Common.Views.SymbolTableDialog({
                                api: me.options.api,
                                lang: me.options.interfaceLang,
                                modal: true,
                                type: 0,
                                font: props.font,
                                symbol: props.symbol,
                                handler: handler
                            });
                        win.show();
                        win.on('symbol:dblclick', handler);
                    } if (record.value == -1) {
                        // this._changedProps.put_ListType(-1);
                    } else {
                        // this._changedProps.put_ListType(0);
                        // this._changedProps.put_ListSubType(record.value);
                        this.bulletProps.changed = true;
                        this.bulletProps.code = record.code;
                        this.bulletProps.font = record.font;
                        this.bulletProps.symbol = record.symbol;
                        if (this._changedProps) {
                            this._changedProps.asc_putBulletFont(this.bulletProps.font);
                            this._changedProps.asc_putBulletSymbol(this.bulletProps.symbol);
                        }
                    }
                }
            }, this));

            this.spnSize = new Common.UI.MetricSpinner({
                el          : $window.find('#id-dlg-list-size'),
                step        : 1,
                width       : 100,
                value       : 100,
                defaultUnit : '',
                maxValue    : 400,
                minValue    : 25,
                allowDecimal: false
            }).on('change', function(field, newValue, oldValue, eOpts){
                if (me._changedProps) {
                    me._changedProps.asc_putBulletSize(field.getNumberValue());
                }
            });

            this.btnColor = new Common.UI.ColorButton({
                parentEl: $window.find('#id-dlg-list-color'),
                style: "width:45px;",
                additionalAlign: this.menuAddAlign
            });
            this.btnColor.on('color:select', _.bind(this.onColorsSelect, this));
            this.colors = this.btnColor.getPicker();

            this.spnStart = new Common.UI.MetricSpinner({
                el          : $window.find('#id-dlg-list-start'),
                step        : 1,
                width       : 100,
                value       : 1,
                defaultUnit : '',
                maxValue    : 32767,
                minValue    : 1,
                allowDecimal: false
            }).on('change', function(field, newValue, oldValue, eOpts){
                if (me._changedProps) {
                    me._changedProps.put_NumStartAt(field.getNumberValue());
                }
            });

            me.numberingControls = $window.find('.numbering');

            var el = $window.find('table tr:first() td:first()');
            el.width(Math.max($window.find('.numbering .text').width(), el.width()));

            this.afterRender();
        },

        afterRender: function() {
            this.updateThemeColors();
            this._setDefaults(this.props);
        },

        updateThemeColors: function() {
            this.colors.updateColors(Common.Utils.ThemeColor.getEffectColors(), Common.Utils.ThemeColor.getStandartColors());
        },

        onColorsSelect: function(btn, color) {
            if (this._changedProps) {
                this._changedProps.asc_putBulletColor(Common.Utils.ThemeColor.getRgbColor(color));
            }
        },

        onListTypeClick: function(type, btn, event) {
            this.ShowHideElem(type);
            if (this._changedProps) {
                if (type==0) {//markers
                    if (this.cmbBulletFormat.getValue()==-1) {
                        // this._changedProps.asc_putType(-1);
                    } else {
                        this._changedProps.asc_putBulletFont(this.bulletProps.font);
                        this._changedProps.asc_putBulletSymbol(this.bulletProps.symbol);
                    }
                    // this._changedProps.asc_putType(0);
                    // this._changedProps.asc_putSubType(0);
                } else {
                    var value = this.cmbNumFormat.getValue();
                    if (value==-1) {
                        // this._changedProps.asc_putType(-1);
                    } else {
                        // this._changedProps.asc_putType(1);
                        // this._changedProps.asc_putSubType(value);
                    }
                }
            }
        },

        ShowHideElem: function(value) {
            this.numberingControls.toggleClass('hidden', value==0);
            this.cmbNumFormat.setVisible(value==1);
            this.cmbBulletFormat.setVisible(value==0);
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                this.options.handler.call(this, state, this._changedProps);
            }
            this.close();
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        onPrimary: function(event) {
            this._handleInput('ok');
            return false;
        },

        _setDefaults: function (props) {
            if (props) {
                (this.type == 0) ? this.btnBullet.toggle(true) : this.btnNumbering.toggle(true);
                this.ShowHideElem(this.type);

                this.spnSize.setValue(props.asc_getBulletSize() || '', true);
                var color = props.asc_getBulletColor();
                if (color) {
                    if (color.get_type() == Asc.c_oAscColor.COLOR_TYPE_SCHEME) {
                        color = {color: Common.Utils.ThemeColor.getHexColor(color.get_r(), color.get_g(), color.get_b()), effectValue: color.get_value()};
                    } else {
                        color = Common.Utils.ThemeColor.getHexColor(color.get_r(), color.get_g(), color.get_b());
                    }
                } else
                    color = 'transparent';
                this.btnColor.setColor(color);
                if ( typeof(color) == 'object' ) {
                    var isselected = false;
                    for (var i=0; i<10; i++) {
                        if ( Common.Utils.ThemeColor.ThemeValues[i] == color.effectValue ) {
                            this.colors.select(color,true);
                            isselected = true;
                            break;
                        }
                    }
                    if (!isselected) this.colors.clearSelection();
                } else
                    this.colors.select(color,true);

                if (this.type==0) {
                    this.bulletProps = {symbol: props.asc_getBulletSymbol(), font: props.asc_getBulletFont()};
                    if (!this.cmbBulletFormat.store.findWhere({value: 0, symbol: this.bulletProps.symbol, font: this.bulletProps.font}))
                        this.cmbBulletFormat.store.add({ displayValue: this.txtSymbol + ': ', value: 0, symbol: this.bulletProps.symbol, font: this.bulletProps.font }, {at: this.cmbBulletFormat.store.length-1});
                    this.cmbBulletFormat.setData(this.cmbBulletFormat.store.models);
                    this.cmbBulletFormat.selectRecord(this.cmbBulletFormat.store.findWhere({value: 0, symbol: this.bulletProps.symbol, font: this.bulletProps.font}));
                    this.cmbNumFormat.setValue(1);
                } else {
                    this.cmbNumFormat.setValue(this.subtype, '');
                    var rec = this.cmbBulletFormat.store.at(1);
                    this.cmbBulletFormat.selectRecord(rec);
                    this.bulletProps = {symbol: rec.get('symbol'), font: rec.get('font')};

                    var value = props.get_NumStartAt();
                    this.spnStart.setValue(value || '', true);
                    this.spnStart.setDisabled(value===null);
                }
            }
            this._changedProps = new Asc.asc_CParagraphProperty();
        },

        txtTitle: 'List Settings',
        txtSize: 'Size',
        txtColor: 'Color',
        txtOfText: '% of text',
        txtStart: 'Start at',
        txtBullet: 'Bullet',
        tipChange: 'Change bullet',
        textBulleted: 'Bulleted',
        textNumbering: 'Numbered',
        txtType: 'Type',
        txtNone: 'None',
        txtNewBullet: 'New bullet',
        txtSymbol: 'Symbol'
    }, Common.Views.ListSettingsDialog || {}))
});