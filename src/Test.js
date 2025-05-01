(this["webpackJsonpc-and-f"] = this["webpackJsonpc-and-f"] || []).push([[2], {
    10: function (e, t, a) {
        "use strict";
        a.d(t, "a", (function () {
            return g
        }));
        var n = a(37), r = a(32), i = a(21), o = a(23), l = a(12), c = a(13), s = function () {
            function e() {
                Object(l.a)(this, e)
            }

            return Object(c.a)(e, null, [{
                key: "DesktopSideDrawer", value: function (e) {
                    "boolean" === typeof e && window.localStorage.setItem("desktop_side_drawer_open", e);
                    var t = window.localStorage.getItem("desktop_side_drawer_open");
                    return "" !== t && "undefined" !== typeof t && "true" === t
                }
            }]), e
        }(), u = a(19), d = a(18), m = a(0), p = a.n(m), E = a(39), f = a.n(E), h = function (e) {
            Object(u.a)(a, e);
            var t = Object(d.a)(a);

            function a(e) {
                var n;
                return Object(l.a)(this, a), (n = t.call(this, e)).__prev_identifier_key = "__prev_module_state", n.__identifier_key = "__module_state", n
            }

            return Object(c.a)(a, [{
                key: "IsReady", value: function () {
                    var e = window.localStorage.getItem(this.__prev_identifier_key),
                        t = window.localStorage.getItem(this.__identifier_key);
                    return e = "" === e || null === e || "FETCHING" === e ? "[]" : e, t = "" === t || null === t || "FETCHING" === t ? "[]" : t, JSON.parse(e).length > 0 && JSON.parse(t).length > 0
                }
            }, {
                key: "Initialize", value: function () {
                    var e = this;
                    window.localStorage.setItem(this.__prev_identifier_key, "FETCHING"), window.localStorage.setItem(this.__identifier_key, "FETCHING"), "FETCHING" === window.localStorage.getItem(this.__prev_identifier_key) && "FETCHING" === window.localStorage.getItem(this.__identifier_key) && f()({
                        method: "get",
                        url: n.a.URL.API.ROOT + "/my_module_list",
                        headers: {Authorization: "Bearer ".concat(o.a.getToken())}
                    }).then((function (t) {
                        var a = t.data;
                        if (!0 === a.success) {
                            var n = a.module_list;
                            window.localStorage.setItem(e.__prev_identifier_key, JSON.stringify(n)), window.localStorage.setItem(e.__identifier_key, JSON.stringify(n))
                        } else window.localStorage.setItem(e.__prev_identifier_key, "[]"), window.localStorage.setItem(e.__identifier_key, "[]")
                    })).catch((function (t) {
                        t.response ? 401 === t.response.status && o.a.remove(e.props) : (new g.SERVICES.NETWORK_FAILURE).SetError(), window.localStorage.setItem(e.__prev_identifier_key, "[]"), window.localStorage.setItem(e.__identifier_key, "[]")
                    }))
                }
            }, {
                key: "GetModules", value: function () {
                    var e = window.localStorage.getItem(this.__identifier_key);
                    return e = "" === e || null === e || "FETCHING" === e ? "[]" : e, JSON.parse(e)
                }
            }, {
                key: "GetModulePermissions", value: function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.GetModules(), a = !1;
                    if (Array.isArray(t) && t.length > 0) for (var n = 0; n < t.length; n++) t[n].Code === e ? !1 !== t[n].Permissions && null !== t[n].Permissions && (a = t[n].Permissions) : Array.isArray(t[n].ChildModules) && t[n].ChildModules.length > 0 && (a = this.GetModulePermissions(e, t[n].ChildModules));
                    return a
                }
            }, {
                key: "TurnOnGuard", value: function () {
                    var e = window.localStorage.getItem(this.__prev_identifier_key),
                        t = window.localStorage.getItem(this.__identifier_key);
                    e === t && null !== e && "" !== e && null !== t && "" !== t || this.Initialize();
                    var a = this;
                    setTimeout((function () {
                        a.TurnOnGuard()
                    }), 100)
                }
            }]), a
        }(p.a.Component), _ = function (e) {
            Object(u.a)(a, e);
            var t = Object(d.a)(a);

            function a(e) {
                var n;
                return Object(l.a)(this, a), (n = t.call(this, e)).__prev_identifier_key = "__prev_sess_user_state", n.__identifier_key = "__sess_user_state", n
            }

            return Object(c.a)(a, [{
                key: "IsReady", value: function () {
                    var e = window.localStorage.getItem(this.__prev_identifier_key),
                        t = window.localStorage.getItem(this.__identifier_key);
                    return e = "" === e || null === e || "FETCHING" === e ? "{}" : e, t = "" === t || null === t || "FETCHING" === t ? "{}" : t, JSON.parse(e).id > 0 && JSON.parse(t).id > 0
                }
            }, {
                key: "Initialize", value: function () {
                    var e = this;
                    window.localStorage.setItem(this.__prev_identifier_key, "FETCHING"), window.localStorage.setItem(this.__identifier_key, "FETCHING"), "FETCHING" === window.localStorage.getItem(this.__prev_identifier_key) && "FETCHING" === window.localStorage.getItem(this.__identifier_key) && f()({
                        method: "get",
                        url: n.a.URL.API.ROOT + "/auth_user",
                        headers: {Authorization: "Bearer ".concat(o.a.getToken())}
                    }).then((function (t) {
                        var a = t.data;
                        if (!0 === a.success) {
                            var n = {
                                id: a.user.id,
                                IsSupportUser: a.user.IsSupportUser,
                                CompanyID: a.user.CompanyID,
                                IsActive: a.user.IsActive,
                                IsMasterUser: a.user.IsMasterUser,
                                UserRoleID: a.user.UserRoleID,
                                FullName: a.user.FullName,
                                ProfilePhoto: a.user.ProfilePhoto
                            };
                            window.localStorage.setItem(e.__prev_identifier_key, JSON.stringify(n)), window.localStorage.setItem(e.__identifier_key, JSON.stringify(n))
                        } else window.localStorage.setItem(e.__prev_identifier_key, "{}"), window.localStorage.setItem(e.__identifier_key, "{}")
                    })).catch((function (t) {
                        t.response ? 401 === t.response.status && o.a.remove(e.props) : (new g.SERVICES.NETWORK_FAILURE).SetError(), window.localStorage.setItem(e.__prev_identifier_key, "{}"), window.localStorage.setItem(e.__identifier_key, "{}")
                    }))
                }
            }, {
                key: "GetProfile", value: function () {
                    var e = window.localStorage.getItem(this.__identifier_key);
                    return e = "" === e || null === e || "FETCHING" === e ? "{}" : e, JSON.parse(e)
                }
            }, {
                key: "TurnOnGuard", value: function () {
                    var e = window.localStorage.getItem(this.__prev_identifier_key),
                        t = window.localStorage.getItem(this.__identifier_key);
                    e === t && null !== e && "" !== e && null !== t && "" !== t || this.Initialize();
                    var a = this;
                    setTimeout((function () {
                        a.TurnOnGuard()
                    }), 100)
                }
            }]), a
        }(p.a.Component), O = function (e) {
            Object(u.a)(a, e);
            var t = Object(d.a)(a);

            function a(e) {
                var n;
                return Object(l.a)(this, a), (n = t.call(this, e)).__prev_identifier_key = "__prev_sys_license_state", n.__identifier_key = "__sys_license_state", n
            }

            return Object(c.a)(a, [{
                key: "IsReady", value: function () {
                    var e = window.localStorage.getItem(this.__prev_identifier_key),
                        t = window.localStorage.getItem(this.__identifier_key);
                    return e = "" === e || null === e || "FETCHING" === e ? "{}" : e, t = "" === t || null === t || "FETCHING" === t ? "{}" : t, JSON.parse(e).Loaded && JSON.parse(t).Loaded
                }
            }, {
                key: "Initialize", value: function () {
                    var e = this;
                    window.localStorage.setItem(this.__prev_identifier_key, "FETCHING"), window.localStorage.setItem(this.__identifier_key, "FETCHING"), "FETCHING" === window.localStorage.getItem(this.__prev_identifier_key) && "FETCHING" === window.localStorage.getItem(this.__identifier_key) && f()({
                        method: "get",
                        url: n.a.URL.API.ROOT + "/company_license_status",
                        headers: {Authorization: "Bearer ".concat(o.a.getToken())}
                    }).then((function (t) {
                        var a = t.data;
                        if (!0 === a.success) {
                            var n = {
                                Loaded: !0,
                                license_status: a.license_status,
                                active_days: a.active_days,
                                license_alert_days: a.license_alert_days
                            };
                            window.localStorage.setItem(e.__prev_identifier_key, JSON.stringify(n)), window.localStorage.setItem(e.__identifier_key, JSON.stringify(n))
                        } else window.localStorage.setItem(e.__prev_identifier_key, "{}"), window.localStorage.setItem(e.__identifier_key, "{}")
                    })).catch((function (t) {
                        t.response ? 401 === t.response.status && o.a.remove(e.props) : (new g.SERVICES.NETWORK_FAILURE).SetError(), window.localStorage.setItem(e.__prev_identifier_key, "{}"), window.localStorage.setItem(e.__identifier_key, "{}")
                    }))
                }
            }, {
                key: "GetSystemLicense", value: function () {
                    var e = window.localStorage.getItem(this.__identifier_key);
                    return e = "" === e || null === e || "FETCHING" === e ? "{}" : e, JSON.parse(e)
                }
            }, {
                key: "TurnOnGuard", value: function () {
                    var e = window.localStorage.getItem(this.__prev_identifier_key),
                        t = window.localStorage.getItem(this.__identifier_key);
                    e === t && null !== e && "" !== e && null !== t && "" !== t || this.Initialize();
                    var a = this;
                    setTimeout((function () {
                        a.TurnOnGuard()
                    }), 100)
                }
            }]), a
        }(p.a.Component), S = a(84), g = {
            ENV: n.a,
            CONFIG: r.a,
            ROUTES: i.a,
            SERVICES: {NETWORK_FAILURE: S.a, AUTH: o.a, LOCAL_SETTINGS: s, UAP: h, SessionUser: _, SystemLicense: O}
        }
    }, 128: function (e, t, a) {
        "use strict";
        a.d(t, "a", (function () {
            return k
        }));
        var n = a(15), r = a(11), i = a(0), o = a.n(i), l = a(117), c = a(120), s = a(88), u = a(78), d = a(166),
            m = a(119), p = a(122), E = a(165), f = a(167), h = a(68), _ = a.n(h), O = a(69), S = a.n(O),
            g = Object(l.a)((function (e) {
                return {
                    root: {width: "100%", maxWidth: 360, backgroundColor: e.palette.background.paper},
                    ListItem: Object(r.a)({}, e.breakpoints.up("sm"), {borderRadius: "5px"})
                }
            }));

        function w(e) {
            g();
            return o.a.createElement(s.a, null, o.a.createElement(u.a, null, o.a.createElement(u.a, null, o.a.createElement(p.a, {
                edge: "start",
                checked: !0,
                tabIndex: -1,
                disableRipple: !0
            }))), o.a.createElement(m.a, {primary: e.label}))
        }

        function I(e) {
            g();
            var t = o.a.useState(!1), a = Object(n.a)(t, 2), r = a[0], i = a[1];
            return o.a.createElement(o.a.Fragment, null, o.a.createElement(s.a, null, o.a.createElement(u.a, null, o.a.createElement(u.a, null, o.a.createElement(p.a, {
                edge: "start",
                checked: !0,
                tabIndex: -1,
                disableRipple: !0
            }))), o.a.createElement(m.a, {primary: e.label}), o.a.createElement(d.a, null, o.a.createElement(E.a, {
                edge: "end",
                "aria-label": "comments",
                onClick: function () {
                    i(!r)
                }
            }, r ? o.a.createElement(_.a, null) : o.a.createElement(S.a, null)))), o.a.createElement(f.a, {
                in: r,
                timeout: "auto",
                unmountOnExit: !0,
                addEndListener: ""
            }, o.a.createElement(c.a, {
                component: "div",
                disablePadding: !0,
                dense: !0,
                style: {paddingLeft: "55px"}
            }, e.children)))
        }

        function k() {
            var e = g();
            return o.a.createElement(c.a, {
                className: e.root,
                dense: !0
            }, o.a.createElement(w, {label: "Hello"}), o.a.createElement(I, {label: "Reports"}, o.a.createElement(w, {label: "Recommended Patients"}), o.a.createElement(w, {label: "Recommended Patients"}), o.a.createElement(I, {label: "Reports"}, o.a.createElement(w, {label: "Recommended Patients"}), o.a.createElement(w, {label: "Recommended Patients"}))))
        }
    }, 131: function (e, t, a) {
        e.exports = a(164)
    }, 135: function (e, t, a) {
    }, 143: function (e, t, a) {
    }, 144: function (e, t, a) {
    }, 163: function (e, t, a) {
    }, 164: function (e, t, a) {
        "use strict";
        a.r(t);
        var n = a(0), r = a.n(n), i = a(8), o = a.n(i), l = (a(135), a(12)), c = a(13), s = a(19), u = a(18), d = a(29),
            m = a(17), p = a(77), E = a(21), f = a(23), h = function (e) {
                var t = e.component, a = Object(p.a)(e, ["component"]);
                return r.a.createElement(m.b, Object.assign({}, a, {
                    render: function (e) {
                        return r.a.createElement(t, e)
                    }
                }))
            }, _ = function (e) {
                var t = e.component, a = Object(p.a)(e, ["component"]);
                return r.a.createElement(m.b, Object.assign({}, a, {
                    render: function (e) {
                        return f.a.check() ? r.a.createElement(m.a, {to: E.a.PRIVATE.ROOT}) : r.a.createElement(t, e)
                    }
                }))
            }, O = function (e) {
                var t = e.component, a = Object(p.a)(e, ["component"]);
                return r.a.createElement(m.b, Object.assign({}, a, {
                    render: function (e) {
                        return f.a.check() ? r.a.createElement(t, e) : r.a.createElement(m.a, {to: E.a.PUBLIC.LOGIN + "?ref_=" + encodeURIComponent(window.location.href)})
                    }
                }))
            }, S = (a(143), function (e) {
                Object(s.a)(a, e);
                var t = Object(u.a)(a);

                function a() {
                    return Object(l.a)(this, a), t.apply(this, arguments)
                }

                return Object(c.a)(a, [{
                    key: "render", value: function () {
                        return r.a.createElement("div", {className: "FOUR-ZERO-FOUR"}, r.a.createElement("div", {className: "flex-center position-ref full-height"}, r.a.createElement("div", {className: "code"}, "404"), r.a.createElement("div", {className: "message"}, "Not Found")))
                    }
                }]), a
            }(n.Component)), g = a(15), w = a(11), I = a(3), k = a(117), y = a(16), v = a(246), b = a(245), R = a(33),
            T = a(250), C = a(165), N = a(87), A = a.n(N), j = a(247), P = a(79), L = a(251), G = (a(144), a(47)),
            U = a(88), D = a(78), x = a(119), M = a(120), F = a(167), H = a(68), V = a.n(H), B = a(69), z = a.n(B),
            W = a(10), K = (a(128), a(83)), J = Object(k.a)((function (e) {
                return {
                    root: {display: "flex"},
                    Icon: {},
                    ListItem: Object(w.a)({}, e.breakpoints.up("sm"), {}),
                    link: {textDecoration: "none", color: "inherit"},
                    ListItemText: {fontSize: "15px"}
                }
            }));

        function Y(e) {
            var t = J();
            return r.a.createElement(d.b, {
                className: t.link,
                to: W.a.ROUTES.PRIVATE[e.ModuleCode],
                style: {border: 0},
                title: e.label,
                onClick: e.onMenuClick
            }, r.a.createElement(U.a, {
                button: !0,
                style: {borderRadius: e.DesktopDrawerOpen ? "5px" : 0}
            }, r.a.createElement(D.a, {className: t.Icon}, r.a.createElement(K.a, {Code: e.ModuleCode})), r.a.createElement(x.a, {
                primary: e.label,
                classes: {primary: t.ListItemText}
            })))
        }

        function X(e) {
            var t = J(), a = r.a.useState(!1), n = Object(g.a)(a, 2), i = n[0], o = n[1];
            return r.a.createElement(r.a.Fragment, null, r.a.createElement(U.a, {
                selected: i, onClick: function () {
                    o(!i)
                }, button: !0, style: {borderRadius: e.DesktopDrawerOpen ? "5px" : 0}
            }, r.a.createElement(D.a, {className: t.Icon}, r.a.createElement(K.a, {Code: e.ModuleCode})), r.a.createElement(x.a, {
                primary: e.label,
                classes: {primary: t.ListItemText}
            }), i ? r.a.createElement(V.a, null) : r.a.createElement(z.a, null)), r.a.createElement(F.a, {
                in: i,
                timeout: "auto",
                unmountOnExit: !0
            }, r.a.createElement(M.a, {
                component: "div",
                disablePadding: !0,
                dense: !1,
                style: {paddingLeft: "0px"}
            }, e.children)))
        }

        var Z = function e(t) {
                var a = t.data, n = t.DesktopDrawerOpen, i = t.onMenuClick, o = (new W.a.SERVICES.SessionUser).GetProfile();
                return r.a.createElement(r.a.Fragment, null, a.map((function (t, a) {
                    var l = t.Name, c = t.Code,
                        s = 1 === t.HasModuleAccess && (!1 !== t.Permissions && 1 === t.Permissions.ModuleAccess || !0 === t.Permissions && 1 === o.IsSupportUser),
                        u = t.ChildModules;
                    return r.a.createElement(r.a.Fragment, {key: a}, 1 === t.Level && s && r.a.createElement(r.a.Fragment, null, (null === u || 0 === u.length) && r.a.createElement(Y, {
                        label: l,
                        ModuleCode: c,
                        DesktopDrawerOpen: n,
                        onMenuClick: i
                    }), null !== u && u.length > 0 && s && r.a.createElement(X, {
                        label: l,
                        ModuleCode: c,
                        DesktopDrawerOpen: n,
                        onMenuClick: i
                    }, r.a.createElement(e, {data: u, DesktopDrawerOpen: n, onMenuClick: i}))))
                })))
            }, $ = function (e) {
                Object(s.a)(a, e);
                var t = Object(u.a)(a);

                function a(e) {
                    var n;
                    return Object(l.a)(this, a), (n = t.call(this, e)).state = {
                        ModulesLoaded: !1,
                        Modules: []
                    }, n.handleCloseDrawer = n.handleCloseDrawer.bind(Object(G.a)(n)), n
                }

                return Object(c.a)(a, [{
                    key: "handleCloseDrawer", value: function () {
                        this.props.onMenuClick()
                    }
                }, {
                    key: "LoadModules", value: function () {
                        var e = this;
                        setTimeout((function () {
                            var t = (new W.a.SERVICES.UAP).GetModules();
                            Array.isArray(t) && t.length > 0 ? e.setState({ModulesLoaded: !0, Modules: t}) : e.LoadModules()
                        }), 10)
                    }
                }, {
                    key: "componentDidMount", value: function () {
                        this.LoadModules()
                    }
                }, {
                    key: "render", value: function () {
                        return r.a.createElement("div", null, r.a.createElement(M.a, {dense: !1}, this.state.ModulesLoaded && this.state.Modules.length > 0 && r.a.createElement(Z, {
                            data: this.state.Modules,
                            DesktopDrawerOpen: this.props.DesktopDrawerOpen,
                            onMenuClick: this.handleCloseDrawer
                        })))
                    }
                }]), a
            }(n.Component), q = a(244), Q = a(252), ee = a(121), te = a(243), ae = a(113), ne = a.n(ae), re = a(114),
            ie = a.n(re), oe = a(237), le = a(198), ce = a(236), se = a(239), ue = a(240), de = a(242), me = a(238),
            pe = a(241), Ee = a(39), fe = a.n(Ee), he = a(233), _e = a(249), Oe = Object(k.a)((function (e) {
                return {
                    AlertPaper: {
                        display: "block",
                        width: "100% !important",
                        borderRadius: "0",
                        padding: "0",
                        textAlign: "center !important",
                        "& > *": {padding: "4px"}
                    }
                }
            }));
        var Se = function (e) {
            var t = Oe();
            return r.a.createElement(r.a.Fragment, null, r.a.createElement(_e.a, {
                className: t.AlertPaper,
                elevation: 0,
                variant: "filled",
                severity: e.type,
                icon: !1
            }, e.message))
        }, ge = Object(k.a)((function (e) {
            return {
                SideBarProfileCard: {display: "block", textAlign: "center", padding: "10px", marginTop: "20px"},
                link: {textDecoration: "none", cursor: "pointer", color: "inherit"},
                FullName: {
                    display: "block",
                    margin: "10px 10px 0 10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#474747"
                },
                Designation: {display: "block", fontSize: "13px", fontWeight: "bold", color: "#7c7c7c"}
            }
        }));

        function we(e) {
            var t = ge(), a = r.a.useState(null !== e.Avatar && "" !== e.Avatar ? e.Avatar : ""), n = Object(g.a)(a, 2),
                i = n[0];
            n[1];
            return r.a.createElement(r.a.Fragment, null, r.a.createElement("div", {className: t.SideBarProfileCard}, e.isLoading ? r.a.createElement(r.a.Fragment, null, r.a.createElement(he.a, {
                style: {display: "inline-block"},
                variant: "circle",
                animation: "wave",
                width: 55,
                height: 55
            }), r.a.createElement("div", {className: t.FullName}, r.a.createElement(he.a, {
                style: {display: "inline-block"},
                variant: "text",
                animation: "wave",
                width: 80,
                height: 25
            }))) : r.a.createElement(r.a.Fragment, null, r.a.createElement(Q.a, {
                style: {
                    display: "inline-block",
                    height: 55,
                    width: 55,
                    margin: 0
                }, alt: "", src: i
            }), r.a.createElement("div", {className: t.FullName}, r.a.createElement(d.b, {
                to: "/app/profile",
                className: t.link
            }, e.Name)))))
        }

        function Ie() {
            var e = ge(), t = r.a.useState(null), a = Object(g.a)(t, 2), n = a[0], i = a[1], o = function () {
                i(null)
            };
            return r.a.createElement(r.a.Fragment, null, r.a.createElement(C.a, {
                "aria-controls": "simple-menu",
                "aria-haspopup": "true",
                onClick: function (e) {
                    i(e.currentTarget)
                }
            }, r.a.createElement(Q.a, {
                style: {height: 30, width: 30, margin: 0},
                alt: "",
                src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            })), r.a.createElement(le.a, {
                id: "simple-menu",
                anchorEl: n,
                keepMounted: !0,
                open: Boolean(n),
                onClose: o
            }, r.a.createElement(d.b, {
                className: e.link,
                to: ""
            }, r.a.createElement(ce.a, {onClick: o}, "My Profile")), r.a.createElement(ce.a, {onClick: o}, "Change Password"), r.a.createElement(d.b, {
                className: e.link,
                to: W.a.ROUTES.PRIVATE.LOGOUT
            }, r.a.createElement(ce.a, {onClick: o}, "Logout"))))
        }

        function ke(e) {
            ge();
            var t = e.LicenseType, a = e.ActiveDays, n = e.AlertDays, i = a <= n || "DEMO" === t, o = "";
            o = "DEMO" === t ? "warning" : o, o = a <= n / 2 ? "error" : a <= n ? "warning" : o, o = "EXTENDED" === t ? "info" : o;
            var l = "";
            return l = ("DEMO" === t ? "Demo" : "License") + " Remaining - " + (l = 1 === a ? a + " day" : a + " days") + ("EXTENDED" === t ? " (Extended)" : ""), l = "DEMO_EXPIRED" === t ? "Demo Expired" : "EXPIRED" === t ? "License Expired" : l, r.a.createElement(r.a.Fragment, null, i && r.a.createElement(Se, {
                type: o,
                message: l
            }))
        }

        n.Component;
        var ye = W.a.SERVICES.LOCAL_SETTINGS, ve = Object(k.a)((function (e) {
            var t;
            return {
                root: {display: "flex"},
                drawer: Object(w.a)({}, e.breakpoints.up("sm"), {width: 250, flexShrink: 0}),
                appBar: Object(w.a)({
                    background: W.a.CONFIG.COLORS.PRIMARY,
                    boxShadow: "none"
                }, e.breakpoints.up("sm"), {color: "#ffffff", boxShadow: "none", zIndex: e.zIndex.drawer + 1}),
                Toolbar: Object(w.a)({}, e.breakpoints.up("sm"), {minHeight: 55}),
                menuButton: Object(w.a)({marginRight: e.spacing(2)}, e.breakpoints.up("sm"), {display: "none"}),
                DesktopMenuButton: Object(w.a)({marginRight: e.spacing(2)}, e.breakpoints.down("sm"), {display: "none"}),
                DrawerToolbar: Object(w.a)({paddingTop: 0}, e.breakpoints.up("sm"), {paddingTop: 55}),
                drawerPaper: Object(w.a)({
                    width: 290,
                    background: "#ffffff",
                    color: "inherit"
                }, e.breakpoints.up("sm"), {background: "#ffffff", color: "#000000"}),
                drawerOpen: {
                    marginTop: 55,
                    width: 250,
                    whiteSpace: "inherit",
                    transition: e.transitions.create("width", {easing: e.transitions.easing.sharp, duration: "0.07s"})
                },
                drawerClose: Object(w.a)({
                    marginTop: 55,
                    transition: e.transitions.create("width", {easing: e.transitions.easing.sharp, duration: "0.07s"}),
                    overflowX: "hidden",
                    whiteSpace: "nowrap",
                    width: e.spacing(7) + 1
                }, e.breakpoints.up("sm"), {width: e.spacing(7) + 1}),
                DesktopProfileInfoVisible: {display: "block", width: "100%"},
                DesktopProfileInfoHidden: {display: "none"},
                AppName: {color: "#ffffff", flexGrow: 1},
                Icon: Object(w.a)({color: "inherit"}, e.breakpoints.up("sm"), {color: "#ffffff"}),
                AppBanner: Object(w.a)({
                    background: "#282c34",
                    height: 150,
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#61dafb"
                }, e.breakpoints.up("sm"), {display: "none"}),
                DesktopDrawerList: Object(w.a)({}, e.breakpoints.up("sm"), {padding: "10px 15px"}),
                MainContent: (t = {
                    flexGrow: 1,
                    marginTop: 56,
                    padding: 0,
                    background: "transparent"
                }, Object(w.a)(t, e.breakpoints.up("sm"), {marginTop: 55}), Object(w.a)(t, "position", "relative"), Object(w.a)(t, "overflow", "hidden"), t),
                Content: Object(w.a)({
                    flexGrow: 1,
                    marginTop: 0,
                    padding: e.spacing(3)
                }, e.breakpoints.up("sm"), {marginTop: 0})
            }
        }));
        var be = Object(m.g)((function (e) {
            var t, a, n = e.container, i = ve(), o = Object(y.a)(), l = r.a.useState(!1), c = Object(g.a)(l, 2),
                s = c[0], u = c[1], d = r.a.useState(ye.DesktopSideDrawer()), m = Object(g.a)(d, 2), p = m[0], E = m[1],
                f = r.a.useState(!1), h = Object(g.a)(f, 2), _ = h[0], O = h[1], S = r.a.useState(!1),
                k = Object(g.a)(S, 2), N = k[0], G = k[1], U = r.a.useState(""), D = Object(g.a)(U, 2), x = D[0],
                M = D[1], F = r.a.useState(""), H = Object(g.a)(F, 2), V = H[0], B = H[1], z = r.a.useState(!1),
                K = Object(g.a)(z, 2), J = K[0], Y = K[1], X = r.a.useState(!1), Z = Object(g.a)(X, 2), Q = Z[0],
                ee = Z[1], te = r.a.useState(""), ae = Object(g.a)(te, 2), ne = ae[0], re = ae[1], ie = r.a.useState(0),
                oe = Object(g.a)(ie, 2), le = oe[0], ce = oe[1], se = r.a.useState(0), ue = Object(g.a)(se, 2),
                de = ue[0], me = ue[1], pe = function () {
                    u(!s), E(!1)
                },
                Ee = r.a.createElement("div", null, (s || p) && r.a.createElement(r.a.Fragment, null, r.a.createElement(we, {
                    Name: x,
                    Avatar: V,
                    isLoading: _
                }), r.a.createElement(q.a, null)), r.a.createElement($, {
                    onMenuClick: function () {
                        u(!1)
                    }, DesktopDrawerOpen: p
                }));
            return r.a.useEffect((function () {
                N || _ || (O(!0), function () {
                    var e = (new W.a.SERVICES.SessionUser).GetProfile();
                    G(!0), O(!1), M(e.FullName), B(e.ProfilePhoto)
                }()), Q || J || (Y(!0), function () {
                    var e = (new W.a.SERVICES.SystemLicense).GetSystemLicense();
                    ee(!0), Y(!1), re(e.license_status), ce(e.active_days), me(e.license_alert_days)
                }())
            })), r.a.createElement("div", {className: i.root + " NAVIGATION-FRAME"}, r.a.createElement(b.a, null), r.a.createElement(v.a, {
                position: "fixed",
                className: i.appBar
            }, r.a.createElement(j.a, {className: i.Toolbar}, r.a.createElement(C.a, {
                color: "inherit",
                "aria-label": "open drawer",
                edge: "start",
                onClick: pe,
                className: i.menuButton
            }, r.a.createElement(A.a, null)), r.a.createElement(C.a, {
                color: "inherit",
                "aria-label": "open drawer",
                edge: "start",
                onClick: function () {
                    E(!p), ye.DesktopSideDrawer(!p)
                },
                className: i.DesktopMenuButton
            }, r.a.createElement(A.a, null)), r.a.createElement(P.a, {
                className: i.AppName,
                variant: "h6",
                noWrap: !0
            }, "C&F"), r.a.createElement(Ie, null))), r.a.createElement("nav", null, r.a.createElement(T.a, {
                smUp: !0,
                implementation: "css"
            }, r.a.createElement(L.a, {
                container: n,
                variant: "temporary",
                anchor: "rtl" === o.direction ? "right" : "left",
                open: s,
                onClose: pe,
                classes: {paper: i.drawerPaper},
                ModalProps: {keepMounted: !0},
                onOpen: pe
            }, Ee)), r.a.createElement(T.a, {
                xsDown: !0,
                implementation: "css"
            }, r.a.createElement(R.a, {
                className: Object(I.a)(i.drawer, (t = {}, Object(w.a)(t, i.drawerOpen, p), Object(w.a)(t, i.drawerClose, !p), t)),
                classes: {paper: Object(I.a)((a = {}, Object(w.a)(a, i.drawerOpen, p), Object(w.a)(a, i.drawerClose, !p), a))},
                variant: "permanent"
            }, r.a.createElement("div", {className: Object(I.a)(i.drawer, Object(w.a)({}, i.DesktopDrawerList, p))}, Ee)))), r.a.createElement("main", {className: i.MainContent}, Q && "" !== ne && r.a.createElement(ke, {
                LicenseType: ne,
                ActiveDays: le,
                AlertDays: de
            }), r.a.createElement("div", {className: i.Content}, e.children)))
        })), Re = a(58), Te = a(248), Ce = a(115), Ne = a.n(Ce), Ae = a(37);
        var je = function (e) {
            var t = r.a.useState(!1), a = Object(g.a)(t, 2), n = a[0], i = a[1], o = r.a.useState(!1),
                l = Object(g.a)(o, 2), c = l[0], s = l[1], u = r.a.useState(!0), d = Object(g.a)(u, 2), m = d[0],
                p = d[1];
            return r.a.createElement(r.a.Fragment, null, n && r.a.createElement(Se, {
                type: "warning",
                message: "Connecting..."
            }), c && r.a.createElement(Se, {
                type: "success",
                message: "Connected"
            }), m && r.a.createElement(Se, {
                type: "error",
                message: "Network Error"
            }), r.a.createElement("div", {
                style: {
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "85vh"
                }
            }, m && r.a.createElement(Te.a, {
                variant: "contained",
                style: {background: W.a.CONFIG.COLORS.PRIMARY, color: "#ffffff"},
                onClick: function () {
                    if (e.WindowReload) return window.location.reload(), !1;
                    i(!0), p(!1), fe()({
                        method: "get",
                        url: Ae.a.URL.API.ROOT + "/___server",
                        headers: {Authorization: "Bearer ".concat(f.a.getToken())}
                    }).then((function (e) {
                        !0 === e.data.success ? (i(!1), s(!0), p(!1), setTimeout((function () {
                            (new W.a.SERVICES.NETWORK_FAILURE).SetError(!1)
                        }), 1500)) : alert("Something went wrong in the api!")
                    })).catch((function (e) {
                        i(!1), s(!1), p(!0)
                    }))
                }
            }, r.a.createElement(Ne.a, null), "\xa0 Retry")))
        }, Pe = (a(84), function (e) {
            Object(s.a)(a, e);
            var t = Object(u.a)(a);

            function a(e) {
                var n;
                return Object(l.a)(this, a), (n = t.call(this, e)).state = {
                    ServicesLoaded: !1,
                    NetworkError: !1,
                    RefreshNetworkShouldReloadWindow: !0
                }, n.NetWorkFailure = W.a.SERVICES.NETWORK_FAILURE, n.Auth = W.a.SERVICES.AUTH, n.SessionUser = new W.a.SERVICES.SessionUser(n.props), n.SystemLicense = new W.a.SERVICES.SystemLicense(n.props), n.UAP = new W.a.SERVICES.UAP(n.props), n.CheckPreparation = n.CheckPreparation.bind(Object(G.a)(n)), n
            }

            return Object(c.a)(a, [{
                key: "NetworkStatusCheck", value: function () {
                    var e = this;
                    !0 === (new W.a.SERVICES.NETWORK_FAILURE).GetStatus() ? this.setState({NetworkError: !0}) : this.setState({NetworkError: !1}), setTimeout((function () {
                        e.NetworkStatusCheck()
                    }), 700)
                }
            }, {
                key: "CheckPreparation", value: function () {
                    var e = this;
                    return this.Auth.check() ? this.UAP.IsReady() && this.SessionUser.IsReady() && this.SystemLicense.IsReady() ? (this.setState({
                        ServicesLoaded: !0,
                        RefreshNetworkShouldReloadWindow: !1
                    }), !0) : void setTimeout((function () {
                        e.CheckPreparation()
                    }), 100) : (this.props.history.replace(W.a.ROUTES.PUBLIC.LOGIN), !1)
                }
            }, {
                key: "componentDidMount", value: function () {
                    this.Auth.check() ? (this.SessionUser.Initialize(), this.SessionUser.TurnOnGuard(), this.SystemLicense.Initialize(), this.SystemLicense.TurnOnGuard(), this.UAP.Initialize(), this.UAP.TurnOnGuard(), new this.Auth(this.props).TurnOnGuard(), this.CheckPreparation()) : this.props.history.replace(W.a.ROUTES.PUBLIC.LOGIN);
                    (new this.NetWorkFailure).Initialize(), this.NetworkStatusCheck()
                }
            }, {
                key: "render", value: function () {
                    return r.a.createElement(r.a.Fragment, null, this.state.NetworkError && r.a.createElement(je, {WindowReload: this.state.RefreshNetworkShouldReloadWindow}), this.state.NetworkError ? null : this.state.ServicesLoaded ? this.props.children : r.a.createElement(Re.a, {title: "Preparing background services..."}))
                }
            }]), a
        }(n.Component)), Le = Object(m.g)(Pe), Ge = Object(n.lazy)((function () {
            return Promise.all([a.e(0), a.e(6)]).then(a.bind(null, 319))
        })), Ue = Object(n.lazy)((function () {
            return Promise.all([a.e(0), a.e(1), a.e(14)]).then(a.bind(null, 320))
        })), De = Object(n.lazy)((function () {
            return Promise.all([a.e(0), a.e(1), a.e(13)]).then(a.bind(null, 321))
        })), xe = Object(n.lazy)((function () {
            return Promise.all([a.e(0), a.e(7)]).then(a.bind(null, 322))
        })), Me = Object(n.lazy)((function () {
            return a.e(8).then(a.bind(null, 317))
        })), Fe = Object(n.lazy)((function () {
            return Promise.all([a.e(0), a.e(5), a.e(9)]).then(a.bind(null, 316))
        })), He = Object(n.lazy)((function () {
            return a.e(12).then(a.bind(null, 272))
        })), Ve = Object(n.lazy)((function () {
            return a.e(10).then(a.bind(null, 313))
        })), Be = Object(n.lazy)((function () {
            return a.e(11).then(a.bind(null, 314))
        })), ze = function (e) {
            Object(s.a)(a, e);
            var t = Object(u.a)(a);

            function a() {
                return Object(l.a)(this, a), t.apply(this, arguments)
            }

            return Object(c.a)(a, [{
                key: "render", value: function () {
                    return r.a.createElement(d.a, null, r.a.createElement(m.d, null, r.a.createElement(O, {
                        path: E.a.PRIVATE.ROOT,
                        component: function () {
                            return r.a.createElement(Le, null, r.a.createElement(be, null, r.a.createElement(n.Suspense, {fallback: r.a.createElement(Re.a, {height: "70vh"})}, r.a.createElement(O, {
                                exact: !0,
                                path: E.a.PRIVATE.ROOT,
                                component: Me
                            }), r.a.createElement(O, {
                                path: E.a.PRIVATE.LOGOUT,
                                component: Ve
                            }), r.a.createElement(O, {
                                exact: !0,
                                path: E.a.PRIVATE.USER_ROLE,
                                component: Fe
                            }), r.a.createElement(O, {exact: !0, path: E.a.PRIVATE.ROLE_PERMISSIONS, component: He}))))
                        }
                    }), r.a.createElement(n.Suspense, {fallback: r.a.createElement(Re.a, null)}, r.a.createElement(_, {
                        exact: !0,
                        path: E.a.ROOT,
                        component: Ge
                    }), r.a.createElement(h, {
                        exact: !0,
                        path: E.a.COMMON.REACT,
                        component: Be
                    }), r.a.createElement(_, {
                        exact: !0,
                        path: E.a.PUBLIC.LOGIN,
                        component: Ge
                    }), r.a.createElement(_, {
                        exact: !0,
                        path: E.a.PUBLIC.REGISTER,
                        component: Ue
                    }), r.a.createElement(_, {
                        exact: !0,
                        path: E.a.PUBLIC.RECOVER_PASSWORD,
                        component: De
                    }), r.a.createElement(_, {
                        exact: !0,
                        path: E.a.PUBLIC.SUPPORT_LOGIN + "/:cid",
                        component: xe
                    })), r.a.createElement(h, {exact: !0, path: "*", component: S})))
                }
            }]), a
        }(n.Component), We = (a(163), function (e) {
            Object(s.a)(a, e);
            var t = Object(u.a)(a);

            function a() {
                return Object(l.a)(this, a), t.apply(this, arguments)
            }

            return Object(c.a)(a, [{
                key: "render", value: function () {
                    return r.a.createElement(ze, null)
                }
            }]), a
        }(n.Component));
        Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
        o.a.render(r.a.createElement(r.a.StrictMode, null, r.a.createElement(We, null)), document.getElementById("root")), "serviceWorker" in navigator && navigator.serviceWorker.ready.then((function (e) {
            e.unregister()
        })).catch((function (e) {
            console.error(e.message)
        }))
    }, 21: function (e, t, a) {
        "use strict";
        a.d(t, "a", (function () {
            return n
        }));
        var n = {
            ROOT: "/",
            COMMON: {ROOT: "/", REACT: "/react", ABOUT: "/about"},
            PUBLIC: {
                ROOT: "/",
                LOGIN: "/login",
                RECOVER_PASSWORD: "/recover_password",
                REGISTER: "/register",
                SUPPORT_LOGIN: "/support/login"
            },
            PRIVATE: {
                ROOT: "/app",
                DASHBOARD: "/app",
                MY_PROFILE: "/app/my-profile",
                ROLE_PERMISSIONS: "/app/role_permissions",
                LOGOUT: "/app/logout",
                USER_ROLE: "/app/uap/user-role"
            }
        }
    }, 23: function (e, t, a) {
        "use strict";
        a.d(t, "a", (function () {
            return E
        }));
        var n = a(12), r = a(13), i = a(19), o = a(18), l = a(0), c = a.n(l), s = a(32), u = a(116), d = a(21),
            m = (a(136), new u.a), p = window.localStorage, E = function (e) {
                Object(i.a)(a, e);
                var t = Object(o.a)(a);

                function a() {
                    return Object(n.a)(this, a), t.apply(this, arguments)
                }

                return Object(r.a)(a, [{
                    key: "TurnOnGuard", value: function () {
                        var e;
                        if (1 === s.a.SERVICES.AUTH.TOKEN_STORAGE ? e = m.get("_token") : 2 === s.a.SERVICES.AUTH.TOKEN_STORAGE && (e = p.getItem("_token")), "" === e || null === e || "undefined" === typeof e) return this.props.history.push(d.a.PUBLIC.LOGIN), !1;
                        var t = this;
                        setTimeout((function () {
                            t.TurnOnGuard()
                        }), 100)
                    }
                }], [{
                    key: "set", value: function (e) {
                        e = "undefined" === typeof e ? "" : e, 1 === s.a.SERVICES.AUTH.TOKEN_STORAGE ? m.set("_token", e, {
                            path: "/",
                            sameSite: "strict"
                        }) : 2 === s.a.SERVICES.AUTH.TOKEN_STORAGE && p.setItem("_token", e)
                    }
                }, {
                    key: "getToken", value: function () {
                        return 1 === s.a.SERVICES.AUTH.TOKEN_STORAGE ? m.get("_token") : 2 === s.a.SERVICES.AUTH.TOKEN_STORAGE ? p.getItem("_token") : void 0
                    }
                }, {
                    key: "check", value: function () {
                        var e;
                        return 1 === s.a.SERVICES.AUTH.TOKEN_STORAGE ? e = m.get("_token") : 2 === s.a.SERVICES.AUTH.TOKEN_STORAGE && (e = p.getItem("_token")), "" !== e && null !== e && "undefined" !== typeof e
                    }
                }, {
                    key: "remove", value: function (e) {
                        return 1 === s.a.SERVICES.AUTH.TOKEN_STORAGE ? document.cookie.split(";").forEach((function (e) {
                            document.cookie = e.replace(/^ +/, "").replace(/=.*/, "=;expires=" + (new Date).toUTCString() + ";path=/")
                        })) : 2 === s.a.SERVICES.AUTH.TOKEN_STORAGE && p.removeItem("_token"), "undefined" !== typeof e && e.history.push(d.a.PUBLIC.LOGIN), !0
                    }
                }]), a
            }(c.a.Component)
    }, 32: function (e, t, a) {
        "use strict";
        a.d(t, "a", (function () {
            return l
        }));
        var n = a(61), r = a.n(n), i = a(109), o = a.n(i), l = {
            COLORS: {
                PRIMARY: r.a[600],
                WHITE: "#ffffff",
                BLACK: "#000000",
                PROGRESS_BAR: {LINEAR: {PRIMARY: r.a[100], BAR: r.a[600]}},
                ACTION_BTN: {SUCCESS: r.a[600], DANGER: o.a[500], WARNING: ""}
            }, MODULE: ["USER_ROLE", "HOME"], SERVICES: {AUTH: {TOKEN_STORAGE: 1}}
        }
    }, 37: function (e, t, a) {
        "use strict";
        a.d(t, "a", (function () {
            return n
        }));
        var n = {
            URL: {API: {ROOT: "http://localhost:8000/api"}, FRONT_END: {ROOT: "http://localhost:3000"}},
            ABOUT_APP: {NAME: "C&F", DESCRIPTION: "", VERSION: "1.0", RELEASE_NOTE: ""},
            AUTHOR: {SIGNATURE: "", URL: ""}
        }
    }, 58: function (e, t, a) {
        "use strict";
        var n = a(0), r = a.n(n), i = a(117), o = a(5), l = a(171), c = a(10), s = Object(i.a)((function (e) {
            return {
                root: {
                    width: "100%",
                    "& > * + *": {marginTop: e.spacing(2)},
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center"
                }
            }
        })), u = Object(o.a)((function (e) {
            return {
                colorPrimary: {background: c.a.CONFIG.COLORS.PROGRESS_BAR.LINEAR.PRIMARY},
                bar: {background: c.a.CONFIG.COLORS.PROGRESS_BAR.LINEAR.BAR}
            }
        }))(l.a);
        t.a = function (e) {
            var t = s(), a = e.title, n = e.height;
            return a = "" === a || "undefined" === typeof a ? "Loading" : a, n = "" === n || "undefined" === typeof n ? "90vh" : n, r.a.createElement("div", {
                className: t.root,
                style: {height: n}
            }, r.a.createElement("div", null, r.a.createElement("div", {
                style: {
                    width: "100%",
                    marginBottom: "0px",
                    textAlign: "center"
                }
            }, a), r.a.createElement("div", {
                style: {
                    width: "100%",
                    marginTop: "0px",
                    textAlign: "center"
                }
            }, r.a.createElement(u, {style: {width: "100px", display: "inline-block", margin: 0}}))))
        }
    }, 83: function (e, t, a) {
        "use strict";
        var n = a(0), r = a.n(n), i = a(65), o = a.n(i);
        t.a = function (e) {
            return "HOME" === e.Code ? r.a.createElement(o.a, null) : r.a.createElement(r.a.Fragment, null)
        }
    }, 84: function (e, t, a) {
        "use strict";
        a.d(t, "a", (function () {
            return i
        }));
        var n = a(12), r = a(13), i = function () {
            function e() {
                Object(n.a)(this, e), this.__identifier = "__network_failure"
            }

            return Object(r.a)(e, [{
                key: "Initialize", value: function () {
                    return window.localStorage.removeItem(this.__identifier), !0
                }
            }, {
                key: "SetError", value: function () {
                    var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    return !0 === e ? window.localStorage.setItem(this.__identifier, "1") : window.localStorage.removeItem(this.__identifier), !0
                }
            }, {
                key: "GetStatus", value: function () {
                    var e = window.localStorage.getItem(this.__identifier);
                    return 1 === parseInt(e)
                }
            }]), e
        }()
    }
}, [[131, 3, 4]]]);