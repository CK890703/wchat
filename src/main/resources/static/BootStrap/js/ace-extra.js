﻿if (!('ace' in window)) {
    window.ace = {
    }
}
if (!('vars' in window.ace)) {
    window.ace.vars = {
        icon: ' ace-icon ',
        '.icon': '.ace-icon'
    }
}
ace.config = {
    cookie_expiry: 604800,
    storage_method: 2
};
ace.settings = {
    is: function (b, a) {
        return (ace.data.get('settings', b + '-' + a) == 1)
    },
    exists: function (b, a) {
        return (ace.data.get('settings', b + '-' + a) !== null)
    },
    set: function (b, a) {
        ace.data.set('settings', b + '-' + a, 1)
    },
    unset: function (b, a) {
        ace.data.set('settings', b + '-' + a, -1)
    },
    remove: function (b, a) {
        ace.data.remove('settings', b + '-' + a)
    },
    navbar_fixed: function (a, d, b) {
        var c = document.getElementById('navbar');
        if (!c) {
            return false
        }
        a = a || false;
        if (!a && b !== false) {
            var e = null;
            if (ace.settings.is('sidebar', 'fixed') || ((e = document.getElementById('sidebar')) && ace.hasClass(e, 'sidebar-fixed'))) {
                ace.settings.sidebar_fixed(false)
            }
        }
        if (a) {
            if (!ace.hasClass(c, 'navbar-fixed-top')) {
                ace.addClass(c, 'navbar-fixed-top')
            }
            if (d !== false) {
                ace.settings.set('navbar', 'fixed')
            }
        } else {
            ace.removeClass(c, 'navbar-fixed-top');
            if (d !== false) {
                ace.settings.unset('navbar', 'fixed')
            }
        }
        document.getElementById('ace-settings-navbar').checked = a;
        if (window.jQuery) {
            jQuery(document).trigger('settings.ace', [
                'navbar_fixed',
                a
            ])
        }
    },
    sidebar_fixed: function (a, d, c) {
        var f = document.getElementById('sidebar');
        if (!f) {
            return false
        }
        a = a || false;
        if (!a && c !== false) {
            var b = null;
            if (ace.settings.is('breadcrumbs', 'fixed') || ((b = document.getElementById('breadcrumbs')) && ace.hasClass(b, 'breadcrumbs-fixed'))) {
                ace.settings.breadcrumbs_fixed(false)
            }
        }
        if (a && c !== false && !ace.settings.is('navbar', 'fixed')) {
            ace.settings.navbar_fixed(true)
        }
        if (a) {
            if (!ace.hasClass(f, 'sidebar-fixed')) {
                ace.addClass(f, 'sidebar-fixed');
                var e = document.getElementById('menu-toggler');
                if (e) {
                    ace.addClass(e, 'fixed')
                }
            }
            if (d !== false) {
                ace.settings.set('sidebar', 'fixed')
            }
        } else {
            ace.removeClass(f, 'sidebar-fixed');
            var e = document.getElementById('menu-toggler');
            if (e) {
                ace.removeClass(e, 'fixed')
            }
            if (d !== false) {
                ace.settings.unset('sidebar', 'fixed')
            }
        }
        document.getElementById('ace-settings-sidebar').checked = a;
        if (window.jQuery) {
            jQuery(document).trigger('settings.ace', [
                'sidebar_fixed',
                a
            ])
        }
    },
    breadcrumbs_fixed: function (a, d, c) {
        var b = document.getElementById('breadcrumbs');
        if (!b) {
            return false
        }
        a = a || false;
        if (a && c !== false && !ace.settings.is('sidebar', 'fixed')) {
            ace.settings.sidebar_fixed(true)
        }
        if (a) {
            if (!ace.hasClass(b, 'breadcrumbs-fixed')) {
                ace.addClass(b, 'breadcrumbs-fixed')
            }
            if (d !== false) {
                ace.settings.set('breadcrumbs', 'fixed')
            }
        } else {
            ace.removeClass(b, 'breadcrumbs-fixed');
            if (d !== false) {
                ace.settings.unset('breadcrumbs', 'fixed')
            }
        }
        document.getElementById('ace-settings-breadcrumbs').checked = a;
        if (window.jQuery) {
            jQuery(document).trigger('settings.ace', [
                'breadcrumbs_fixed',
                a
            ])
        }
    },
    main_container_fixed: function (a, d) {
        a = a || false;
        var c = document.getElementById('main-container');
        if (!c) {
            return false
        }
        var b = document.getElementById('navbar-container');
        if (a) {
            if (!ace.hasClass(c, 'container')) {
                ace.addClass(c, 'container')
            }
            if (!ace.hasClass(b, 'container')) {
                ace.addClass(b, 'container')
            }
            if (d !== false) {
                ace.settings.set('main-container', 'fixed')
            }
        } else {
            ace.removeClass(c, 'container');
            ace.removeClass(b, 'container');
            if (d !== false) {
                ace.settings.unset('main-container', 'fixed')
            }
        }
        document.getElementById('ace-settings-add-container').checked = a;
        if (navigator.userAgent.match(/webkit/i)) {
            var e = document.getElementById('sidebar');
            ace.toggleClass(e, 'menu-min');
            setTimeout(function () {
                ace.toggleClass(e, 'menu-min')
            }, 0)
        }
        if (window.jQuery) {
            jQuery(document).trigger('settings.ace', [
                'main_container_fixed',
                a
            ])
        }
    },
    sidebar_collapsed: function (a, e) {
        var f = document.getElementById('sidebar');
        if (!f) {
            return false
        }
        a = a || false;
        var g = ace.isHTTMlElement(this) ? this : f.querySelector('.sidebar-collapse');
        var d = g ? g.querySelector(ace.vars['.icon']) : null,
        c,
        b;
        if (d) {
            c = d.getAttribute('data-icon1');
            b = d.getAttribute('data-icon2')
        }
        if (a) {
            ace.addClass(f, 'menu-min');
            if (d) {
                ace.removeClass(d, c);
                ace.addClass(d, b)
            }
            if (e !== false) {
                ace.settings.set('sidebar', 'collapsed')
                $("#conten").css({ "margin-left": 43 })
            }
        } else {
            ace.removeClass(f, 'menu-min');
           
            if (d) {
                ace.removeClass(d, b);
                ace.addClass(d, c)
            }
            if (e !== false) {
                ace.settings.unset('sidebar', 'collapsed')
                $("#conten").css({ "margin-left": 190 })
            }
        }
        if (window.jQuery) {
            jQuery(document).trigger('settings.ace', [
                'sidebar_collapsed',
                a
            ])
        }
    }
};
ace.settings.check = function (c, e) {
    if (!ace.settings.exists(c, e)) {
        return
    }
    var a = ace.settings.is(c, e);
    var b = {
        'navbar-fixed': 'navbar-fixed-top',
        'sidebar-fixed': 'sidebar-fixed',
        'breadcrumbs-fixed': 'breadcrumbs-fixed',
        'sidebar-collapsed': 'menu-min',
        'main-container-fixed': 'container'
    };
    var d = document.getElementById(c);
    if (a != ace.hasClass(d, b[c + '-' + e])) {
        ace.settings[c.replace('-', '_') + '_' + e](a)
    }
};
ace.data_storage = function (e, c) {
    var b = 'ace.';
    var d = null;
    var a = 0;
    if ((e == 1 || e === c) && 'localStorage' in window && window.localStorage !== null) {
        d = ace.storage;
        a = 1
    } else {
        if (d == null && (e == 2 || e === c) && 'cookie' in document && document.cookie !== null) {
            d = ace.cookie;
            a = 2
        }
    }
    this.set = function (h, g, i, k) {
        if (!d) {
            return
        }
        if (i === k) {
            i = g;
            g = h;
            if (i == null) {
                d.remove(b + g)
            } else {
                if (a == 1) {
                    d.set(b + g, i)
                } else {
                    if (a == 2) {
                        d.set(b + g, i, ace.config.cookie_expiry)
                    }
                }
            }
        } else {
            if (a == 1) {
                if (i == null) {
                    d.remove(b + h + '.' + g)
                } else {
                    d.set(b + h + '.' + g, i)
                }
            } else {
                if (a == 2) {
                    var j = d.get(b + h);
                    var f = j ? JSON.parse(j) : {
                    };
                    if (i == null) {
                        delete f[g];
                        if (ace.sizeof(f) == 0) {
                            d.remove(b + h);
                            return
                        }
                    } else {
                        f[g] = i
                    }
                    d.set(b + h, JSON.stringify(f), ace.config.cookie_expiry)
                }
            }
        }
    };
    this.get = function (h, g, j) {
        if (!d) {
            return null
        }
        if (g === j) {
            g = h;
            return d.get(b + g)
        } else {
            if (a == 1) {
                return d.get(b + h + '.' + g)
            } else {
                if (a == 2) {
                    var i = d.get(b + h);
                    var f = i ? JSON.parse(i) : {
                    };
                    return g in f ? f[g] : null
                }
            }
        }
    };
    this.remove = function (g, f, h) {
        if (!d) {
            return
        }
        if (f === h) {
            f = g;
            this.set(f, null)
        } else {
            this.set(g, f, null)
        }
    }
};
ace.cookie = {
    get: function (c) {
        var d = document.cookie,
        g,
        f = c + '=',
        a;
        if (!d) {
            return
        }
        a = d.indexOf('; ' + f);
        if (a == -1) {
            a = d.indexOf(f);
            if (a != 0) {
                return null
            }
        } else {
            a += 2
        }
        g = d.indexOf(';', a);
        if (g == -1) {
            g = d.length
        }
        return decodeURIComponent(d.substring(a + f.length, g))
    },
    set: function (b, e, a, g, c, f) {
        var h = new Date();
        if (typeof (a) == 'object' && a.toGMTString) {
            a = a.toGMTString()
        } else {
            if (parseInt(a, 10)) {
                h.setTime(h.getTime() + (parseInt(a, 10) * 1000));
                a = h.toGMTString()
            } else {
                a = ''
            }
        }
        document.cookie = b + '=' + encodeURIComponent(e) + ((a) ? '; expires=' + a : '') + ((g) ? '; path=' + g : '') + ((c) ? '; domain=' + c : '') + ((f) ? '; secure' : '')
    },
    remove: function (a, b) {
        this.set(a, '', -1000, b)
    }
};
ace.storage = {
    get: function (a) {
        return window.localStorage.getItem(a)
    },
    set: function (a, b) {
        window.localStorage.setItem(a, b)
    },
    remove: function (a) {
        window.localStorage.removeItem(a)
    }
};
ace.sizeof = function (c) {
    var b = 0;
    for (var a in c) {
        if (c.hasOwnProperty(a)) {
            b++
        }
    }
    return b
};
ace.hasClass = function (b, a) {
    return (' ' + b.className + ' ').indexOf(' ' + a + ' ') > -1
};
ace.addClass = function (c, b) {
    if (!ace.hasClass(c, b)) {
        var a = c.className;
        c.className = a + (a.length ? ' ' : '') + b
    }
};
ace.removeClass = function (b, a) {
    ace.replaceClass(b, a)
};
ace.replaceClass = function (c, b, d) {
    var a = new RegExp(('(^|\\s)' + b + '(\\s|$)'), 'i');
    c.className = c.className.replace(a, function (e, g, f) {
        return d ? (g + d + f) : ' '
    }).replace(/^\s+|\s+$/g, '')
};
ace.toggleClass = function (b, a) {
    if (ace.hasClass(b, a)) {
        ace.removeClass(b, a)
    } else {
        ace.addClass(b, a)
    }
};
ace.isHTTMlElement = function (a) {
    return window.HTMLElement ? a instanceof HTMLElement : ('nodeType' in a ? a.nodeType == 1 : false)
};
ace.data = new ace.data_storage(ace.config.storage_method);
