/*
 * FilePondPluginFileValidateSize 2.0.0
 * Licensed under MIT, https://opensource.org/licenses/MIT
 * Please visit https://pqina.nl/filepond for details.
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : (global.FilePondPluginFileValidateSize = factory());
})(this, function() {
    'use strict';

    var plugin$1 = function(_ref) {
        var addFilter = _ref.addFilter,
            utils = _ref.utils;

        // get quick reference to Type utils
        var Type = utils.Type,
            replaceInString = utils.replaceInString,
            toNaturalFileSize = utils.toNaturalFileSize;

        // filtering if an item is allowed in hopper

        addFilter('ALLOW_HOPPER_ITEM', function(file, _ref2) {
            var query = _ref2.query;

            if (!query('GET_ALLOW_FILE_SIZE_VALIDATION')) {
                return true;
            }

            var sizeMax = query('GET_MAX_FILE_SIZE');
            if (sizeMax !== null && file.size > sizeMax) {
                return false;
            }
            return true;
        });

        // called for each file that is loaded
        // right before it is set to the item state
        // should return a promise
        addFilter('LOAD_FILE', function(file, _ref3) {
            var query = _ref3.query;
            return new Promise(function(resolve, reject) {
                // if not allowed, all fine, exit
                if (!query('GET_ALLOW_FILE_SIZE_VALIDATION')) {
                    resolve(file);
                    return;
                }

                // reject or resolve based on file size
                var sizeMax = query('GET_MAX_FILE_SIZE');
                if (sizeMax !== null && file.size > sizeMax) {
                    reject({
                        status: {
                            main: query('GET_LABEL_MAX_FILE_SIZE_EXCEEDED'),
                            sub: replaceInString(query('GET_LABEL_MAX_FILE_SIZE'), {
                                filesize: toNaturalFileSize(sizeMax)
                            })
                        }
                    });
                    return;
                }

                // returns the current option value
                var totalSizeMax = query('GET_MAX_TOTAL_FILE_SIZE');
                if (totalSizeMax !== null) {
                    // get the current total file size
                    var currentTotalSize = query('GET_ACTIVE_ITEMS').reduce(function(
                        total,
                        item
                        ) {
                            return total + item.fileSize;
                        },
                        0);

                    // get the size of the new file
                    if (currentTotalSize > totalSizeMax) {
                        reject({
                            status: {
                                main: query('GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED'),
                                sub: replaceInString(query('GET_LABEL_MAX_TOTAL_FILE_SIZE'), {
                                    filesize: toNaturalFileSize(totalSizeMax)
                                })
                            }
                        });
                        return;
                    }
                }

                // file is fine, let's pass it back
                resolve(file);
            });
        });

        return {
            options: {
                // Enable or disable file type validation
                allowFileSizeValidation: [true, Type.BOOLEAN],

                // Max individual file size in bytes
                maxFileSize: [null, Type.INT],

                // Max total file size in bytes
                maxTotalFileSize: [null, Type.INT],

                // error labels
                labelMaxFileSizeExceeded: ['File is too large', Type.STRING],
                labelMaxFileSize: ['Maximum file size is {filesize}', Type.STRING],
                labelMaxTotalFileSizeExceeded: [
                    'Maximum total size exceeded',
                    Type.STRING
                ],
                labelMaxTotalFileSize: [
                    'Maximum total file size is {filesize}',
                    Type.STRING
                ]
            }
        };
    };

    var isBrowser =
        typeof window !== 'undefined' && typeof window.document !== 'undefined';

    if (isBrowser && document) {
        document.dispatchEvent(
            new CustomEvent('FilePond:pluginloaded', { detail: plugin$1 })
        );
    }

    return plugin$1;
});

/*
 * FilePond 3.2.5
 * Licensed under MIT, https://opensource.org/licenses/MIT
 * Please visit https://pqina.nl/filepond for details.
 */

/* eslint-disable */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.FilePond = {})
}(this, function (n) {
    "use strict";
    var e, t, I = function (e, t) {
            for (var n in e) e.hasOwnProperty(n) && t(n, e[n])
        }, x = function (o) {
            var i = {};
            return I(o, function (e) {
                var t, n, r;
                t = i, "function" != typeof(r = o[n = e]) ? Object.defineProperty(t, n, Object.assign({}, r)) : t[n] = r
            }), i
        }, u = function (e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
            if (null === n) return e.getAttribute(t) || e.hasAttribute(t);
            e.setAttribute(t, n)
        }, h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, o = function (e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function (e, t) {
                var n = [], r = !0, o = !1, i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0) ;
                } catch (e) {
                    o = !0, i = e
                } finally {
                    try {
                        !r && s.return && s.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }, R = function (e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }, r = ["svg", "path"], i = function (e) {
            return r.includes(e)
        }, Y = function (e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            "object" === (void 0 === t ? "undefined" : h(t)) && (n = t, t = null);
            var r = i(e) ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);
            return t && (i(e) ? u(r, "class", t) : r.className = t), I(n, function (e, t) {
                u(r, e, t)
            }), r
        }, j = function (e, t, n, r) {
            var o = n[0] || e.left, i = n[1] || e.top, a = o + e.width, s = i + e.height * (r[1] || 1), u = {
                element: Object.assign({}, e),
                inner: {left: e.left, top: e.top, right: e.right, bottom: e.bottom},
                outer: {left: o, top: i, right: a, bottom: s}
            };
            return t.filter(function (e) {
                return !e.isRectIgnored()
            }).map(function (e) {
                return e.rect
            }).forEach(function (e) {
                l(u.inner, Object.assign({}, e.inner)), l(u.outer, Object.assign({}, e.outer))
            }), c(u.inner), u.outer.bottom += u.element.marginBottom, u.outer.right += u.element.marginRight, c(u.outer), u
        }, l = function (e, t) {
            t.top += e.top, t.right += e.left, t.bottom += e.top, t.left += e.left, t.bottom > e.bottom && (e.bottom = t.bottom), t.right > e.right && (e.right = t.right)
        }, c = function (e) {
            e.width = e.right - e.left, e.height = e.bottom - e.top
        }, O = function (e) {
            return "number" == typeof e
        }, E = function (e) {
            return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
        }, _ = {
            spring: function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.stiffness,
                    n = void 0 === t ? .5 : t, r = e.damping, o = void 0 === r ? .75 : r, i = e.mass,
                    a = void 0 === i ? 10 : i, s = null, u = null, l = 0, c = !1, f = x({
                        interpolate: function () {
                            if (!c) {
                                if (!O(s) || !O(u)) return c = !0, void(l = 0);
                                !function (e, t, n) {
                                    var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : .001;
                                    return Math.abs(e - t) < r && Math.abs(n) < r
                                }(u += l += -(u - s) * n / a, s, l *= o) ? f.onupdate(u) : (u = s, c = !(l = 0), f.onupdate(u), f.oncomplete(u))
                            }
                        }, target: {
                            set: function (e) {
                                if (O(e) && !O(u) && (u = e), null === s && (u = s = e), u === (s = e) || void 0 === s) return c = !0, l = 0, f.onupdate(u), void f.oncomplete(u);
                                c = !1
                            }, get: function () {
                                return s
                            }
                        }, resting: {
                            get: function () {
                                return c
                            }
                        }, onupdate: function (e) {
                        }, oncomplete: function (e) {
                        }
                    });
                return f
            }, tween: function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.duration,
                    n = void 0 === t ? 500 : t, r = e.easing, o = void 0 === r ? E : r, i = e.delay,
                    a = void 0 === i ? 0 : i, s = null, u = void 0, l = void 0, c = !0, f = !1, p = null, d = x({
                        interpolate: function (e) {
                            c || null === p || (null === s && (s = e), e - s < a || ((u = e - s - a) < n ? (l = u / n, d.onupdate((0 <= u ? o(f ? 1 - l : l) : 0) * p)) : (u = 1, l = f ? 0 : 1, d.onupdate(l * p), d.oncomplete(l * p), c = !0)))
                        }, target: {
                            get: function () {
                                return f ? 0 : p
                            }, set: function (e) {
                                if (null === p) return p = e, d.onupdate(e), void d.oncomplete(e);
                                e < p ? (p = 1, f = !0) : (f = !1, p = e), c = !1, s = null
                            }
                        }, resting: {
                            get: function () {
                                return c
                            }
                        }, onupdate: function (e) {
                        }, oncomplete: function (e) {
                        }
                    });
                return d
            }
        }, v = function (e, t, i) {
            var a = 3 < arguments.length && void 0 !== arguments[3] && arguments[3];
            (t = Array.isArray(t) ? t : [t]).forEach(function (o) {
                e.forEach(function (t) {
                    var e = t, n = function () {
                        return i[t]
                    }, r = function (e) {
                        return i[t] = e
                    };
                    "object" === (void 0 === t ? "undefined" : h(t)) && (e = t.key, n = t.getter || n, r = t.setter || r), o[e] && !a || (o[e] = {
                        get: n,
                        set: r
                    })
                })
            })
        }, m = function (e) {
            return null != e
        }, f = {
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
            translateY: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            originX: 0,
            originY: 0
        }, p = function (e, t) {
            if (Object.keys(e).length !== Object.keys(t).length) return !0;
            for (var n in t) if (t[n] !== e[n]) return !0;
            return !1
        }, d = function (e, t) {
            var n = t.opacity, r = t.perspective, o = t.translateX, i = t.translateY, a = t.scaleX, s = t.scaleY,
                u = t.rotateX, l = t.rotateY, c = t.rotateZ, f = t.originX, p = t.originY, d = t.width, E = t.height,
                _ = "", v = "";
            (m(f) || m(p)) && (v += "transform-origin: " + (f || 0) + "px " + (p || 0) + "px;"), m(r) && (_ += "perspective(" + r + "px) "), (m(o) || m(i)) && (_ += "translate3d(" + (o || 0) + "px, " + (i || 0) + "px, 0) "), (m(a) || m(s)) && (_ += "scale3d(" + (m(a) ? a : 1) + ", " + (m(s) ? s : 1) + ", 1) "), m(c) && (_ += "rotateZ(" + c + "rad) "), m(u) && (_ += "rotateX(" + u + "rad) "), m(l) && (_ += "rotateY(" + l + "rad) "), _.length && (v += "transform:" + _ + ";"), m(n) && (v += "opacity:" + n + ";", 0 === n && (v += "visibility:hidden;"), n < 1 && (v += "pointer-events:none;")), m(E) && (v += "height:" + E + "px;"), m(d) && (v += "width:" + d + "px;");
            var T = e.elementCurrentStyle || "";
            v.length === T.length && v === T || (e.setAttribute("style", v), e.elementCurrentStyle = v)
        }, X = {
            styles: function (e) {
                var t = e.mixinConfig, n = e.viewProps, r = e.viewInternalAPI, o = e.viewExternalAPI, i = e.view,
                    a = Object.assign({}, n), s = {};
                v(t, [r, o], n);
                var u = function () {
                    return i.rect ? j(i.rect, i.childViews, [n.translateX || 0, n.translateY || 0], [n.scaleX || 0, n.scaleY || 0]) : null
                };
                return r.rect = {get: u}, o.rect = {get: u}, t.forEach(function (e) {
                    n[e] = void 0 === a[e] ? f[e] : a[e]
                }), {
                    write: function () {
                        if (p(s, n)) return d(i.element, n), Object.assign(s, Object.assign({}, n)), !0
                    }, destroy: function () {
                    }
                }
            }, listeners: function (e) {
                e.mixinConfig, e.viewProps, e.viewInternalAPI;
                var n, r, t = e.viewExternalAPI, o = (e.viewState, e.view), i = [], a = (n = o.element, function (e, t) {
                    n.addEventListener(e, t)
                }), s = (r = o.element, function (e, t) {
                    r.removeEventListener(e, t)
                });
                return t.on = function (e, t) {
                    i.push({type: e, fn: t}), a(e, t)
                }, t.off = function (t, n) {
                    i.splice(i.findIndex(function (e) {
                        return e.type === t && e.fn === n
                    }), 1), s(t, n)
                }, {
                    write: function () {
                        return !0
                    }, destroy: function () {
                        i.forEach(function (e) {
                            s(e.type, e.fn)
                        })
                    }
                }
            }, animations: function (e) {
                var t = e.mixinConfig, l = e.viewProps, c = e.viewInternalAPI, f = e.viewExternalAPI,
                    p = Object.assign({}, l), d = [];
                return I(t, function (t, e) {
                    var n, r, o, i, a, s,
                        u = (i = (n = e)[r] && "object" === h(n[r][o]) ? n[r][o] : n[r] || n, a = "string" == typeof i ? i : i.type, s = "object" === (void 0 === i ? "undefined" : h(i)) ? Object.assign({}, i) : {}, _[a] ? _[a](s) : null);
                    u && (u.onupdate = function (e) {
                        l[t] = e
                    }, u.target = p[t], v([{
                        key: t, setter: function (e) {
                            u.target !== e && (u.target = e)
                        }, getter: function () {
                            return l[t]
                        }
                    }], [c, f], l, !0), d.push(u))
                }), {
                    write: function (t) {
                        var n = !0;
                        return d.forEach(function (e) {
                            e.resting || (n = !1), e.interpolate(t)
                        }), n
                    }, destroy: function () {
                    }
                }
            }, apis: function (e) {
                var t = e.mixinConfig, n = e.viewProps, r = e.viewExternalAPI;
                v(t, r, n)
            }
        }, H = function () {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            return t.layoutCalculated || (e.paddingTop = parseInt(n.paddingTop, 10) || 0, e.marginTop = parseInt(n.marginTop, 10) || 0, e.marginRight = parseInt(n.marginRight, 10) || 0, e.marginBottom = parseInt(n.marginBottom, 10) || 0, e.marginLeft = parseInt(n.marginLeft, 10) || 0, t.layoutCalculated = !0), e.left = t.offsetLeft || 0, e.top = t.offsetTop || 0, e.width = t.offsetWidth || 0, e.height = t.offsetHeight || 0, e.right = e.left + e.width, e.bottom = e.top + e.height, e.scrollTop = t.scrollTop, e.hidden = null === t.offsetParent, e
        }, a = function () {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.tag,
                A = void 0 === t ? "div" : t, n = e.name, P = void 0 === n ? null : n, r = e.attributes,
                L = void 0 === r ? {} : r, o = e.read, M = void 0 === o ? function () {
                } : o, i = e.write, w = void 0 === i ? function () {
                } : i, a = e.create, C = void 0 === a ? function () {
                } : a, s = e.destroy, N = void 0 === s ? function () {
                } : s, u = e.filterFrameActionsForChild, G = void 0 === u ? function (e, t) {
                    return t
                } : u, l = e.didCreateView, U = void 0 === l ? function () {
                } : l, c = e.didWriteView, B = void 0 === c ? function () {
                } : c, f = e.ignoreRect, F = void 0 !== f && f, p = e.ignoreRectUpdate, q = void 0 !== p && p, d = e.mixins,
                V = void 0 === d ? [] : d;
            return function (e) {
                var t, n, r, o, i, a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                    s = Y(A, "filepond--" + P, L), u = window.getComputedStyle(s, null), l = H(), c = null, f = !1, p = [],
                    d = [], E = {}, _ = {}, v = [w], T = [M], m = [N], g = function () {
                        return s
                    }, I = function () {
                        return [].concat(p)
                    }, h = function () {
                        return c || (c = j(l, p, [0, 0], [1, 1]))
                    }, R = {
                        element: {get: g}, style: {
                            get: function () {
                                return u
                            }
                        }, childViews: {get: I}
                    }, O = Object.assign({}, R, {
                        rect: {get: h}, ref: {
                            get: function () {
                                return E
                            }
                        }, is: function (e) {
                            return P === e
                        }, appendChild: (i = s, function (e, t) {
                            void 0 !== t && i.children[t] ? i.insertBefore(e, i.children[t]) : i.appendChild(e)
                        }), createChildView: (o = e, function (e, t) {
                            return e(o, t)
                        }), linkView: function (e) {
                            return p.push(e), e
                        }, unlinkView: function (e) {
                            p.splice(p.indexOf(e), 1)
                        }, appendChildView: (r = p, function (e, t) {
                            return void 0 !== t ? r.splice(t, 0, e) : r.push(e), e
                        }), removeChildView: (t = s, n = p, function (e) {
                            return n.splice(n.indexOf(e), 1), e.element.parentNode && t.removeChild(e.element), e
                        }), registerWriter: function (e) {
                            return v.push(e)
                        }, registerReader: function (e) {
                            return T.push(e)
                        }, registerDestroyer: function (e) {
                            return m.push(e)
                        }, invalidateLayout: function () {
                            return s.layoutCalculated = !1
                        }, dispatch: e.dispatch, query: e.query
                    }), y = {
                        element: {get: g}, childViews: {get: I}, rect: {get: h}, resting: {
                            get: function () {
                                return f
                            }
                        }, isRectIgnored: function () {
                            return F
                        }, _read: function () {
                            c = null, p.forEach(function (e) {
                                return e._read()
                            }), !(q && l.width && l.height) && H(l, s, u);
                            var t = {root: S, props: a, rect: l};
                            T.forEach(function (e) {
                                return e(t)
                            })
                        }, _write: function (n) {
                            var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [], o = 0 === r.length;
                            return v.forEach(function (e) {
                                !1 === e({props: a, root: S, actions: r, timestamp: n}) && (o = !1)
                            }), d.forEach(function (e) {
                                !1 === e.write(n) && (o = !1)
                            }), p.filter(function (e) {
                                return !!e.element.parentNode
                            }).forEach(function (e) {
                                e._write(n, G(e, r)) || (o = !1)
                            }), p.forEach(function (e, t) {
                                e.element.parentNode || (S.appendChild(e.element, t), e._read(), e._write(n, G(e, r)), o = !1)
                            }), f = o, B({props: a, root: S, actions: r, timestamp: n}), o
                        }, _destroy: function () {
                            d.forEach(function (e) {
                                return e.destroy()
                            }), m.forEach(function (e) {
                                e({root: S, props: a})
                            }), p.forEach(function (e) {
                                return e._destroy()
                            })
                        }
                    }, D = Object.assign({}, R, {
                        rect: {
                            get: function () {
                                return l
                            }
                        }
                    });
                Object.keys(V).sort(function (e, t) {
                    return "styles" === e ? 1 : "styles" === t ? -1 : 0
                }).forEach(function (e) {
                    var t = X[e]({
                        mixinConfig: V[e],
                        viewProps: a,
                        viewState: _,
                        viewInternalAPI: O,
                        viewExternalAPI: y,
                        view: x(D)
                    });
                    t && d.push(t)
                });
                var S = x(O);
                C({root: S, props: a});
                var b = s.children.length;
                return p.forEach(function (e, t) {
                    S.appendChild(e.element, b + t)
                }), U(S), x(y)
            }
        }, s = function (i, a) {
            return function (e) {
                var t = e.root, n = e.props, r = e.actions, o = void 0 === r ? [] : r;
                o.filter(function (e) {
                    return i[e.type]
                }).forEach(function (e) {
                    return i[e.type]({root: t, props: n, action: e.data})
                }), a && a({root: t, props: n, actions: o})
            }
        }, y = function (e, t) {
            return t.parentNode.insertBefore(e, t)
        }, D = function (e, t) {
            return t.parentNode.insertBefore(e, t.nextSibling)
        }, S = function (e) {
            return Array.isArray(e)
        }, w = function (e) {
            return null == e
        }, T = function (e) {
            return e.trim()
        }, g = function (e) {
            return "" + e
        }, b = function (e) {
            return "boolean" == typeof e
        }, A = function (e) {
            return b(e) ? e : "true" === e
        }, P = function (e) {
            return "string" == typeof e
        }, L = function (e) {
            return O(e) ? e : P(e) ? g(e).replace(/[a-z]+/gi, "") : 0
        }, M = function (e) {
            return parseInt(L(e), 10)
        }, C = function (e) {
            return O(e) && isFinite(e) && Math.floor(e) === e
        }, N = function (e) {
            if (C(e)) return e;
            var t = g(e).trim();
            return /MB$/i.test(t) ? (t = t.replace(/MB$i/, "").trim(), 1e3 * M(t) * 1e3) : /KB/i.test(t) ? (t = t.replace(/KB$i/, "").trim(), 1e3 * M(t)) : M(t)
        }, G = function (e) {
            return "function" == typeof e
        }, U = {process: "POST", revert: "DELETE", fetch: "GET", restore: "GET", load: "GET"}, B = function (e, t, n, r) {
            if (null === t) return null;
            if ("function" == typeof t) return t;
            var o = {
                url: "GET" === n ? "?" + e + "=" : "",
                method: n,
                headers: {},
                withCredentials: !1,
                timeout: r,
                onload: null,
                onerror: null
            };
            if (P(t)) return o.url = t, o;
            if (Object.assign(o, t), P(o.headers)) {
                var i = o.headers.split(/:(.+)/);
                o.headers = {header: i[0], value: i[1]}
            }
            return o.withCredentials = A(o.withCredentials), o
        }, F = function (e) {
            return "object" === (void 0 === e ? "undefined" : h(e)) && null !== e
        }, q = function (e) {
            return S(e) ? "array" : null === e ? "null" : C(e) ? "int" : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e) ? "bytes" : F(t = e) && P(t.url) && F(t.process) && F(t.revert) && F(t.restore) && F(t.fetch) ? "api" : void 0 === e ? "undefined" : h(e);
            var t
        }, V = {
            array: function (e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : ",";
                return w(e) ? [] : S(e) ? e : g(e).split(t).map(T).filter(function (e) {
                    return e.length
                })
            }, boolean: A, int: function (e) {
                return "bytes" === q(e) ? N(e) : M(e)
            }, float: function (e) {
                return parseFloat(L(e))
            }, bytes: N, string: function (e) {
                return G(e) ? e : g(e)
            }, serverapi: function (e) {
                return (n = {}).url = P(t = e) ? t : t.url || "", n.timeout = t.timeout ? parseInt(t.timeout, 10) : 0, I(U, function (e) {
                    n[e] = B(e, t[e], U[e], n.timeout)
                }), n;
                var t, n
            }, object: function (e) {
                try {
                    return JSON.parse(e.replace(/{\s*'/g, '{"').replace(/'\s*}/g, '"}').replace(/'\s*:/g, '":').replace(/:\s*'/g, ':"').replace(/,\s*'/g, ',"').replace(/'\s*,/g, '",'))
                } catch (e) {
                    return null
                }
            }, function: function (e) {
                return function (e) {
                    for (var t = self, n = e.split("."), r = null; r = n.shift();) if (!(t = t[r])) return null;
                    return t
                }(e)
            }
        }, W = function (e, t, n) {
            if (e === t) return e;
            var r, o = q(e);
            if (o !== n) {
                var i = (r = e, V[n](r));
                if (o = q(i), null === i) throw'Trying to assign value with incorrect type to "' + option + '", allowed type: "' + n + '"';
                e = i
            }
            return e
        }, z = function (i) {
            var a = {};
            return I(i, function (e) {
                var t, n, r, o = i[e];
                a[e] = (t = o[0], n = o[1], r = t, {
                    enumerable: !0, get: function () {
                        return r
                    }, set: function (e) {
                        r = W(e, t, n)
                    }
                })
            }), x(a)
        }, k = function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "-";
            return e.split(/(?=[A-Z])/).map(function (e) {
                return e.toLowerCase()
            }).join(t)
        }, Q = 1, $ = 2, Z = 3, J = 4, K = 5, ee = function () {
            return Math.random().toString(36).substr(2, 9)
        }, te = function (e, o) {
            var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 75;
            return e.map(function (n, r) {
                return new Promise(function (e, t) {
                    setTimeout(function () {
                        o(n), e()
                    }, i * r)
                })
            })
        }, ne = function (e, t) {
            return e.splice(t, 1)
        }, re = function () {
            var o = [], n = function (t, n) {
                ne(o, o.findIndex(function (e) {
                    return e.event === t && (e.cb === n || !n)
                }))
            };
            return {
                fire: function (t) {
                    for (var e = arguments.length, n = Array(1 < e ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    o.filter(function (e) {
                        return e.event === t
                    }).map(function (e) {
                        return e.cb
                    }).forEach(function (e) {
                        setTimeout(function () {
                            e.apply(void 0, n)
                        }, 0)
                    })
                }, on: function (e, t) {
                    o.push({event: e, cb: t})
                }, onOnce: function (e, t) {
                    o.push({
                        event: e, cb: function () {
                            n(e, t), t.apply(void 0, arguments)
                        }
                    })
                }, off: n
            }
        }, oe = function (t, n, r) {
            Object.getOwnPropertyNames(t).filter(function (e) {
                return !r.includes(e)
            }).forEach(function (e) {
                return Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(t, e))
            })
        },
        ie = ["fire", "process", "revert", "load", "on", "off", "onOnce", "retryLoad", "extend", "archive", "release", "released", "requestProcessing"],
        ae = function (e) {
            var t = {};
            return oe(e, t, ie), t
        }, se = function (e) {
            return /[^0-9]+/.exec(e)
        }, ue = function () {
            return se(1.1.toLocaleString())[0]
        }, le = {
            BOOLEAN: "boolean",
            INT: "int",
            STRING: "string",
            ARRAY: "array",
            OBJECT: "object",
            FUNCTION: "function",
            ACTION: "action",
            SERVER_API: "serverapi",
            REGEX: "regex"
        }, ce = [], fe = function (o, i, a) {
            return new Promise(function (t, n) {
                var e = ce.filter(function (e) {
                    return e.key === o
                }).map(function (e) {
                    return e.cb
                });
                if (0 !== e.length) {
                    var r = e.shift();
                    e.reduce(function (e, t) {
                        return e.then(function (e) {
                            return t(e, a)
                        })
                    }, r(i, a)).then(function (e) {
                        return t(e)
                    }).catch(function (e) {
                        return n(e)
                    })
                } else t(i)
            })
        }, pe = function (t, n, r) {
            return ce.filter(function (e) {
                return e.key === t
            }).map(function (e) {
                return e.cb(n, r)
            })
        }, de = function (e, t) {
            return ce.push({key: e, cb: t})
        }, Ee = function () {
            return Object.assign({}, _e)
        }, _e = {
            id: [null, le.STRING],
            name: ["filepond", le.STRING],
            className: [null, le.STRING],
            required: [!1, le.BOOLEAN],
            captureMethod: [null, le.STRING],
            allowDrop: [!0, le.BOOLEAN],
            allowBrowse: [!0, le.BOOLEAN],
            allowPaste: [!0, le.BOOLEAN],
            allowMultiple: [!1, le.BOOLEAN],
            allowReplace: [!0, le.BOOLEAN],
            allowRevert: [!0, le.BOOLEAN],
            maxFiles: [null, le.INT],
            dropOnPage: [!1, le.BOOLEAN],
            dropOnElement: [!0, le.BOOLEAN],
            dropValidation: [!1, le.BOOLEAN],
            ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], le.ARRAY],
            instantUpload: [!0, le.BOOLEAN],
            server: [null, le.SERVER_API],
            labelDecimalSeparator: [ue(), le.STRING],
            labelThousandsSeparator: [(e = ue(), t = 1e3.toLocaleString(), t !== 1e3.toString() ? se(t)[0] : "." === e ? "," : "."), le.STRING],
            labelIdle: ['Drag & Drop your files or <span class="filepond--label-action">Browse</span>', le.STRING],
            labelFileWaitingForSize: ["در انتظار محاسبه ی سایز", le.STRING],
            labelFileSizeNotAvailable: ["سایز پیدا نشد", le.STRING],
            labelFileCountSingular: ["فایل در لیست", le.STRING],
            labelFileCountPlural: ["فایل های در لیست", le.STRING],
            labelFileLoading: ["در حال پردازش", le.STRING],
            labelFileAdded: ["اضافه شده", le.STRING],
            labelFileRemoved: ["حذف شده", le.STRING],
            labelFileLoadError: ["اروری پیش آمده است", le.STRING],
            labelFileProcessing: ["در حال بارگزاری", le.STRING],
            labelFileProcessingComplete: ["بارگزاری به پایان رسید", le.STRING],
            labelFileProcessingAborted: ["بارگزاری متوقث شد", le.STRING],
            labelFileProcessingError: ["خظا در هنگام بارگزاری", le.STRING],
            labelTapToCancel: ["برای لغو کردن کلید کنید", le.STRING],
            labelTapToRetry: ["برای تلاش دوباره کلیک کنید", le.STRING],
            labelTapToUndo: ["برای بازگشت کلیک کنید", le.STRING],
            labelButtonRemoveItem: ["حذف", le.STRING],
            labelButtonAbortItemLoad: ["لغو", le.STRING],
            labelButtonRetryItemLoad: ["تلاش دوباره", le.STRING],
            labelButtonAbortItemProcessing: ["لغو", le.STRING],
            labelButtonUndoItemProcessing: ["بازگشت", le.STRING],
            labelButtonRetryItemProcessing: ["تلاش دوباره", le.STRING],
            labelButtonProcessItem: ["بارگزاری کردم", le.STRING],
            iconRemove: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>', le.STRING],
            iconProcess: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>', le.STRING],
            iconRetry: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>', le.STRING],
            iconUndo: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>', le.STRING],
            iconDone: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>', le.STRING],
            oninit: [null, le.FUNCTION],
            onwarning: [null, le.FUNCTION],
            onerror: [null, le.FUNCTION],
            onaddfilestart: [null, le.FUNCTION],
            onaddfileprogress: [null, le.FUNCTION],
            onaddfile: [null, le.FUNCTION],
            onprocessfilestart: [null, le.FUNCTION],
            onprocessfileprogress: [null, le.FUNCTION],
            onprocessfileabort: [null, le.FUNCTION],
            onprocessfilerevert: [null, le.FUNCTION],
            onprocessfile: [null, le.FUNCTION],
            onremovefile: [null, le.FUNCTION],
            onpreparefile: [null, le.FUNCTION],
            onupdatefiles: [null, le.FUNCTION],
            beforeRemoveFile: [null, le.FUNCTION],
            stylePanelLayout: [null, le.STRING],
            stylePanelAspectRatio: [null, le.STRING],
            styleButtonRemoveItemPosition: ["left", le.STRING],
            styleButtonProcessItemPosition: ["right", le.STRING],
            styleLoadIndicatorPosition: ["right", le.STRING],
            styleProgressIndicatorPosition: ["right", le.STRING],
            files: [[], le.ARRAY]
        }, ve = function (e, t) {
            return w(t) ? e[0] || null : C(t) ? e[t] || null : ("object" === (void 0 === t ? "undefined" : h(t)) && (t = t.id), e.find(function (e) {
                return e.id === t
            }) || null)
        }, Te = function (e) {
            if (w(e)) return e;
            if (/:/.test(e)) {
                var t = e.split(":"), n = o(t, 2), r = n[0];
                return n[1] / r
            }
            return parseFloat(e)
        }, me = function (e) {
            return e.filter(function (e) {
                return !e.archived
            })
        }, ge = function (n) {
            return {
                GET_ITEM: function (e) {
                    return ve(n.items, e)
                }, GET_ACTIVE_ITEM: function (e) {
                    return ve(me(n.items), e)
                }, GET_ACTIVE_ITEMS: function (e) {
                    return me(n.items)
                }, GET_ITEMS: function (e) {
                    return n.items
                }, GET_ITEM_NAME: function (e) {
                    var t = ve(n.items, e);
                    return t ? t.filename : null
                }, GET_ITEM_SIZE: function (e) {
                    var t = ve(n.items, e);
                    return t ? t.fileSize : null
                }, GET_STYLES: function () {
                    return Object.keys(n.options).filter(function (e) {
                        return /^style/.test(e)
                    }).map(function (e) {
                        return {name: e, value: n.options[e]}
                    })
                }, GET_PANEL_ASPECT_RATIO: function () {
                    return /circle/.test(n.options.stylePanelLayout) ? 1 : Te(n.options.stylePanelAspectRatio)
                }, GET_TOTAL_ITEMS: function () {
                    return me(n.items).length
                }, IS_ASYNC: function () {
                    return F(n.options.server) && (F(n.options.server.process) || G(n.options.server.process))
                }
            }
        }, Ie = function (e, t, n) {
            return w(t) ? null : (void 0 === n ? e.push(t) : (r = n, o = 0, i = e.length, n = Math.max(Math.min(i, r), o), a = n, s = t, e.splice(a, 0, s)), t);
            var r, o, i, a, s
        }, he = function (e) {
            return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(e)
        }, Re = function (e) {
            return e.split("/").pop().split("?").shift()
        }, Oe = function (e) {
            return e.split(".").pop()
        }, ye = function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
            return (t + e).slice(-t.length)
        }, De = function () {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : new Date;
            return e.getFullYear() + "-" + ye(e.getMonth() + 1, "00") + "-" + ye(e.getDate(), "00") + "_" + ye(e.getHours(), "00") + "-" + ye(e.getMinutes(), "00") + "-" + ye(e.getSeconds(), "00")
        }, Se = function (e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
                r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
                o = "string" == typeof n ? e.slice(0, e.size, n) : e.slice(0, e.size, e.type);
            return o.lastModifiedDate = new Date, P(t) || (t = De()), t && null === r && Oe(t) ? o.name = t : (r = r || function (e) {
                if ("string" != typeof e) return "";
                var t = e.split("/").pop();
                return /svg/.test(t) ? "svg" : /zip|compressed/.test(t) ? "zip" : /plain/.test(t) ? "txt" : /msword/.test(t) ? "doc" : /[a-z]+/.test(t) ? "jpeg" === t ? "jpg" : t : ""
            }(o.type), o.name = t + (r ? "." + r : "")), o
        }, be = function (e, t) {
            var n = window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            if (n) {
                var r = new n;
                return r.append(e), r.getBlob(t)
            }
            return new Blob([e], {type: t})
        }, Ae = function (e) {
            return (/^data:(.+);/.exec(e) || [])[1] || null
        }, Pe = function (e) {
            var t = Ae(e);
            return function (e, t) {
                for (var n = new ArrayBuffer(e.length), r = new Uint8Array(n), o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
                return be(n, t)
            }(atob(e.split(",")[1].replace(/\s/g, "")), t)
        }, Le = function (e) {
            var t = e.split("\n"), n = !0, r = !1, o = void 0;
            try {
                for (var i, a = t[Symbol.iterator](); !(n = (i = a.next()).done); n = !0) {
                    var s = i.value.match(/filename="(.+)"/);
                    if (s && s[1]) return s[1]
                }
            } catch (e) {
                r = !0, o = e
            } finally {
                try {
                    !n && a.return && a.return()
                } finally {
                    if (r) throw o
                }
            }
            return null
        }, Me = function (e) {
            var r = {source: null, complete: !1, progress: 0, size: null, timestamp: null, duration: 0, request: null},
                o = function (t) {
                    e ? (r.timestamp = Date.now(), r.request = e(t, function (e) {
                        r.duration = Date.now() - r.timestamp, r.complete = !0, e instanceof Blob && (e = Se(e, Re(t))), i.fire("load", e instanceof Blob ? e : e.body)
                    }, function (e) {
                        i.fire("error", "string" == typeof e ? {type: "error", code: 0, body: e} : e)
                    }, function (e, t, n) {
                        n && (r.size = n), r.duration = Date.now() - r.timestamp, e ? (r.progress = t / n, i.fire("progress", r.progress)) : r.progress = null
                    }, function () {
                        i.fire("abort")
                    }, function (e) {
                        i.fire("meta", {size: r.size, filename: Le("string" == typeof e ? e : e.headers)})
                    })) : i.fire("error", {type: "error", body: "Can't load URL", code: 400})
                }, i = Object.assign({}, re(), {
                    setSource: function (e) {
                        return r.source = e
                    }, getProgress: function () {
                        return r.progress
                    }, abort: function () {
                        r.request && r.request.abort()
                    }, load: function () {
                        var e, t, n = r.source;
                        i.fire("init", n), n instanceof File ? i.fire("load", n) : n instanceof Blob ? i.fire("load", Se(n, n.name)) : he(n) ? i.fire("load", Se(Pe(n), e, null, t)) : o(n)
                    }
                });
            return i
        }, we = function (e, t, n) {
            var r = {
                onheaders: function () {
                }, onprogress: function () {
                }, onload: function () {
                }, ontimeout: function () {
                }, onerror: function () {
                }, onabort: function () {
                }, abort: function () {
                    o = !0, a.abort()
                }
            }, o = !1, i = !1;
            n = Object.assign({
                method: "POST",
                headers: {},
                withCredentials: !1
            }, n), /GET/i.test(n.method) && e && (t = "" + t + encodeURIComponent("string" == typeof e ? e : JSON.stringify(e)));
            var a = new XMLHttpRequest;
            return (/GET/i.test(n.method) ? a : a.upload).onprogress = function (e) {
                o || r.onprogress(e.lengthComputable, e.loaded, e.total)
            }, a.onreadystatechange = function () {
                a.readyState < 2 || 4 === a.readyState && 0 === a.status || i || (i = !0, r.onheaders(a))
            }, a.onload = function () {
                200 <= a.status && a.status < 300 ? r.onload(a) : r.onerror(a)
            }, a.onerror = function () {
                return r.onerror(a)
            }, a.onabort = function () {
                o = !0, r.onabort()
            }, a.ontimeout = function () {
                return r.ontimeout(a)
            }, a.open(n.method, t, !0), C(n.timeout) && (a.timeout = n.timeout), Object.keys(n.headers).forEach(function (e) {
                a.setRequestHeader(e, n.headers[e])
            }), n.responseType && (a.responseType = n.responseType), n.withCredentials && (a.withCredentials = !0), a.send(e), r
        }, Ce = function (e, t, n, r) {
            return {type: e, code: t, body: n, headers: r}
        }, Ne = function (t) {
            return function (e) {
                t(Ce("error", 0, "Timeout", e.getAllResponseHeaders()))
            }
        }, Ge = function () {
            var s = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", u = arguments[1];
            if ("function" == typeof u) return u;
            if (!u || !P(u.url)) return null;
            var l = u.onload || function (e) {
                return e
            }, c = u.onerror || function (e) {
                return null
            };
            return function (r, o, t, e, n, i) {
                var a = we(r, s + u.url, Object.assign({}, u, {responseType: "blob"}));
                return a.onload = function (e) {
                    var t = e.getAllResponseHeaders(), n = Le(t) || Re(r);
                    o(Ce("load", e.status, Se(l(e.response), n), t))
                }, a.onerror = function (e) {
                    t(Ce("error", e.status, c(e.response) || e.statusText, e.getAllResponseHeaders()))
                }, a.onheaders = function (e) {
                    i(Ce("headers", e.status, null, e.getAllResponseHeaders()))
                }, a.ontimeout = Ne(t), a.onprogress = e, a.onabort = n, a
            }
        }, Ue = function () {
            var o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", i = arguments[1];
            if ("function" == typeof i) return i;
            if (!i || !P(i.url)) return function (e, t) {
                return t()
            };
            var a = i.onload || function (e) {
                return e
            }, s = i.onerror || function (e) {
                return null
            };
            return function (e, t, n) {
                var r = we(e, o + i.url, i);
                return r.onload = function (e) {
                    t(Ce("load", e.status, a(e.response), e.getAllResponseHeaders()))
                }, r.onerror = function (e) {
                    n(Ce("error", e.status, s(e.response) || e.statusText, e.getAllResponseHeaders()))
                }, r.ontimeout = Ne(n), r
            }
        }, Be = function () {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
            return e + Math.random() * (t - e)
        }, Fe = function (o) {
            var i = {
                complete: !1,
                perceivedProgress: 0,
                perceivedPerformanceUpdater: null,
                progress: null,
                timestamp: null,
                perceivedDuration: 0,
                duration: 0,
                request: null,
                response: null
            }, e = function () {
                i.request && (i.perceivedPerformanceUpdater.clear(), i.request.abort(), i.complete = !0)
            }, a = Object.assign({}, re(), {
                process: function (e, t) {
                    var r = function () {
                        0 !== i.duration && null !== i.progress && a.fire("progress", a.getProgress())
                    }, n = function () {
                        i.complete = !0, a.fire("load-perceived", i.response.body)
                    };
                    a.fire("start"), i.timestamp = Date.now(), i.perceivedPerformanceUpdater = function (o) {
                        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1e3,
                            a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 25,
                            s = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 250, u = null,
                            l = Date.now();
                        return function e() {
                            var t = Date.now() - l, n = Be(a, s);
                            i < t + n && (n = t + n - i);
                            var r = t / i;
                            1 <= r ? o(1) : (o(r), u = setTimeout(e, n))
                        }(), {
                            clear: function () {
                                clearTimeout(u)
                            }
                        }
                    }(function (e) {
                        i.perceivedProgress = e, i.perceivedDuration = Date.now() - i.timestamp, r(), i.response && 1 === i.perceivedProgress && !i.complete && n()
                    }, Be(750, 1500)), i.request = o(e, t, function (e) {
                        i.response = F(e) ? e : {
                            type: "load",
                            code: 200,
                            body: "" + e,
                            headers: {}
                        }, i.duration = Date.now() - i.timestamp, i.progress = 1, a.fire("load", i.response.body), 1 === i.perceivedProgress && n()
                    }, function (e) {
                        i.perceivedPerformanceUpdater.clear(), a.fire("error", F(e) ? e : {
                            type: "error",
                            code: 0,
                            body: "" + e
                        })
                    }, function (e, t, n) {
                        i.duration = Date.now() - i.timestamp, i.progress = e ? t / n : null, r()
                    }, function () {
                        i.perceivedPerformanceUpdater.clear(), a.fire("abort", i.response ? i.response.body : null)
                    })
                }, abort: e, getProgress: function () {
                    return i.progress ? Math.min(i.progress, i.perceivedProgress) : null
                }, getDuration: function () {
                    return Math.min(i.duration, i.perceivedDuration)
                }, reset: function () {
                    e(), i.complete = !1, i.perceivedProgress = 0, i.progress = 0, i.timestamp = null, i.perceivedDuration = 0, i.duration = 0, i.request = null, i.response = null
                }
            });
            return a
        }, qe = function (e) {
            return e.substr(0, e.lastIndexOf(".")) || e
        }, Ve = {
            INIT: 1,
            IDLE: 2,
            PROCESSING_QUEUED: 9,
            PROCESSING: 3,
            PROCESSING_PAUSED: 4,
            PROCESSING_COMPLETE: 5,
            PROCESSING_ERROR: 6,
            LOADING: 7,
            LOAD_ERROR: 8
        }, xe = {INPUT: 1, LIMBO: 2, LOCAL: 3}, Ye = function () {
            var i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
                e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
                t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, n = ee(), a = {
                    archived: !1,
                    released: !1,
                    source: null,
                    file: t,
                    serverFileReference: e,
                    status: e ? Ve.PROCESSING_COMPLETE : Ve.INIT,
                    activeLoader: null,
                    activeProcessor: null
                }, r = null, s = {}, u = function (e) {
                    return a.status = e
                }, l = function (e) {
                    for (var t = arguments.length, n = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    a.released || c.fire.apply(c, [e].concat(n))
                }, o = function (e, t) {
                    var n = e.split("."), r = n[0], o = n.pop(), i = s;
                    n.forEach(function (e) {
                        return i = i[e]
                    }), JSON.stringify(i[o]) !== JSON.stringify(t) && (i[o] = t, l("metadata-update", {key: r, value: s[r]}))
                }, c = Object.assign({
                    id: {
                        get: function () {
                            return n
                        }
                    }, origin: {
                        get: function () {
                            return i
                        }
                    }, serverId: {
                        get: function () {
                            return a.serverFileReference
                        }
                    }, status: {
                        get: function () {
                            return a.status
                        }
                    }, filename: {
                        get: function () {
                            return a.file.name
                        }
                    }, filenameWithoutExtension: {
                        get: function () {
                            return qe(a.file.name)
                        }
                    }, fileExtension: {
                        get: function () {
                            return Oe(a.file.name)
                        }
                    }, fileType: {
                        get: function () {
                            return a.file.type
                        }
                    }, fileSize: {
                        get: function () {
                            return a.file.size
                        }
                    }, file: {
                        get: function () {
                            return a.file
                        }
                    }, source: {
                        get: function () {
                            return a.source
                        }
                    }, getMetadata: function (e) {
                        return e ? s[e] : Object.assign({}, s)
                    }, setMetadata: function (e, t) {
                        if (!F(e) || t) return o(e, t), t;
                        var n = e;
                        return Object.keys(n).forEach(function (e) {
                            o(e, n[e])
                        }), e
                    }, extend: function (e, t) {
                        return f[e] = t
                    }, abortLoad: function () {
                        a.activeLoader && a.activeLoader.abort()
                    }, retryLoad: function () {
                        a.activeLoader && a.activeLoader.load()
                    }, requestProcessing: function () {
                        u(Ve.PROCESSING_QUEUED)
                    }, abortProcessing: function () {
                        return new Promise(function (e) {
                            if (!a.activeProcessor) return u(Ve.IDLE), l("process-abort"), void e();
                            r = function () {
                                e()
                            }, a.activeProcessor.abort()
                        })
                    }, load: function (e, t, n) {
                        var r, o;
                        a.source = e, a.file ? l("load-skip") : (a.file = (o = [(r = e).name, r.size, r.type], r instanceof Blob || he(r) ? o[0] = r.name || De() : he(r) ? (o[1] = r.length, o[2] = Ae(r)) : P(r) && (o[0] = Re(r), o[1] = 0, o[2] = "application/octet-stream"), {
                            name: o[0],
                            size: o[1],
                            type: o[2]
                        }), t.on("init", function () {
                            l("load-init")
                        }), t.on("meta", function (e) {
                            a.file.size = e.size, a.file.filename = e.filename, l("load-meta")
                        }), t.on("progress", function (e) {
                            u(Ve.LOADING), l("load-progress", e)
                        }), t.on("error", function (e) {
                            u(Ve.LOAD_ERROR), l("load-request-error", e)
                        }), t.on("abort", function () {
                            u(Ve.INIT), l("load-abort")
                        }), t.on("load", function (t) {
                            a.activeLoader = null;
                            var e = function (e) {
                                a.file = e, i === xe.LIMBO && a.serverFileReference ? u(Ve.PROCESSING_COMPLETE) : u(Ve.IDLE), l("load")
                            };
                            a.serverFileReference ? e(t) : n(t, e, function (e) {
                                a.file = t, l("load-meta"), u(Ve.LOAD_ERROR), l("load-file-error", e)
                            })
                        }), t.setSource(e), (a.activeLoader = t).load())
                    }, process: function e(t, n) {
                        u(Ve.PROCESSING), r = null, a.file instanceof Blob ? (t.on("load", function (e) {
                            a.serverFileReference = e
                        }), t.on("load-perceived", function (e) {
                            a.activeProcessor = null, a.serverFileReference = e, u(Ve.PROCESSING_COMPLETE), l("process-complete", e)
                        }), t.on("start", function () {
                            l("process-start")
                        }), t.on("error", function (e) {
                            a.activeProcessor = null, u(Ve.PROCESSING_ERROR), l("process-error", e)
                        }), t.on("abort", function (e) {
                            a.activeProcessor = null, a.serverFileReference = e, u(Ve.IDLE), l("process-abort"), r && r()
                        }), t.on("progress", function (e) {
                            l("process-progress", e)
                        }), n(a.file, function (e) {
                            a.archived || t.process(e, Object.assign({}, s))
                        }, function (e) {
                        }), a.activeProcessor = t) : c.on("load", function () {
                            e(t, n)
                        })
                    }, revert: function (e) {
                        return new Promise(function (t) {
                            null !== a.serverFileReference ? (e(a.serverFileReference, function () {
                                a.serverFileReference = null, t()
                            }, function (e) {
                                t()
                            }), u(Ve.IDLE), l("process-revert")) : t()
                        })
                    }
                }, re(), {
                    release: function () {
                        return a.released = !0
                    }, released: {
                        get: function () {
                            return a.released
                        }
                    }, archive: function () {
                        return a.archived = !0
                    }, archived: {
                        get: function () {
                            return a.archived
                        }
                    }
                }), f = x(c);
            return f
        }, je = function (e, t) {
            var n, r, o = (n = e, w(r = t) ? 0 : P(r) ? n.findIndex(function (e) {
                return e.id === r
            }) : -1);
            if (!(o < 0)) return e[o] || null
        }, Xe = function (r, o, t, e, n, i) {
            var a = we(null, r, {method: "GET", responseType: "blob"});
            return a.onload = function (e) {
                var t = e.getAllResponseHeaders(), n = Le(t) || Re(r);
                o(Ce("load", e.status, Se(e.response, n), t))
            }, a.onerror = function (e) {
                t(Ce("error", e.status, e.statusText, e.getAllResponseHeaders()))
            }, a.onheaders = function (e) {
                i(Ce("headers", e.status, null, e.getAllResponseHeaders()))
            }, a.ontimeout = Ne(t), a.onprogress = e, a.onabort = n, a
        }, He = function (e) {
            return 0 === e.indexOf("//") && (e = location.protocol + e), e.toLowerCase().replace("blob:", "").replace(/([a-z])?:\/\//, "$1").split("/")[0]
        }, We = function (e) {
            return e instanceof File || e instanceof Blob && e.name
        }, ze = function (e) {
            return function () {
                return G(e) ? e.apply(void 0, arguments) : e
            }
        }, ke = null, Qe = function (s, u) {
            return function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.query, n = e.success,
                    r = void 0 === n ? function () {
                    } : n, o = e.failure, i = void 0 === o ? function () {
                    } : o, a = ve(s.items, t);
                a ? u(a, r, i) : i({error: Ce("error", 0, "Item not found"), file: null})
            }
        }, $e = function (h, R, O) {
            return {
                ABORT_ALL: function () {
                    me(O.items).forEach(function (e) {
                        e.abortLoad(), e.abortProcessing()
                    })
                }, DID_SET_FILES: function (e) {
                    var t = e.value, n = (void 0 === t ? [] : t).map(function (e) {
                        return {source: e.source ? e.source : e, options: e.options}
                    }), r = me(O.items);
                    r.forEach(function (t) {
                        n.find(function (e) {
                            return e.source === t.source || e.source === t.file
                        }) || h("REMOVE_ITEM", {query: t})
                    }), r = me(O.items), n.forEach(function (t, e) {
                        r.find(function (e) {
                            return e.source === t.source || e.file === t.source
                        }) || h("ADD_ITEM", Object.assign({}, t, {interactionMethod: K, index: e}))
                    })
                }, DID_UPDATE_ITEM_METADATA: function (e) {
                    var t = e.id, n = je(O.items, t);
                    if (R("IS_ASYNC")) {
                        var r, o, i = function () {
                            setTimeout(function () {
                                h("REQUEST_ITEM_PROCESSING", {query: t})
                            }, 32)
                        };
                        return n.status === Ve.PROCESSING_COMPLETE ? (r = O.options.instantUpload, void n.revert(Ue(O.options.server.url, O.options.server.revert)).then(r ? i : function () {
                        })) : n.status === Ve.PROCESSING ? (o = O.options.instantUpload, void n.abortProcessing().then(o ? i : function () {
                        })) : void(O.options.instantUpload && i())
                    }
                    fe("SHOULD_PREPARE_OUTPUT", !1, {item: n, query: R}).then(function (e) {
                        e && h("REQUEST_PREPARE_OUTPUT", {
                            query: t, item: n, ready: function (e) {
                                h("DID_PREPARE_OUTPUT", {id: t, file: e})
                            }
                        }, !0)
                    })
                }, ADD_ITEM: function (e) {
                    var n = e.source, t = e.index, r = e.interactionMethod, o = e.success, i = void 0 === o ? function () {
                    } : o, a = e.failure, s = void 0 === a ? function () {
                    } : a, u = e.options, l = void 0 === u ? {} : u;
                    if (w(n)) s({
                        error: Ce("error", 0, "No source"),
                        file: null
                    }); else if (!We(n) || !O.options.ignoredFiles.includes(n.name.toLowerCase())) {
                        if (!function (e) {
                            var t = me(e.items).length;
                            if (!e.options.allowMultiple) return 0 === t;
                            var n = e.options.maxFiles;
                            return null === n || t < n
                        }(O)) {
                            if (O.options.allowMultiple || !O.options.allowMultiple && !O.options.allowReplace) {
                                var c = Ce("warning", 0, "Max files");
                                return h("DID_THROW_MAX_FILES", {source: n, error: c}), void s({error: c, file: null})
                            }
                            var f = me(O.items)[0];
                            f.status === Ve.PROCESSING_COMPLETE && f.revert(Ue(O.options.server.url, O.options.server.revert)), h("REMOVE_ITEM", {query: f.id})
                        }
                        var p = "local" === l.type ? xe.LOCAL : "limbo" === l.type ? xe.LIMBO : xe.INPUT,
                            d = Ye(p, p === xe.INPUT ? null : n, l.file);
                        Object.keys(l.metadata || {}).forEach(function (e) {
                            d.setMetadata(e, l.metadata[e])
                        }), pe("DID_CREATE_ITEM", d, {query: R}), Ie(O.items, d, t);
                        var E = d.id;
                        d.on("load-init", function () {
                            h("DID_START_ITEM_LOAD", {id: E})
                        }), d.on("load-meta", function () {
                            h("DID_UPDATE_ITEM_META", {id: E})
                        }), d.on("load-progress", function (e) {
                            h("DID_UPDATE_ITEM_LOAD_PROGRESS", {id: E, progress: e})
                        }), d.on("load-request-error", function (e) {
                            var t = ze(O.options.labelFileLoadError)(e);
                            if (400 <= e.code && e.code < 500) return h("DID_THROW_ITEM_INVALID", {
                                id: E,
                                error: e,
                                status: {main: t, sub: e.code + " (" + e.body + ")"}
                            }), void s({error: e, file: ae(d)});
                            h("DID_THROW_ITEM_LOAD_ERROR", {
                                id: E,
                                error: e,
                                status: {main: t, sub: O.options.labelTapToRetry}
                            })
                        }), d.on("load-file-error", function (e) {
                            h("DID_THROW_ITEM_INVALID", Object.assign({}, e, {id: E}))
                        }), d.on("load-abort", function () {
                            h("REMOVE_ITEM", {query: E})
                        }), d.on("load-skip", function () {
                            h("COMPLETE_LOAD_ITEM", {query: E, item: d, data: {source: n, success: i}})
                        }), d.on("load", function () {
                            fe("DID_LOAD_ITEM", d, {query: R, dispatch: h}).then(function () {
                                d.on("metadata-update", function (e) {
                                    h("DID_UPDATE_ITEM_METADATA", {id: E, change: e})
                                }), fe("SHOULD_PREPARE_OUTPUT", !1, {item: d, query: R}).then(function (e) {
                                    var t = function () {
                                        h("COMPLETE_LOAD_ITEM", {query: E, item: d, data: {source: n, success: i}})
                                    };
                                    e ? h("REQUEST_PREPARE_OUTPUT", {
                                        query: E, item: d, ready: function (e) {
                                            h("DID_PREPARE_OUTPUT", {id: E, file: e}), t()
                                        }
                                    }, !0) : t()
                                })
                            }).catch(function () {
                                h("REMOVE_ITEM", {query: E})
                            })
                        }), d.on("process-start", function () {
                            h("DID_START_ITEM_PROCESSING", {id: E})
                        }), d.on("process-progress", function (e) {
                            h("DID_UPDATE_ITEM_PROCESS_PROGRESS", {id: E, progress: e})
                        }), d.on("process-error", function (e) {
                            h("DID_THROW_ITEM_PROCESSING_ERROR", {
                                id: E,
                                error: e,
                                status: {main: ze(O.options.labelFileProcessingError)(e), sub: O.options.labelTapToRetry}
                            })
                        }), d.on("process-complete", function (e) {
                            h("DID_COMPLETE_ITEM_PROCESSING", {id: E, error: null, serverFileReference: e})
                        }), d.on("process-abort", function () {
                            h("DID_ABORT_ITEM_PROCESSING", {id: E})
                        }), d.on("process-revert", function () {
                            h("DID_REVERT_ITEM_PROCESSING", {id: E})
                        }), h("DID_ADD_ITEM", {
                            id: E,
                            index: t,
                            interactionMethod: r
                        }), clearTimeout(ke), ke = setTimeout(function () {
                            h("DID_UPDATE_ITEMS", {items: me(O.items)})
                        }, 0);
                        var _, v = O.options.server || {}, T = v.url, m = v.load, g = v.restore, I = v.fetch;
                        d.load(n, Me(p === xe.INPUT ? P(n) && ((-1 < (_ = n).indexOf(":") || -1 < _.indexOf("//")) && He(location.href) !== He(_)) ? Ge(T, I) : Xe : Ge(T, p === xe.LIMBO ? g : m)), function (e, t, n) {
                            fe("LOAD_FILE", e, {query: R}).then(t).catch(n)
                        })
                    }
                }, REQUEST_PREPARE_OUTPUT: function (e) {
                    var t = e.item, n = e.ready;
                    fe("PREPARE_OUTPUT", t.file, {query: R, item: t}).then(function (e) {
                        fe("COMPLETE_PREPARE_OUTPUT", e, {query: R, item: t}).then(function (e) {
                            n(e)
                        })
                    })
                }, COMPLETE_LOAD_ITEM: function (e) {
                    var t = e.item, n = e.data, r = n.success, o = n.source;
                    h("DID_LOAD_ITEM", {
                        id: t.id,
                        error: null,
                        serverFileReference: t.origin === xe.INPUT ? null : o
                    }), r(ae(t)), t.origin !== xe.LOCAL ? t.origin !== xe.LIMBO ? R("IS_ASYNC") && O.options.instantUpload && h("REQUEST_ITEM_PROCESSING", {query: t.id}) : h("DID_COMPLETE_ITEM_PROCESSING", {
                        id: t.id,
                        error: null,
                        serverFileReference: o
                    }) : h("DID_LOAD_LOCAL_ITEM", {id: t.id})
                }, RETRY_ITEM_LOAD: Qe(O, function (e) {
                    e.retryLoad()
                }), REQUEST_ITEM_PROCESSING: Qe(O, function (e, t, n) {
                    var r = e.id;
                    e.status !== Ve.PROCESSING_QUEUED && (e.requestProcessing(), h("DID_REQUEST_ITEM_PROCESSING", {id: r}), h("PROCESS_ITEM", {
                        query: e,
                        success: t,
                        failure: n
                    }, !0))
                }), PROCESS_ITEM: Qe(O, function (r, e, t) {
                    r.status !== Ve.PROCESSING && (r.onOnce("process-complete", function () {
                        e(ae(r))
                    }), r.onOnce("process-error", function (e) {
                        t({error: e, file: ae(r)})
                    }), r.process(Fe(function () {
                        var c = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", f = arguments[1],
                            p = arguments[2];
                        return "function" == typeof f ? function () {
                            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                            return f.apply(void 0, [p].concat(t))
                        } : f && P(f.url) ? function (e, t, n, r, o, i) {
                            if (e) {
                                var a = new FormData;
                                a.append(p, e, e.name), F(t) && a.append(p, JSON.stringify(t));
                                var s = f.onload || function (e) {
                                    return e
                                }, u = f.onerror || function (e) {
                                    return null
                                }, l = we(a, c + f.url, f);
                                return l.onload = function (e) {
                                    n(Ce("load", e.status, s(e.response), e.getAllResponseHeaders()))
                                }, l.onerror = function (e) {
                                    r(Ce("error", e.status, u(e.response) || e.statusText, e.getAllResponseHeaders()))
                                }, l.ontimeout = Ne(r), l.onprogress = o, l.onabort = i, l
                            }
                        } : null
                    }(O.options.server.url, O.options.server.process, O.options.name)), function (e, t, n) {
                        fe("PREPARE_OUTPUT", e, {query: R, item: r}).then(function (e) {
                            h("DID_PREPARE_OUTPUT", {id: r.id, file: e}), t(e)
                        }).catch(n)
                    }))
                }), RETRY_ITEM_PROCESSING: Qe(O, function (e) {
                    h("REQUEST_ITEM_PROCESSING", {query: e})
                }), REQUEST_REMOVE_ITEM: Qe(O, function (t) {
                    var e = function (e) {
                        e && h("REMOVE_ITEM", {query: t})
                    }, n = R("GET_BEFORE_REMOVE_FILE");
                    if (!n) return e(!0);
                    var r = n(ae(t));
                    return null == r ? e(!0) : "boolean" == typeof r ? e(r) : void("function" == typeof r.then && r.then(e))
                }), RELEASE_ITEM: Qe(O, function (e) {
                    e.release()
                }), REMOVE_ITEM: Qe(O, function (e, t) {
                    var n = e.id;
                    je(O.items, n).archive(), h("DID_REMOVE_ITEM", {
                        id: n,
                        item: e
                    }), clearTimeout(ke), ke = setTimeout(function () {
                        h("DID_UPDATE_ITEMS", {items: me(O.items)})
                    }, 0), t(ae(e))
                }), ABORT_ITEM_LOAD: Qe(O, function (e) {
                    e.abortLoad()
                }), ABORT_ITEM_PROCESSING: Qe(O, function (e) {
                    e.serverId ? h("REVERT_ITEM_PROCESSING", {id: e.id}) : e.abortProcessing().then(function () {
                        O.options.instantUpload && h("REMOVE_ITEM", {query: e.id})
                    })
                }), REQUEST_REVERT_ITEM_PROCESSING: Qe(O, function (t) {
                    if (O.options.instantUpload) {
                        var e = function (e) {
                            e && h("REVERT_ITEM_PROCESSING", {query: t})
                        }, n = R("GET_BEFORE_REMOVE_FILE");
                        if (!n) return e(!0);
                        var r = n(ae(t));
                        return null == r ? e(!0) : "boolean" == typeof r ? e(r) : void("function" == typeof r.then && r.then(e))
                    }
                    h("REVERT_ITEM_PROCESSING")
                }), REVERT_ITEM_PROCESSING: Qe(O, function (e) {
                    e.revert(Ue(O.options.server.url, O.options.server.revert)).then(function () {
                        (O.options.instantUpload || !We(e.file)) && h("REMOVE_ITEM", {query: e.id})
                    })
                }), SET_OPTIONS: function (e) {
                    var t = e.options;
                    I(t, function (e, t) {
                        h("SET_" + k(e, "_").toUpperCase(), {value: t})
                    })
                }
            }
        }, Ze = function (e) {
            return decodeURI(e)
        }, Je = function (e) {
            return document.createElement(e)
        }, Ke = function (e, t) {
            var n = e.childNodes[0];
            n ? t !== n.nodeValue && (n.nodeValue = t) : (n = document.createTextNode(t), e.appendChild(n))
        }, et = function (e, t, n, r) {
            var o = (r % 360 - 90) * Math.PI / 180;
            return {x: e + n * Math.cos(o), y: t + n * Math.sin(o)}
        }, tt = function (e, t, n, r, o) {
            var i, a, s, u, l, c, f, p, d = 1;
            return r < o && o - r <= .5 && (d = 0), o < r && .5 <= r - o && (d = 0), i = e, a = t, s = n, u = 360 * Math.min(.9999, r), l = 360 * Math.min(.9999, o), c = d, f = et(i, a, s, l), p = et(i, a, s, u), ["M", f.x, f.y, "A", s, s, 0, c, 0, p.x, p.y].join(" ")
        }, nt = a({
            tag: "div",
            name: "progress-indicator",
            ignoreRectUpdate: !0,
            ignoreRect: !0,
            create: function (e) {
                var t = e.root, n = e.props;
                n.spin = !1, n.progress = 0, n.opacity = 0;
                var r = Y("svg");
                t.ref.path = Y("path", {
                    "stroke-width": 2,
                    "stroke-linecap": "round"
                }), r.appendChild(t.ref.path), t.ref.svg = r, t.appendChild(r)
            },
            write: function (e) {
                var t = e.root, n = e.props;
                if (0 !== n.opacity) {
                    var r = parseInt(u(t.ref.path, "stroke-width"), 10), o = .5 * t.rect.element.width, i = 0, a = 0;
                    a = n.spin ? (i = 0, .5) : (i = 0, n.progress);
                    var s = tt(o, o, o - r, i, a);
                    u(t.ref.path, "d", s), u(t.ref.path, "stroke-opacity", n.spin || 0 < n.progress ? 1 : 0)
                }
            },
            mixins: {
                apis: ["progress", "spin"],
                styles: ["opacity"],
                animations: {
                    opacity: {type: "tween", duration: 500},
                    progress: {type: "spring", stiffness: .95, damping: .65, mass: 10}
                }
            }
        }), rt = a({
            tag: "button",
            attributes: {type: "button"},
            ignoreRect: !0,
            ignoreRectUpdate: !0,
            name: "file-action-button",
            mixins: {
                apis: ["label"],
                styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
                animations: {
                    scaleX: "spring",
                    scaleY: "spring",
                    translateX: "spring",
                    translateY: "spring",
                    opacity: {type: "tween", duration: 250}
                },
                listeners: !0
            },
            create: function (e) {
                var t = e.root, n = e.props;
                t.element.title = n.label, t.element.innerHTML = n.icon || "", n.disabled = !1
            },
            write: function (e) {
                var t = e.root, n = e.props;
                0 !== n.opacity || n.disabled ? 0 < n.opacity && n.disabled && (n.disabled = !1, t.element.removeAttribute("disabled")) : (n.disabled = !0, u(t.element, "disabled", "disabled"))
            }
        }), ot = function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : ".";
            return (e = Math.round(Math.abs(e))) < 1e3 ? e + " bytes" : e < at ? Math.floor(e / it) + " KB" : e < st ? ut(e / at, 1, t) + " MB" : ut(e / st, 2, t) + " GB"
        }, it = 1e3, at = 1e6, st = 1e9, ut = function (e, t, n) {
            return e.toFixed(t).split(".").filter(function (e) {
                return "0" !== e
            }).join(n)
        }, lt = function (e) {
            var t = e.root, n = e.props;
            Ke(t.ref.fileSize, ot(t.query("GET_ITEM_SIZE", n.id))), Ke(t.ref.fileName, Ze(t.query("GET_ITEM_NAME", n.id)))
        }, ct = function (e) {
            var t = e.root, n = e.props;
            C(t.query("GET_ITEM_SIZE", n.id)) || Ke(t.ref.fileSize, t.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"))
        }, ft = a({
            name: "file-info",
            ignoreRect: !0,
            ignoreRectUpdate: !0,
            write: s({
                DID_LOAD_ITEM: lt,
                DID_UPDATE_ITEM_META: lt,
                DID_THROW_ITEM_LOAD_ERROR: ct,
                DID_THROW_ITEM_INVALID: ct
            }),
            didCreateView: function (e) {
                pe("CREATE_VIEW", Object.assign({}, e, {view: e}))
            },
            create: function (e) {
                var t = e.root, n = e.props, r = Je("span");
                r.className = "filepond--file-info-main", u(r, "aria-hidden", "true"), t.appendChild(r), t.ref.fileName = r;
                var o = Je("span");
                o.className = "filepond--file-info-sub", t.appendChild(o), t.ref.fileSize = o, Ke(o, t.query("GET_LABEL_FILE_WAITING_FOR_SIZE")), Ke(r, Ze(t.query("GET_ITEM_NAME", n.id)))
            },
            mixins: {styles: ["translateX", "translateY"], animations: {translateX: "spring", translateY: "spring"}}
        }), pt = function (e) {
            return Math.round(100 * e)
        }, dt = function (e) {
            var t = e.root, n = e.action,
                r = null === n.progress ? t.query("GET_LABEL_FILE_LOADING") : t.query("GET_LABEL_FILE_LOADING") + " " + pt(n.progress) + "%";
            Ke(t.ref.main, r), Ke(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"))
        }, Et = function (e) {
            var t = e.root;
            Ke(t.ref.main, ""), Ke(t.ref.sub, "")
        }, _t = function (e) {
            var t = e.root, n = e.action;
            Ke(t.ref.main, n.status.main), Ke(t.ref.sub, n.status.sub)
        }, vt = a({
            name: "file-status",
            ignoreRect: !0,
            ignoreRectUpdate: !0,
            write: s({
                DID_LOAD_ITEM: Et,
                DID_REVERT_ITEM_PROCESSING: Et,
                DID_REQUEST_ITEM_PROCESSING: function (e) {
                    var t = e.root;
                    Ke(t.ref.main, t.query("GET_LABEL_FILE_PROCESSING")), Ke(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"))
                },
                DID_ABORT_ITEM_PROCESSING: function (e) {
                    var t = e.root;
                    Ke(t.ref.main, t.query("GET_LABEL_FILE_PROCESSING_ABORTED")), Ke(t.ref.sub, t.query("GET_LABEL_TAP_TO_RETRY"))
                },
                DID_COMPLETE_ITEM_PROCESSING: function (e) {
                    var t = e.root;
                    Ke(t.ref.main, t.query("GET_LABEL_FILE_PROCESSING_COMPLETE")), Ke(t.ref.sub, t.query("GET_LABEL_TAP_TO_UNDO"))
                },
                DID_UPDATE_ITEM_PROCESS_PROGRESS: function (e) {
                    var t = e.root, n = e.action,
                        r = null === n.progress ? t.query("GET_LABEL_FILE_PROCESSING") : t.query("GET_LABEL_FILE_PROCESSING") + " " + pt(n.progress) + "%";
                    Ke(t.ref.main, r), Ke(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"))
                },
                DID_UPDATE_ITEM_LOAD_PROGRESS: dt,
                DID_THROW_ITEM_LOAD_ERROR: _t,
                DID_THROW_ITEM_INVALID: _t,
                DID_THROW_ITEM_PROCESSING_ERROR: _t
            }),
            didCreateView: function (e) {
                pe("CREATE_VIEW", Object.assign({}, e, {view: e}))
            },
            create: function (e) {
                var t = e.root, n = Je("span");
                n.className = "filepond--file-status-main", t.appendChild(n), t.ref.main = n;
                var r = Je("span");
                r.className = "filepond--file-status-sub", t.appendChild(r), t.ref.sub = r, dt({
                    root: t,
                    action: {progress: null}
                })
            },
            mixins: {
                styles: ["translateX", "translateY", "opacity"],
                animations: {opacity: {type: "tween", duration: 250}, translateX: "spring", translateY: "spring"}
            }
        }), Tt = {
            AbortItemLoad: {
                label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
                action: "ABORT_ITEM_LOAD",
                className: "filepond--action-abort-item-load",
                align: "LOAD_INDICATOR_POSITION"
            },
            RetryItemLoad: {
                label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
                action: "RETRY_ITEM_LOAD",
                icon: "GET_ICON_RETRY",
                className: "filepond--action-retry-item-load",
                align: "BUTTON_PROCESS_ITEM_POSITION"
            },
            RemoveItem: {
                label: "GET_LABEL_BUTTON_REMOVE_ITEM",
                action: "REQUEST_REMOVE_ITEM",
                icon: "GET_ICON_REMOVE",
                className: "filepond--action-remove-item",
                align: "BUTTON_REMOVE_ITEM_POSITION"
            },
            ProcessItem: {
                label: "GET_LABEL_BUTTON_PROCESS_ITEM",
                action: "REQUEST_ITEM_PROCESSING",
                icon: "GET_ICON_PROCESS",
                className: "filepond--action-process-item",
                align: "BUTTON_PROCESS_ITEM_POSITION"
            },
            AbortItemProcessing: {
                label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
                action: "ABORT_ITEM_PROCESSING",
                className: "filepond--action-abort-item-processing",
                align: "BUTTON_PROCESS_ITEM_POSITION"
            },
            RetryItemProcessing: {
                label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
                action: "RETRY_ITEM_PROCESSING",
                icon: "GET_ICON_RETRY",
                className: "filepond--action-retry-item-processing",
                align: "BUTTON_PROCESS_ITEM_POSITION"
            },
            RevertItemProcessing: {
                label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
                action: "REQUEST_REVERT_ITEM_PROCESSING",
                icon: "GET_ICON_UNDO",
                className: "filepond--action-revert-item-processing",
                align: "BUTTON_PROCESS_ITEM_POSITION"
            }
        }, mt = [];
    I(Tt, function (e) {
        mt.push(e)
    });
    var gt, It = function (e) {
            return e.ref.buttonRemoveItem.rect.element.width + e.ref.buttonRemoveItem.rect.element.left
        }, ht = function (e) {
            return Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4)
        }, Rt = function (e) {
            return Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2)
        }, Ot = {
            buttonAbortItemLoad: {opacity: 0},
            buttonRetryItemLoad: {opacity: 0},
            buttonRemoveItem: {opacity: 0},
            buttonProcessItem: {opacity: 0},
            buttonAbortItemProcessing: {opacity: 0},
            buttonRetryItemProcessing: {opacity: 0},
            buttonRevertItemProcessing: {opacity: 0},
            loadProgressIndicator: {opacity: 0},
            processProgressIndicator: {opacity: 0},
            processingCompleteIndicator: {opacity: 0, scaleX: .75, scaleY: .75},
            info: {translateX: 0, translateY: 0, opacity: 0},
            status: {translateX: 0, translateY: 0, opacity: 0}
        }, yt = {
            buttonRemoveItem: {opacity: 1},
            buttonProcessItem: {opacity: 1},
            info: {translateX: It},
            status: {translateX: It}
        }, Dt = {buttonAbortItemProcessing: {opacity: 1}, processProgressIndicator: {opacity: 1}, status: {opacity: 1}},
        St = {
            DID_THROW_ITEM_INVALID: {
                buttonRemoveItem: {opacity: 1},
                info: {translateX: It},
                status: {translateX: It, opacity: 1}
            },
            DID_START_ITEM_LOAD: {
                buttonAbortItemLoad: {opacity: 1},
                loadProgressIndicator: {opacity: 1},
                status: {opacity: 1}
            },
            DID_THROW_ITEM_LOAD_ERROR: {
                buttonRetryItemLoad: {opacity: 1},
                buttonRemoveItem: {opacity: 1},
                info: {translateX: It},
                status: {opacity: 1}
            },
            DID_LOAD_ITEM: yt,
            DID_LOAD_LOCAL_ITEM: {buttonRemoveItem: {opacity: 1}, info: {translateX: It}, status: {translateX: It}},
            DID_START_ITEM_PROCESSING: Dt,
            DID_REQUEST_ITEM_PROCESSING: Dt,
            DID_UPDATE_ITEM_PROCESS_PROGRESS: Dt,
            DID_COMPLETE_ITEM_PROCESSING: {
                buttonRevertItemProcessing: {opacity: 1},
                info: {opacity: 1},
                status: {opacity: 1}
            },
            DID_THROW_ITEM_PROCESSING_ERROR: {
                buttonRemoveItem: {opacity: 1},
                buttonRetryItemProcessing: {opacity: 1},
                status: {opacity: 1},
                info: {translateX: It}
            },
            DID_ABORT_ITEM_PROCESSING: {
                buttonRemoveItem: {opacity: 1},
                buttonProcessItem: {opacity: 1},
                info: {translateX: It},
                status: {opacity: 1}
            },
            DID_REVERT_ITEM_PROCESSING: yt
        }, bt = a({
            create: function (e) {
                var t = e.root;
                t.element.innerHTML = t.query("GET_ICON_DONE")
            },
            name: "processing-complete-indicator",
            ignoreRect: !0,
            mixins: {
                styles: ["scaleX", "scaleY", "opacity"],
                animations: {scaleX: "spring", scaleY: "spring", opacity: {type: "tween", duration: 250}}
            }
        }), At = s({
            DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: function (e) {
                var t = e.root, n = e.action;
                t.ref.buttonAbortItemProcessing.label = n.value
            }, DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: function (e) {
                var t = e.root, n = e.action;
                t.ref.buttonAbortItemLoad.label = n.value
            }, DID_REQUEST_ITEM_PROCESSING: function (e) {
                var t = e.root;
                t.ref.processProgressIndicator.spin = !0, t.ref.processProgressIndicator.progress = 0
            }, DID_START_ITEM_LOAD: function (e) {
                var t = e.root;
                t.ref.loadProgressIndicator.spin = !0, t.ref.loadProgressIndicator.progress = 0
            }, DID_UPDATE_ITEM_LOAD_PROGRESS: function (e) {
                var t = e.root, n = e.action;
                t.ref.loadProgressIndicator.spin = !1, t.ref.loadProgressIndicator.progress = n.progress
            }, DID_UPDATE_ITEM_PROCESS_PROGRESS: function (e) {
                var t = e.root, n = e.action;
                t.ref.processProgressIndicator.spin = !1, t.ref.processProgressIndicator.progress = n.progress
            }
        }), Pt = a({
            create: function (e) {
                var r = e.root, o = e.props.id, t = r.query("GET_ALLOW_REVERT"), n = r.query("GET_INSTANT_UPLOAD"),
                    i = r.query("IS_ASYNC"), a = i ? mt.concat() : mt.filter(function (e) {
                        return !/Process/.test(e)
                    });
                if (i && !t) {
                    a.splice(-1, 1);
                    var s = St.DID_COMPLETE_ITEM_PROCESSING;
                    s.info.translateX = Rt, s.info.translateY = ht, s.status.translateY = ht, s.processingCompleteIndicator = {
                        opacity: 1,
                        scaleX: 1,
                        scaleY: 1
                    }
                }
                n && t && (Tt.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM", Tt.RevertItemProcessing.icon = "GET_ICON_REMOVE"), I(Tt, function (e, t) {
                    var n = r.createChildView(rt, {label: r.query(t.label), icon: r.query(t.icon), opacity: 0});
                    a.includes(e) && r.appendChildView(n), n.element.dataset.align = r.query("GET_STYLE_" + t.align), n.element.classList.add(t.className), n.on("click", function () {
                        r.dispatch(t.action, {query: o})
                    }), r.ref["button" + e] = n
                }), r.ref.info = r.appendChildView(r.createChildView(ft, {id: o})), r.ref.status = r.appendChildView(r.createChildView(vt, {id: o})), r.ref.processingCompleteIndicator = r.appendChildView(r.createChildView(bt)), r.ref.processingCompleteIndicator.element.dataset.align = r.query("GET_STYLE_BUTTON_PROCESS_ITEM_POSITION");
                var u = r.appendChildView(r.createChildView(nt, {opacity: 0}));
                u.element.classList.add("filepond--load-indicator"), u.element.dataset.align = r.query("GET_STYLE_LOAD_INDICATOR_POSITION"), r.ref.loadProgressIndicator = u;
                var l = r.appendChildView(r.createChildView(nt, {opacity: 0}));
                l.element.classList.add("filepond--process-indicator"), l.element.dataset.align = r.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"), r.ref.processProgressIndicator = l
            }, write: function (e) {
                var i = e.root, t = e.actions, n = e.props;
                At({root: i, actions: t, props: n});
                var r = [].concat(R(t)).filter(function (e) {
                    return /^DID_/.test(e.type)
                }).reverse().find(function (e) {
                    return St[e.type]
                });
                if (r && (!r || r.type !== i.ref.currentAction)) {
                    i.ref.currentAction = r.type;
                    var a = St[i.ref.currentAction];
                    I(Ot, function (r, e) {
                        var o = i.ref[r];
                        I(e, function (e, t) {
                            var n = a[r] && void 0 !== a[r][e] ? a[r][e] : t;
                            o[e] = "function" == typeof n ? n(i) : n
                        })
                    })
                }
            }, didCreateView: function (e) {
                pe("CREATE_VIEW", Object.assign({}, e, {view: e}))
            }, name: "file"
        }), Lt = a({
            create: function (e) {
                var t = e.root, n = e.props;
                t.ref.fileName = Je("legend"), t.appendChild(t.ref.fileName), t.ref.file = t.appendChildView(t.createChildView(Pt, {id: n.id}));
                var r = Je("input");
                r.type = "hidden", r.name = t.query("GET_NAME"), t.ref.data = r, t.appendChild(r)
            }, ignoreRect: !0, write: s({
                DID_LOAD_ITEM: function (e) {
                    var t = e.root, n = e.action, r = e.props;
                    t.ref.data.value = n.serverFileReference, Ke(t.ref.fileName, Ze(t.query("GET_ITEM_NAME", r.id)))
                }, DID_REMOVE_ITEM: function (e) {
                    e.root.ref.data.removeAttribute("value")
                }, DID_COMPLETE_ITEM_PROCESSING: function (e) {
                    var t = e.root, n = e.action;
                    t.ref.data.value = n.serverFileReference
                }, DID_REVERT_ITEM_PROCESSING: function (e) {
                    e.root.ref.data.removeAttribute("value")
                }
            }), didCreateView: function (e) {
                pe("CREATE_VIEW", Object.assign({}, e, {view: e}))
            }, tag: "fieldset", name: "file-wrapper"
        }), Mt = {type: "spring", damping: .6, mass: 7}, wt = function (e, t, n) {
            var r = a({name: "panel-" + t.name + " filepond--" + n, mixins: t.mixins, ignoreRectUpdate: !0}),
                o = e.createChildView(r, t.props);
            e.ref[t.name] = e.appendChildView(o)
        }, Ct = a({
            name: "panel", write: function (e) {
                var t = e.root, n = e.props;
                if (null !== t.ref.scalable && n.scalable === t.ref.scalable || (t.ref.scalable = !b(n.scalable) || n.scalable, t.element.dataset.scalable = t.ref.scalable), n.height) {
                    var r = t.ref.top.rect.element, o = t.ref.bottom.rect.element,
                        i = Math.max(r.height + o.height, n.height);
                    t.ref.center.translateY = r.height, t.ref.center.scaleY = (i - r.height - o.height) / 100, t.ref.bottom.translateY = i - o.height
                }
            }, create: function (e) {
                var t = e.root, n = e.props;
                [{name: "top"}, {
                    name: "center",
                    props: {translateY: null, scaleY: null},
                    mixins: {animations: {scaleY: Mt}, styles: ["translateY", "scaleY"]}
                }, {
                    name: "bottom",
                    props: {translateY: null},
                    mixins: {animations: {translateY: Mt}, styles: ["translateY"]}
                }].forEach(function (e) {
                    wt(t, e, n.name)
                }), t.element.classList.add("filepond--" + n.name), t.ref.scalable = null
            }, ignoreRect: !0, mixins: {apis: ["height", "scalable"]}
        }), Nt = {
            DID_START_ITEM_LOAD: "busy",
            DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
            DID_THROW_ITEM_INVALID: "load-invalid",
            DID_THROW_ITEM_LOAD_ERROR: "load-error",
            DID_LOAD_ITEM: "idle",
            DID_START_ITEM_PROCESSING: "busy",
            DID_REQUEST_ITEM_PROCESSING: "busy",
            DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
            DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
            DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
            DID_ABORT_ITEM_PROCESSING: "cancelled",
            DID_REVERT_ITEM_PROCESSING: "idle"
        }, Gt = a({
            create: function (e) {
                var t = e.root, n = e.props;
                t.ref.controls = t.appendChildView(t.createChildView(Lt, {id: n.id})), t.ref.panel = t.appendChildView(t.createChildView(Ct, {name: "item-panel"})), t.ref.panel.height = 0, n.markedForRemoval = !1
            },
            write: function (e) {
                var t = e.root, n = e.actions, r = e.props;
                t.ref.panel.height = t.ref.controls.rect.inner.height;
                var o = t.query("GET_PANEL_ASPECT_RATIO"), i = t.query("GET_ALLOW_MULTIPLE");
                t.height = o && !i ? t.rect.element.width * o : t.ref.controls.rect.inner.height;
                var a = [].concat(R(n)).filter(function (e) {
                    return /^DID_/.test(e.type)
                }).reverse().find(function (e) {
                    return Nt[e.type]
                });
                !a || a && a.type === r.currentState || (r.currentState = a.type, t.element.dataset.filepondItemState = Nt[r.currentState] || "")
            },
            destroy: function (e) {
                var t = e.root, n = e.props;
                t.dispatch("RELEASE_ITEM", {query: n.id})
            },
            tag: "li",
            name: "item",
            mixins: {
                apis: ["id", "markedForRemoval"],
                styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity", "height"],
                animations: {
                    scaleX: "spring",
                    scaleY: "spring",
                    translateX: "spring",
                    translateY: "spring",
                    opacity: {type: "tween", duration: 150}
                }
            }
        }), Ut = s({
            DID_ADD_ITEM: function (e) {
                var t = e.root, n = e.action, r = n.id, o = n.index, i = n.interactionMethod, a = {opacity: 0};
                i === K && (a.translateY = null), i === $ && (a.scaleX = .8, a.scaleY = .8, a.translateY = null), i === Z && (a.translateY = -30), i === Q && (a.translateX = -100, a.translateY = null), t.appendChildView(t.createChildView(Gt, Object.assign({id: r}, a)), o)
            }, DID_REMOVE_ITEM: function (e) {
                var t = e.root, n = e.action.id, r = t.childViews.find(function (e) {
                    return e.id === n
                });
                r && (r.scaleX = .9, r.scaleY = .9, r.opacity = 0, r.markedForRemoval = !0)
            }
        }), Bt = a({
            create: function (e) {
                var t = e.root;
                u(t.element, "role", "list")
            }, write: function (e) {
                var t = e.root, u = e.props, n = e.actions;
                Ut({root: t, props: u, actions: n});
                var l = 0;
                return t.childViews.filter(function (e) {
                    return e.rect.outer.height
                }).forEach(function (e, t) {
                    var n, r, o, i = e.rect;
                    e.translateX = 0, e.translateY = l + (-1 < u.dragIndex ? (n = t, r = u.dragIndex, o = 10, n - 1 === r ? o / 6 : n === r ? o / 2 : n + 1 === r ? -o / 2 : n + 2 === r ? -o / 6 : 0) : 0), e.markedForRemoval || (e.scaleX = 1, e.scaleY = 1, e.opacity = 1);
                    var a = i.element.height + i.element.marginTop + i.element.marginBottom,
                        s = e.markedForRemoval ? a * e.opacity : a;
                    l += s
                }), !0
            }, read: function (e) {
                var t = e.root, o = 0;
                t.childViews.filter(function (e) {
                    return e.rect.outer.height
                }).forEach(function (e) {
                    var t, n, r = e.rect.element.height + e.rect.element.marginBottom;
                    o += e.markedForRemoval ? r * (t = e.opacity, n = t - 1, Math.sqrt(1 - n * n)) : r
                }), t.rect.outer.height = o, t.rect.outer.bottom = t.rect.outer.height
            }, tag: "ul", name: "list", didWriteView: function (e) {
                var t = e.root;
                t.childViews.filter(function (e) {
                    return e.markedForRemoval && 0 === e.opacity && e.resting
                }).forEach(function (e) {
                    e._destroy(), t.removeChildView(e)
                })
            }, filterFrameActionsForChild: function (t, e) {
                return e.filter(function (e) {
                    return !e.data || !e.data.id || t.id === e.data.id
                })
            }, mixins: {apis: ["dragIndex"]}
        }), Ft = function (e, t) {
            for (var n = 0, r = e.childViews, o = r.length; n < o; n++) {
                var i = r[n].rect.outer, a = i.top + .5 * i.height;
                if (t.top < a) return n
            }
            return o
        }, qt = s({
            DID_DRAG: function (e) {
                var t = e.root, n = e.props, r = e.action;
                n.dragCoordinates = {
                    left: r.position.scopeLeft,
                    top: r.position.scopeTop - t.rect.outer.top + t.rect.element.scrollTop
                }
            }, DID_END_DRAG: function (e) {
                e.props.dragCoordinates = null
            }
        }), Vt = a({
            create: function (e) {
                var t = e.root, n = e.props;
                t.ref.list = t.appendChildView(t.createChildView(Bt)), n.dragCoordinates = null, n.overflowing = !1
            },
            write: function (e) {
                var t = e.root, n = e.props, r = e.actions;
                if (qt({
                    root: t,
                    props: n,
                    actions: r
                }), t.ref.list.dragIndex = n.dragCoordinates ? Ft(t.ref.list, n.dragCoordinates) : -1, n.overflowing && !n.overflow && (n.overflowing = !1, t.element.dataset.state = "", t.height = null), n.overflow) {
                    var o = Math.round(n.overflow);
                    o !== t.height && (n.overflowing = !0, t.element.dataset.state = "overflow", t.height = o)
                }
            },
            name: "list-scroller",
            mixins: {apis: ["overflow"], styles: ["height", "translateY"], animations: {translateY: "spring"}}
        }), xt = function (e, t, n) {
            var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "";
            n ? u(e, t, r) : e.removeAttribute(t)
        }, Yt = function (e) {
            var t = e.root;
            0 < t.query("GET_TOTAL_ITEMS") ? xt(t.element, "required", !1) : t.query("GET_REQUIRED") && xt(t.element, "required", !0)
        }, jt = a({
            tag: "input",
            name: "browser",
            ignoreRect: !0,
            ignoreRectUpdate: !0,
            attributes: {type: "file"},
            create: function (e) {
                var n = e.root, r = e.props;
                n.element.id = "filepond--browser-" + r.id, u(n.element, "aria-controls", "filepond--assistant-" + r.id), u(n.element, "aria-labelledby", "filepond--drop-label-" + r.id), n.ref.handleChange = function (e) {
                    if (n.element.value) {
                        var t = [].concat(R(n.element.files));
                        setTimeout(function () {
                            r.onload(t), function (e) {
                                if (e && "" !== e.value) {
                                    try {
                                        e.value = ""
                                    } catch (e) {
                                    }
                                    if (e.value) {
                                        var t = Je("form"), n = e.parentNode, r = e.nextSibling;
                                        t.appendChild(e), t.reset(), r ? n.insertBefore(e, r) : n.appendChild(e)
                                    }
                                }
                            }(n.element)
                        }, 250)
                    }
                }, n.element.addEventListener("change", n.ref.handleChange)
            },
            destroy: function (e) {
                var t = e.root;
                t.element.removeEventListener("change", t.ref.handleChange)
            },
            write: s({
                DID_ADD_ITEM: Yt, DID_REMOVE_ITEM: Yt, DID_SET_ALLOW_BROWSE: function (e) {
                    var t = e.root, n = e.action;
                    xt(t.element, "disabled", !n.value)
                }, DID_SET_ALLOW_MULTIPLE: function (e) {
                    var t = e.root, n = e.action;
                    xt(t.element, "multiple", n.value)
                }, DID_SET_ACCEPTED_FILE_TYPES: function (e) {
                    var t = e.root, n = e.action;
                    xt(t.element, "accept", !!n.value, n.value ? n.value.join(",") : "")
                }, DID_SET_CAPTURE_METHOD: function (e) {
                    var t = e.root, n = e.action;
                    xt(t.element, "capture", !!n.value, !0 === n.value ? "" : n.value)
                }, DID_SET_REQUIRED: function (e) {
                    var t = e.root;
                    e.action.value ? 0 === t.query("GET_TOTAL_ITEMS") && xt(t.element, "required", !0) : xt(t.element, "required", !1)
                }
            })
        }), Xt = 13, Ht = 32, Wt = function (e, t) {
            e.innerHTML = t;
            var n = e.querySelector(".filepond--label-action");
            return n && u(n, "tabindex", "0"), t
        }, zt = a({
            name: "drop-label",
            ignoreRect: !0,
            create: function (e) {
                var t = e.root, n = e.props, r = Je("label");
                u(r, "for", "filepond--browser-" + n.id), u(r, "id", "filepond--drop-label-" + n.id), u(r, "aria-hidden", "true"), r.addEventListener("keydown", function (e) {
                    e.keyCode !== Xt && e.keyCode !== Ht || (e.preventDefault(), t.ref.label.click())
                }), Wt(r, n.caption), t.appendChild(r), t.ref.label = r
            },
            write: s({
                DID_SET_LABEL_IDLE: function (e) {
                    var t = e.root, n = e.action;
                    Wt(t.ref.label, n.value)
                }
            }),
            mixins: {
                styles: ["opacity", "translateX", "translateY"],
                animations: {opacity: {type: "tween", duration: 150}, translateX: "spring", translateY: "spring"}
            }
        }), kt = a({
            name: "drip-blob",
            ignoreRect: !0,
            mixins: {
                styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
                animations: {
                    scaleX: "spring",
                    scaleY: "spring",
                    translateX: "spring",
                    translateY: "spring",
                    opacity: {type: "tween", duration: 250}
                }
            }
        }), Qt = s({
            DID_DRAG: function (e) {
                var t, n, r, o = e.root, i = e.action;
                if (!o.ref.blob) return t = {root: o}.root, n = .5 * t.rect.element.width, r = .5 * t.rect.element.height, void(t.ref.blob = t.appendChildView(t.createChildView(kt, {
                    opacity: 0,
                    scaleX: 2.5,
                    scaleY: 2.5,
                    translateX: n,
                    translateY: r
                })));
                o.ref.blob.translateX = i.position.scopeLeft, o.ref.blob.translateY = i.position.scopeTop, o.ref.blob.scaleX = 1, o.ref.blob.scaleY = 1, o.ref.blob.opacity = 1
            }, DID_DROP: function (e) {
                var t = e.root;
                t.ref.blob && (t.ref.blob.scaleX = 2.5, t.ref.blob.scaleY = 2.5, t.ref.blob.opacity = 0)
            }, DID_END_DRAG: function (e) {
                var t = e.root;
                t.ref.blob && (t.ref.blob.opacity = 0)
            }
        }), $t = a({
            ignoreRect: !0, ignoreRectUpdate: !0, name: "drip", write: function (e) {
                var t = e.root, n = e.props, r = e.actions;
                Qt({root: t, props: n, actions: r});
                var o = t.ref.blob;
                0 === r.length && o && 0 === o.opacity && (t.removeChildView(o), t.ref.blob = null)
            }
        }), Zt = function (r) {
            return new Promise(function (e, t) {
                var n = an(r);
                n.length ? e(n) : Jt(r).then(e)
            })
        }, Jt = function (r) {
            return new Promise(function (n, e) {
                var t = (r.items ? [].concat(R(r.items)) : []).filter(function (e) {
                    return Kt(e)
                }).map(function (e) {
                    return en(e)
                });
                t.length ? Promise.all(t).then(function (e) {
                    var t = [];
                    e.forEach(function (e) {
                        t.push.apply(t, R(e))
                    }), n(t.filter(function (e) {
                        return e
                    }))
                }) : n(r.files ? [].concat(R(r.files)) : [])
            })
        }, Kt = function (e) {
            if (rn(e)) {
                var t = on(e);
                if (t) return t.isFile || t.isDirectory
            }
            return "file" === e.kind
        }, en = function (n) {
            return new Promise(function (e, t) {
                nn(n) ? tn(on(n)).then(e) : e([n.getAsFile()])
            })
        }, tn = function (t) {
            return new Promise(function (n, e) {
                var r = [], o = 0;
                !function t(e) {
                    e.createReader().readEntries(function (e) {
                        e.forEach(function (e) {
                            e.isDirectory ? t(e) : (o++, e.file(function (e) {
                                r.push(e), o === r.length && n(r)
                            }))
                        })
                    })
                }(t)
            })
        }, nn = function (e) {
            return rn(e) && (on(e) || {}).isDirectory
        }, rn = function (e) {
            return "webkitGetAsEntry" in e
        }, on = function (e) {
            return e.webkitGetAsEntry()
        }, an = function (e) {
            var t = [];
            try {
                if ((t = un(e)).length) return t;
                t = sn(e)
            } catch (e) {
            }
            return t
        }, sn = function (e) {
            var t = e.getData("url");
            return "string" == typeof t && t.length ? [t] : []
        }, un = function (e) {
            var t = e.getData("text/html");
            if ("string" == typeof t && t.length) {
                var n = t.match(/src\s*=\s*"(.+?)"/);
                if (n) return [n[1]]
            }
            return []
        }, ln = [], cn = function (e) {
            return {pageLeft: e.pageX, pageTop: e.pageY, scopeLeft: e.offsetX || e.layerX, scopeTop: e.offsetY || e.layerY}
        }, fn = function (t) {
            var e = ln.find(function (e) {
                return e.element === t
            });
            if (e) return e;
            var n = pn(t);
            return ln.push(n), n
        }, pn = function (n) {
            var r = [], t = {dragenter: vn, dragover: Tn, dragleave: gn, drop: mn}, o = {};
            I(t, function (e, t) {
                o[e] = t(n, r), n.addEventListener(e, o[e], !1)
            });
            var i = {
                element: n, addListener: function (e) {
                    return r.push(e), function () {
                        r.splice(r.indexOf(e), 1), 0 === r.length && (ln.splice(ln.indexOf(i), 1), I(t, function (e) {
                            n.removeEventListener(e, o[e], !1)
                        }))
                    }
                }
            };
            return i
        }, dn = function (e, t) {
            var n, r, o, i = "getRootNode" in (n = t) ? n.getRootNode() : document, a = (r = i, o = {
                x: e.pageX - window.pageXOffset,
                y: e.pageY - window.pageYOffset
            }, "elementFromPoint" in r || (r = document), r.elementFromPoint(o.x, o.y));
            return a === t || t.contains(a)
        }, En = null, _n = function (e, t) {
            try {
                e.dropEffect = t
            } catch (e) {
            }
        }, vn = function (e, t) {
            return function (r) {
                r.preventDefault(), En = r.target, t.forEach(function (e) {
                    var t = e.element, n = e.onenter;
                    dn(r, t) && (e.state = "enter", n(cn(r)))
                })
            }
        }, Tn = function (e, t) {
            return function (c) {
                c.preventDefault();
                var f = c.dataTransfer;
                Zt(f).then(function (u) {
                    var l = !1;
                    t.some(function (e) {
                        var t = e.filterElement, n = e.element, r = e.onenter, o = e.onexit, i = e.ondrag, a = e.allowdrop;
                        _n(f, "copy");
                        var s = a(u);
                        if (s) if (dn(c, n)) {
                            if (l = !0, null === e.state) return e.state = "enter", void r(cn(c));
                            if (e.state = "over", t && !s) return void _n(f, "none");
                            i(cn(c))
                        } else t && !l && _n(f, "none"), e.state && (e.state = null, o(cn(c))); else _n(f, "none")
                    })
                })
            }
        }, mn = function (e, t) {
            return function (s) {
                s.preventDefault();
                var e = s.dataTransfer;
                Zt(e).then(function (a) {
                    t.forEach(function (e) {
                        var t = e.filterElement, n = e.element, r = e.ondrop, o = e.onexit, i = e.allowdrop;
                        e.state = null, i(a) ? t && !dn(s, n) || r(cn(s), a) : o(cn(s))
                    })
                })
            }
        }, gn = function (e, t) {
            return function (n) {
                En === n.target && t.forEach(function (e) {
                    var t = e.onexit;
                    e.state = null, t(cn(n))
                })
            }
        }, In = function (e, n, t) {
            e.classList.add("filepond--hopper");
            var r, o, i, a, s, u = t.catchesDropsOnPage, l = t.requiresDropOnElement,
                c = (r = e, o = u ? document.documentElement : e, i = l, a = fn(o), (s = {
                    element: r,
                    filterElement: i,
                    state: null,
                    ondrop: function () {
                    },
                    onenter: function () {
                    },
                    ondrag: function () {
                    },
                    onexit: function () {
                    },
                    onload: function () {
                    },
                    allowdrop: function () {
                    }
                }).destroy = a.addListener(s), s), f = "", p = "";
            c.allowdrop = function (e) {
                return n(e)
            }, c.ondrop = function (e, t) {
                n(t) ? (p = "drag-drop", d.onload(t, e)) : d.ondragend(e)
            }, c.ondrag = function (e) {
                d.ondrag(e)
            }, c.onenter = function (e) {
                p = "drag-over", d.ondragstart(e)
            }, c.onexit = function (e) {
                p = "drag-exit", d.ondragend(e)
            };
            var d = {
                updateHopperState: function () {
                    f !== p && (e.dataset.hopperState = p, f = p)
                }, onload: function () {
                }, ondragstart: function () {
                }, ondrag: function () {
                }, ondragend: function () {
                }, destroy: function () {
                    c.destroy()
                }
            };
            return d
        }, hn = !1, Rn = [], On = function (e) {
            Zt(e.clipboardData).then(function (t) {
                t.length && Rn.forEach(function (e) {
                    return e(t)
                })
            })
        }, yn = function () {
            var e, t = function (e) {
                n.onload(e)
            }, n = {
                destroy: function () {
                    var e;
                    e = t, ne(Rn, Rn.indexOf(e)), 0 === Rn.length && (document.removeEventListener("paste", On), hn = !1)
                }, onload: function () {
                }
            };
            return e = t, Rn.includes(e) || (Rn.push(e), hn || (hn = !0, document.addEventListener("paste", On))), n
        }, Dn = null, Sn = null, bn = [], An = function (e, t) {
            e.element.textContent = t
        }, Pn = function (e, t, n) {
            var r = e.query("GET_TOTAL_ITEMS");
            An(e, n + " " + t + ", " + r + " " + (1 === r ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL"))), clearTimeout(Sn), Sn = setTimeout(function () {
                e.element.textContent = ""
            }, 1500)
        }, Ln = function (e) {
            return e.element.parentNode.contains(document.activeElement)
        }, Mn = function (e) {
            var t = e.root, n = e.action, r = t.query("GET_ITEM", n.id).filename,
                o = t.query("GET_LABEL_FILE_PROCESSING_ABORTED");
            An(t, r + " " + o)
        }, wn = function (e) {
            var t = e.root, n = e.action, r = t.query("GET_ITEM", n.id).filename;
            An(t, n.status.main + " " + r + " " + n.status.sub)
        }, Cn = a({
            create: function (e) {
                var t = e.root, n = e.props;
                t.element.id = "filepond--assistant-" + n.id, u(t.element, "role", "status"), u(t.element, "aria-live", "polite"), u(t.element, "aria-relevant", "additions")
            }, ignoreRect: !0, ignoreRectUpdate: !0, write: s({
                DID_LOAD_ITEM: function (e) {
                    var t = e.root, n = e.action;
                    if (Ln(t)) {
                        t.element.textContent = "";
                        var r = t.query("GET_ITEM", n.id);
                        bn.push(r.filename), clearTimeout(Dn), Dn = setTimeout(function () {
                            Pn(t, bn.join(", "), t.query("GET_LABEL_FILE_ADDED")), bn.length = 0
                        }, 750)
                    }
                },
                DID_REMOVE_ITEM: function (e) {
                    var t = e.root, n = e.action;
                    if (Ln(t)) {
                        var r = n.item;
                        Pn(t, r.filename, t.query("GET_LABEL_FILE_REMOVED"))
                    }
                },
                DID_COMPLETE_ITEM_PROCESSING: function (e) {
                    var t = e.root, n = e.action, r = t.query("GET_ITEM", n.id).filename,
                        o = t.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
                    An(t, r + " " + o)
                },
                DID_ABORT_ITEM_PROCESSING: Mn,
                DID_REVERT_ITEM_PROCESSING: Mn,
                DID_THROW_ITEM_LOAD_ERROR: wn,
                DID_THROW_ITEM_INVALID: wn,
                DID_THROW_ITEM_PROCESSING_ERROR: wn
            }), tag: "span", name: "assistant"
        }), Nn = function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "-";
            return e.replace(new RegExp(t + ".", "g"), function (e) {
                return e.charAt(1).toUpperCase()
            })
        }, Gn = function (e) {
            var t = e.ref.list.childViews[0].childViews[0];
            return t ? {top: t.rect.element.marginTop, bottom: t.rect.element.marginBottom} : {top: 0, bottom: 0}
        }, Un = function (e, o) {
            var i = 0, a = 0;
            return e.ref.list.childViews[0].childViews.forEach(function (e, t) {
                if (!(o <= t)) {
                    var n = e.rect.element, r = n.height + n.marginTop + n.marginBottom;
                    a += r, i += e.markedForRemoval ? e.opacity * r : r
                }
            }), {visual: i, bounds: a}
        }, Bn = function (e) {
            var t = e.ref.measureHeight || null;
            return {cappedHeight: parseInt(e.style.maxHeight, 10) || null, fixedHeight: 0 === t ? null : t}
        }, Fn = function (e, t) {
            var n = e.query("GET_ALLOW_REPLACE"), r = e.query("GET_ALLOW_MULTIPLE"), o = e.query("GET_TOTAL_ITEMS"),
                i = e.query("GET_MAX_FILES"), a = t.length;
            return !r && 1 < a || !!(C(i = r ? i : n ? i : 1) && i < o + a)
        }, qn = s({
            DID_SET_ALLOW_BROWSE: function (e) {
                var t = e.root, n = e.props;
                e.action.value ? t.ref.browser = t.appendChildView(t.createChildView(jt, Object.assign({}, n, {
                    onload: function (e) {
                        if (Fn(t, e)) return !1;
                        te(e, function (e) {
                            t.dispatch("ADD_ITEM", {interactionMethod: Z, source: e, index: 0})
                        })
                    }
                })), 0) : t.ref.browser && t.removeChildView(t.ref.browser)
            }, DID_SET_ALLOW_DROP: function (e) {
                var o = e.root, t = (e.props, e.action);
                if (t.value && !o.ref.hopper) {
                    var n = In(o.element, function (e) {
                        return !Fn(o, e) && (!o.query("GET_DROP_VALIDATION") || e.every(function (e) {
                            return pe("ALLOW_HOPPER_ITEM", e, {query: o.query}).every(function (e) {
                                return !0 === e
                            })
                        }))
                    }, {
                        catchesDropsOnPage: o.query("GET_DROP_ON_PAGE"),
                        requiresDropOnElement: o.query("GET_DROP_ON_ELEMENT")
                    });
                    n.onload = function (e, t) {
                        var n = o.ref.list.childViews[0], r = Ft(n, {
                            left: t.scopeLeft,
                            top: t.scopeTop - o.ref.list.rect.outer.top + o.ref.list.element.scrollTop
                        });
                        te(e, function (e) {
                            o.dispatch("ADD_ITEM", {interactionMethod: $, source: e, index: r})
                        }), o.dispatch("DID_DROP", {position: t}), o.dispatch("DID_END_DRAG", {position: t})
                    }, n.ondragstart = function (e) {
                        o.dispatch("DID_START_DRAG", {position: e})
                    }, n.ondrag = function (i) {
                        var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 16,
                            s = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2], u = Date.now(),
                            l = null;
                        return function () {
                            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                            clearTimeout(l);
                            var r = Date.now() - u, o = function () {
                                u = Date.now(), i.apply(void 0, t)
                            };
                            r < a ? s || (l = setTimeout(o, a - r)) : o()
                        }
                    }(function (e) {
                        o.dispatch("DID_DRAG", {position: e})
                    }), n.ondragend = function (e) {
                        o.dispatch("DID_END_DRAG", {position: e})
                    }, o.ref.hopper = n, o.ref.drip = o.appendChildView(o.createChildView($t))
                } else !t.value && o.ref.hopper && (o.ref.hopper.destroy(), o.ref.hopper = null, o.removeChildView(o.ref.drip))
            }, DID_SET_ALLOW_PASTE: function (e) {
                var t = e.root;
                e.action.value ? (t.ref.paster = yn(), t.ref.paster.onload = function (e) {
                    te(e, function (e) {
                        t.dispatch("ADD_ITEM", {interactionMethod: J, source: e, index: 0})
                    })
                }) : t.ref.paster && (t.ref.paster.destroy(), t.ref.paster = null)
            }
        }), Vn = a({
            name: "root", read: function (e) {
                var t = e.root;
                t.ref.measure && (t.ref.measureHeight = t.ref.measure.offsetHeight)
            }, create: function (e) {
                var r = e.root, t = e.props, n = r.query("GET_ID");
                n && (r.element.id = n);
                var o = r.query("GET_CLASS_NAME");
                o && o.split(" ").forEach(function (e) {
                    r.element.classList.add(e)
                }), r.ref.label = r.appendChildView(r.createChildView(zt, Object.assign({}, t, {
                    translateY: null,
                    caption: r.query("GET_LABEL_IDLE")
                }))), r.ref.list = r.appendChildView(r.createChildView(Vt, {translateY: null})), r.ref.panel = r.appendChildView(r.createChildView(Ct, {name: "panel-root"})), r.ref.assistant = r.appendChildView(r.createChildView(Cn, Object.assign({}, t))), r.ref.measure = Je("div"), r.ref.measure.style.height = "100%", r.element.appendChild(r.ref.measure), r.ref.bounds = null, r.query("GET_STYLES").filter(function (e) {
                    return !w(e.value)
                }).map(function (e) {
                    var t = e.name, n = e.value;
                    r.element.dataset[t] = n
                })
            }, write: function (e) {
                var o = e.root, t = e.props, n = e.actions, r = o.ref.bounds;
                r || (r = o.ref.bounds = Bn(o), o.element.removeChild(o.ref.measure), o.ref.measure = null), qn({
                    root: o,
                    props: t,
                    actions: n
                }), n.filter(function (e) {
                    return /^DID_SET_STYLE_/.test(e.type)
                }).filter(function (e) {
                    return !w(e.data.value)
                }).map(function (e) {
                    var t = e.type, n = e.data, r = Nn(t.substr(8).toLowerCase(), "_");
                    o.element.dataset[r] = n.value, o.invalidateLayout()
                });
                var i = o.ref, a = i.hopper, s = i.label, u = i.list, l = i.panel;
                a && a.updateHopperState();
                var c = o.query("GET_PANEL_ASPECT_RATIO"), f = o.query("GET_ALLOW_MULTIPLE"),
                    p = o.query("GET_TOTAL_ITEMS"), d = f ? o.query("GET_MAX_FILES") || 1e6 : 1, E = p === d,
                    _ = n.find(function (e) {
                        return "DID_ADD_ITEM" === e.type
                    });
                if (E && _) {
                    var v = _.data.interactionMethod;
                    s.opacity = 0, f ? s.translateY = -40 : v === Q ? s.translateX = 40 : s.translateY = v === Z ? 40 : 30
                } else E || (s.opacity = 1, s.translateX = 0, s.translateY = 0);
                var T = Gn(o), m = Un(o, d), g = s.rect.element.height, I = !f || E ? 0 : g,
                    h = E ? u.rect.element.marginTop : 0, R = 0 === p ? 0 : u.rect.element.marginBottom,
                    O = I + h + m.visual + R, y = I + h + m.bounds + R;
                if (u.translateY = Math.max(0, I - u.rect.element.marginTop) - T.top, c) {
                    var D = o.rect.element.width * c;
                    l.scalable = !1;
                    var S = (l.height = D) - I - (R - T.bottom) - (E ? h : 0);
                    m.visual > S ? u.overflow = S : u.overflow = null, o.height = D
                } else if (r.fixedHeight) {
                    l.scalable = !1;
                    var b = r.fixedHeight - I - (R - T.bottom) - (E ? h : 0);
                    m.visual > b ? u.overflow = b : u.overflow = null
                } else if (r.cappedHeight) {
                    var A = O >= r.cappedHeight, P = Math.min(r.cappedHeight, O);
                    l.scalable = !0, l.height = A ? P : P - T.top - T.bottom;
                    var L = P - I - (R - T.bottom) - (E ? h : 0);
                    O > r.cappedHeight && m.visual > L ? u.overflow = L : u.overflow = null, o.height = Math.min(r.cappedHeight, y - T.top - T.bottom)
                } else {
                    var M = 0 < p ? T.top + T.bottom : 0;
                    l.scalable = !0, l.height = Math.max(g, O - M), o.height = Math.max(g, y - M)
                }
            }, destroy: function (e) {
                var t = e.root;
                t.ref.paster && t.ref.paster.destroy(), t.ref.hopper && t.ref.hopper.destroy()
            }, mixins: {styles: ["height"]}
        }), xn = function () {
            var t, r, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, n = null, o = Ee(),
                i = function (e) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [],
                        n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [], r = Object.assign({}, e),
                        o = [], i = [], a = function (e, t, n) {
                            n ? i.push({type: e, data: t}) : (c[e] && c[e](t), o.push({type: e, data: t}))
                        }, s = function (e) {
                            for (var t, n = arguments.length, r = Array(1 < n ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
                            return l[e] ? (t = l)[e].apply(t, r) : null
                        }, u = {
                            getState: function () {
                                return Object.assign({}, r)
                            }, processActionQueue: function () {
                                var e = [].concat(o);
                                return o.length = 0, e
                            }, processDispatchQueue: function () {
                                var e = [].concat(i);
                                i.length = 0, e.forEach(function (e) {
                                    var t = e.type, n = e.data;
                                    a(t, n)
                                })
                            }, dispatch: a, query: s
                        }, l = {};
                    t.forEach(function (e) {
                        l = Object.assign({}, e(r), l)
                    });
                    var c = {};
                    return n.forEach(function (e) {
                        c = Object.assign({}, e(a, s, r), c)
                    }), u
                }({items: [], options: z(o)}, [ge, (r = o, function (n) {
                    var e = {};
                    return I(r, function (t) {
                        e["GET_" + k(t, "_").toUpperCase()] = function (e) {
                            return n.options[t]
                        }
                    }), e
                })], [$e, (t = o, function (r, e, o) {
                    var i = {};
                    return I(t, function (t) {
                        var n = k(t, "_").toUpperCase();
                        i["SET_" + n] = function (e) {
                            try {
                                o.options[t] = e.value
                            } catch (e) {
                            }
                            r("DID_SET_" + n, {value: o.options[t]})
                        }
                    }), i
                })]);
            i.dispatch("SET_OPTIONS", {options: e});
            var a, s, u = Vn(i, {id: ee()}), l = !1, c = !1, f = {
                _read: function () {
                    l || (u._read(), c = u.rect.element.hidden)
                }, _write: function (e) {
                    if (!c) {
                        var n, t = i.processActionQueue().filter(function (e) {
                            return !/^SET_/.test(e.type)
                        });
                        if (!l || t.length) E(t), l = u._write(e, t), (n = i.query("GET_ITEMS")).forEach(function (e, t) {
                            e.released && ne(n, t)
                        }), l && i.processDispatchQueue()
                    }
                }
            }, p = function (r) {
                return function (e) {
                    var t = {type: r};
                    if (!e) return t;
                    if (e.hasOwnProperty("error") && (t.error = e.error ? Object.assign({}, e.error) : null), e.status && (t.status = Object.assign({}, e.status)), e.file && (t.output = e.file), e.source) t.file = e.source; else if (e.item || e.id) {
                        var n = e.item ? e.item : i.query("GET_ITEM", e.id);
                        t.file = n ? ae(n) : null
                    }
                    return e.items && (t.items = e.items.map(ae)), /progress/.test(r) && (t.progress = e.progress), t
                }
            }, d = {
                DID_DESTROY: p("destroy"),
                DID_INIT: p("init"),
                DID_THROW_MAX_FILES: p("warning"),
                DID_START_ITEM_LOAD: p("addfilestart"),
                DID_UPDATE_ITEM_LOAD_PROGRESS: p("addfileprogress"),
                DID_LOAD_ITEM: p("addfile"),
                DID_THROW_ITEM_INVALID: [p("error"), p("addfile")],
                DID_THROW_ITEM_LOAD_ERROR: [p("error"), p("addfile")],
                DID_PREPARE_OUTPUT: p("preparefile"),
                DID_START_ITEM_PROCESSING: p("processfilestart"),
                DID_UPDATE_ITEM_PROCESS_PROGRESS: p("processfileprogress"),
                DID_ABORT_ITEM_PROCESSING: p("processfileabort"),
                DID_COMPLETE_ITEM_PROCESSING: p("processfile"),
                DID_REVERT_ITEM_PROCESSING: p("processfilerevert"),
                DID_THROW_ITEM_PROCESSING_ERROR: [p("error"), p("processfile")],
                DID_REMOVE_ITEM: p("removefile"),
                DID_UPDATE_ITEMS: p("updatefiles")
            }, E = function (e) {
                e.length && e.forEach(function (t) {
                    if (d[t.type]) {
                        var e = d[t.type];
                        (Array.isArray(e) ? e : [e]).forEach(function (e) {
                            setTimeout(function () {
                                !function (t) {
                                    var e = Object.assign({pond: g}, t);
                                    delete e.type, u.element.dispatchEvent(new CustomEvent("FilePond:" + t.type, {
                                        detail: e,
                                        bubbles: !0,
                                        cancelable: !0,
                                        composed: !0
                                    }));
                                    var n = [];
                                    t.hasOwnProperty("error") && n.push(t.error), t.hasOwnProperty("file") && n.push(t.file);
                                    var r = ["type", "error", "file"];
                                    Object.keys(t).filter(function (e) {
                                        return !r.includes(e)
                                    }).forEach(function (e) {
                                        return n.push(t[e])
                                    }), g.fire.apply(g, [t.type].concat(n));
                                    var o = i.query("GET_ON" + t.type.toUpperCase());
                                    o && o.apply(void 0, n)
                                }(e(t.data))
                            }, 0)
                        })
                    }
                })
            }, _ = function (n) {
                var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                return new Promise(function (e, t) {
                    i.dispatch("ADD_ITEM", {
                        interactionMethod: Q,
                        source: n,
                        index: r.index,
                        success: e,
                        failure: t,
                        options: r
                    })
                })
            }, v = function (e) {
                return i.dispatch("REMOVE_ITEM", {query: e}), null === i.query("GET_ACTIVE_ITEM", e)
            }, T = function () {
                return i.query("GET_ACTIVE_ITEMS")
            }, m = function (e) {
                return new Promise(function (t, n) {
                    i.dispatch("REQUEST_ITEM_PROCESSING", {
                        query: e, success: function (e) {
                            t(e)
                        }, failure: function (e) {
                            n(e)
                        }
                    })
                })
            }, g = Object.assign({}, re(), f, (a = i, s = {}, I(o, function (t) {
                s[t] = {
                    get: function () {
                        return a.getState().options[t]
                    }, set: function (e) {
                        a.dispatch("SET_" + k(t, "_").toUpperCase(), {value: e})
                    }
                }
            }), s), {
                setOptions: function (e) {
                    return i.dispatch("SET_OPTIONS", {options: e})
                }, addFile: _, addFiles: function () {
                    for (var e = arguments.length, s = Array(e), t = 0; t < e; t++) s[t] = arguments[t];
                    return new Promise(function (t, e) {
                        var n = [], r = {};
                        if (S(s[0])) n.push.apply(n, R(s[0])), Object.assign(r, s[1] || {}); else {
                            var o = s[s.length - 1];
                            "object" !== (void 0 === o ? "undefined" : h(o)) || o instanceof Blob || Object.assign(r, s.pop()), n.push.apply(n, s)
                        }
                        var i = [], a = te(n, function (e) {
                            i.push(_(e, r))
                        });
                        Promise.all(a).then(function () {
                            Promise.all(i).then(function (e) {
                                t(e)
                            })
                        })
                    })
                }, getFile: function (e) {
                    return i.query("GET_ACTIVE_ITEM", e)
                }, processFile: m, removeFile: v, getFiles: T, processFiles: function () {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    var r = Array.isArray(t[0]) ? t[0] : t;
                    return r.length ? Promise.all(r.map(m)) : Promise.all(T().map(m))
                }, removeFiles: function () {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    var r = Array.isArray(t[0]) ? t[0] : t, o = T();
                    return r.length ? r.map(function (e) {
                        return O(e) ? o[e] ? o[e].id : null : e
                    }).filter(function (e) {
                        return e
                    }).map(v) : Promise.all(o.map(v))
                }, browse: function () {
                    var e = u.element.querySelector("input[type=file]");
                    e && e.click()
                }, destroy: function () {
                    g.fire("destroy", u.element), i.dispatch("ABORT_ALL"), u._destroy(), i.dispatch("DID_DESTROY")
                }, insertBefore: function (e) {
                    return y(u.element, e)
                }, insertAfter: function (e) {
                    return D(u.element, e)
                }, appendTo: function (e) {
                    return e.appendChild(u.element)
                }, replaceElement: function (e) {
                    y(u.element, e), e.parentNode.removeChild(e), n = e
                }, restoreElement: function () {
                    n && (D(n, u.element), u.element.parentNode.removeChild(u.element), n = null)
                }, isAttachedTo: function (e) {
                    return u.element === e || n === e
                }, element: {
                    get: function () {
                        return u.element
                    }
                }
            });
            return i.dispatch("DID_INIT"), x(g)
        }, Yn = function () {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, n = {};
            return I(Ee(), function (e, t) {
                n[e] = t[0]
            }), xn(Object.assign({}, n, e))
        }, jn = function (o) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                t = [].concat(R(o.attributes)).reduce(function (e, t) {
                    var n, r = u(o, t.name);
                    return e[(n = t.name, Nn(n.replace(/^data-/, "")))] = r === t.name || r, e
                }, {});
            return function e(s, t) {
                I(t, function (i, a) {
                    I(s, function (e, t) {
                        var n = new RegExp(i);
                        if (n.test(e) && (delete s[e], !1 !== a)) if (P(a)) s[a] = t; else {
                            var r, o = a.group;
                            F(a) && !s[o] && (s[o] = {}), s[o][(r = e.replace(n, ""), r.charAt(0).toLowerCase() + r.slice(1))] = t
                        }
                    }), a.mapping && e(s[a.group], a.mapping)
                })
            }(t, e), t
        }, Xn = function () {
            return (arguments.length <= 0 ? void 0 : arguments[0]) instanceof HTMLElement ? function (e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = {
                    "^class$": "className",
                    "^multiple$": "allowMultiple",
                    "^capture$": "captureMethod",
                    "^server": {
                        group: "server",
                        mapping: {
                            "^process": {group: "process"},
                            "^revert": {group: "revert"},
                            "^fetch": {group: "fetch"},
                            "^restore": {group: "restore"},
                            "^load": {group: "load"}
                        }
                    },
                    "^type$": !1,
                    "^files$": !1
                };
                pe("SET_ATTRIBUTE_TO_OPTION_MAP", n);
                var r = Object.assign({}, t),
                    o = jn("FIELDSET" === e.nodeName ? e.querySelector("input[type=file]") : e, n);
                Object.keys(o).forEach(function (e) {
                    F(o[e]) ? (F(r[e]) || (r[e] = {}), Object.assign(r[e], o[e])) : r[e] = o[e]
                }), r.files = (t.files || []).concat([].concat(R(e.querySelectorAll("input:not([type=file])"))).map(function (e) {
                    return {source: e.value, options: {type: e.dataset.type}}
                }));
                var i = Yn(r);
                return e.files && [].concat(R(e.files)).forEach(function (e) {
                    i.addFile(e)
                }), i.replaceElement(e), i
            }.apply(void 0, arguments) : Yn.apply(void 0, arguments)
        }, Hn = ["fire", "_read", "_write"], Wn = function (e) {
            var t = {};
            return oe(e, t, Hn), t
        }, zn = function (e, n) {
            return e.replace(/(?:{([a-zA-Z]+)})/g, function (e, t) {
                return n[t]
            })
        }, kn = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"], Qn = ["css", "csv", "html", "txt"],
        $n = {zip: "zip|compressed", epub: "application/epub+zip"}, Zn = function () {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
            return e = e.toLowerCase(), kn.includes(e) ? "image/" + ("jpg" === e ? "jpeg" : "svg" === e ? "svg+xml" : e) : Qn.includes(e) ? "text/" + e : $n[e] || null
        }, Jn = function (e) {
            var t = new Blob(["(", e.toString(), ")()"], {type: "application/javascript"}), n = URL.createObjectURL(t),
                o = new Worker(n);
            return {
                transfer: function (e, t) {
                }, post: function (e, t, n) {
                    var r = ee();
                    o.onmessage = function (e) {
                        e.data.id === r && t(e.data.message)
                    }, o.postMessage({id: r, message: e}, n)
                }, terminate: function () {
                    o.terminate(), URL.revokeObjectURL(n)
                }
            }
        }, Kn = function (r) {
            return new Promise(function (e, t) {
                var n = new Image;
                n.onload = function () {
                    e(n)
                }, n.onerror = function (e) {
                    t(e)
                }, n.src = r
            })
        }, er = function (e, t) {
            var n = e.slice(0, e.size, e.type);
            return n.lastModifiedDate = e.lastModifiedDate, n.name = t, n
        }, tr = function (e) {
            return er(e, e.name)
        }, nr = [], rr = function (e) {
            if (!nr.includes(e)) {
                nr.push(e);
                var t, n = e({
                    addFilter: de,
                    utils: {
                        Type: le,
                        forin: I,
                        isString: P,
                        isFile: We,
                        toNaturalFileSize: ot,
                        replaceInString: zn,
                        getExtensionFromFilename: Oe,
                        getFilenameWithoutExtension: qe,
                        guesstimateMimeType: Zn,
                        getFileFromBlob: Se,
                        getFilenameFromURL: Re,
                        createRoute: s,
                        createWorker: Jn,
                        createView: a,
                        loadImage: Kn,
                        copyFile: tr,
                        renameFile: er,
                        createBlob: be,
                        applyFilterChain: fe,
                        text: Ke,
                        getNumericAspectRatioFromString: Te
                    },
                    views: {fileActionButton: rt}
                });
                t = n.options, Object.assign(_e, t)
            }
        },
        or = (gt = "undefined" != typeof window && void 0 !== window.document && !("[object OperaMini]" === Object.prototype.toString.call(window.operamini)) && "visibilityState" in document && "Promise" in window && "slice" in Blob.prototype && "URL" in window && "createObjectURL" in window.URL && "performance" in window, function () {
            return gt
        }), ir = {apps: []}, ar = function () {
        };
    if (n.FileStatus = {}, n.OptionTypes = {}, n.create = ar, n.destroy = ar, n.parse = ar, n.find = ar, n.registerPlugin = ar, n.getOptions = ar, n.setOptions = ar, n.FileOrigin = {}, or()) {
        !function (e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 60, r = "__framePainter";
            if (window[r]) return window[r].readers.push(e), window[r].writers.push(t);
            window[r] = {readers: [e], writers: [t]};
            var o = window[r], i = 1e3 / n, a = null, s = null;
            (function e(t) {
                s = window.requestAnimationFrame(e), a || (a = t);
                var n = t - a;
                n <= i || (a = t - n % i, o.readers.forEach(function (e) {
                    return e()
                }), o.writers.forEach(function (e) {
                    return e(t)
                }))
            })(performance.now())
        }(function () {
            ir.apps.forEach(function (e) {
                return e._read()
            })
        }, function (t) {
            ir.apps.forEach(function (e) {
                return e._write(t)
            })
        });
        var sr = function e() {
            document.dispatchEvent(new CustomEvent("FilePond:loaded", {
                detail: {
                    supported: or,
                    create: n.create,
                    destroy: n.destroy,
                    parse: n.parse,
                    find: n.find,
                    registerPlugin: n.registerPlugin,
                    setOptions: n.setOptions
                }
            })), document.removeEventListener("DOMContentLoaded", e)
        };
        "loading" !== document.readyState ? setTimeout(function () {
            return sr()
        }, 0) : document.addEventListener("DOMContentLoaded", sr);
        var ur = function () {
            return I(Ee(), function (e, t) {
                n.OptionTypes[e] = t[1]
            })
        };
        n.FileOrigin = Object.assign({}, xe), n.FileStatus = Object.assign({}, Ve), n.OptionTypes = {}, ur(), n.create = function () {
            var e = Xn.apply(void 0, arguments);
            return e.on("destroy", n.destroy), ir.apps.push(e), Wn(e)
        }, n.destroy = function (t) {
            var e = ir.apps.findIndex(function (e) {
                return e.isAttachedTo(t)
            });
            return 0 <= e && (ir.apps.splice(e, 1)[0].restoreElement(), !0)
        }, n.parse = function (e) {
            return [].concat(R(e.querySelectorAll(".filepond"))).filter(function (t) {
                return !ir.apps.find(function (e) {
                    return e.isAttachedTo(t)
                })
            }).map(function (e) {
                return n.create(e)
            })
        }, n.find = function (t) {
            var e = ir.apps.find(function (e) {
                return e.isAttachedTo(t)
            });
            return e ? Wn(e) : null
        }, n.registerPlugin = function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            t.forEach(rr), ur()
        }, n.getOptions = function () {
            var n = {};
            return I(Ee(), function (e, t) {
                n[e] = t[0]
            }), n
        }, n.setOptions = function (t) {
            return F(t) && (ir.apps.forEach(function (e) {
                e.setOptions(t)
            }), I(t, function (e, t) {
                _e[e] && (_e[e][0] = W(t, _e[e][0], _e[e][1]))
            })), n.getOptions()
        }
    }
    n.supported = or, Object.defineProperty(n, "__esModule", {value: !0})
});