export const manifest = {
  screens: {
    scr_i8cv3t: { name: "Landing", route: "/", position: { "x": 160, "y": 1820 } },
    scr_9td02w: { name: "Login", route: "/login", position: { "x": 1560, "y": 1820 } },
    scr_kkgvmn: { name: "Register", route: "/register", position: { "x": 2960, "y": 1820 } },
    scr_v8n7p1: { name: "Farmer Dashboard", route: "/farmer", position: { "x": 160, "y": 3800 } },
    scr_2c8uwv: { name: "AI Advisory", route: "/advisory", position: { "x": 1560, "y": 3800 } },
    scr_34rzil: { name: "Marketplace", route: "/marketplace", position: { "x": 160, "y": 5780 } },
    scr_co23gk: { name: "Product Details", route: "/marketplace/1", position: { "x": 1560, "y": 5780 } },
    scr_05nx6s: { name: "Weather", route: "/weather", position: { "x": 2960, "y": 3800 } },
    scr_d5yg3v: { name: "Expert Consultation", route: "/experts", position: { "x": 5760, "y": 3800 } },
    scr_3oh9eb: { name: "Notifications", route: "/notifications", position: { "x": 0, "y": 0 }, isDefaultRow: true },
    scr_zlrmhb: { name: "Price Intelligence", route: "/prices", position: { "x": 4360, "y": 3800 } },
    scr_qzdztl: { name: "Buyer Dashboard", route: "/buyer", position: { "x": 1400, "y": 0 }, isDefaultRow: true },
    scr_modlp2: { name: "Admin Dashboard", route: "/admin", position: { "x": 2800, "y": 0 }, isDefaultRow: true }
  },
  sections: {
    sec_znni9u: { name: "Authentication & Landing", x: 0, y: 1600, width: 4320, height: 1180 },
    sec_7sepen: { name: "Farmer Portal", x: 0, y: 3580, width: 7120, height: 1180 },
    sec_m4v54t: { name: "Marketplace", x: 0, y: 5560, width: 2920, height: 1180 }
  },
  layers: [
  { kind: "screen", id: "scr_3oh9eb" },
  { kind: "screen", id: "scr_qzdztl" },
  { kind: "screen", id: "scr_modlp2" },
  { kind: "section", id: "sec_znni9u", children: [
    { kind: "screen", id: "scr_i8cv3t" },
    { kind: "screen", id: "scr_9td02w" },
    { kind: "screen", id: "scr_kkgvmn" }]
  },
  { kind: "section", id: "sec_7sepen", children: [
    { kind: "screen", id: "scr_v8n7p1" },
    { kind: "screen", id: "scr_2c8uwv" },
    { kind: "screen", id: "scr_05nx6s" },
    { kind: "screen", id: "scr_zlrmhb" },
    { kind: "screen", id: "scr_d5yg3v" }]
  },
  { kind: "section", id: "sec_m4v54t", children: [
    { kind: "screen", id: "scr_34rzil" },
    { kind: "screen", id: "scr_co23gk" }]
  }]

};