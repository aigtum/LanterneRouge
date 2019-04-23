/**
 * Different track configurations
 */

// straight
var a = ["s", "s", "s", "s", "s", "_"];
var b = ["_", "_", "_", "_", "_", "_"];
var c = ["_", "_", "_", "_", "_", "_"];
var d = ["_", "_", "_", "_", "_", "_"];
var f = ["_", "_", "_", "_", "_", "_"];
var l = ["_", "_", "_", "_", "_", "_"];
var m = ["_", "_", "_", "_", "_", "_"];
var n = ["_", "_", "_", "_", "_", "_"];
var u = ["_", "f", "f", "f", "f", "f"];
var A = ["s", "s", "s", "s", "_", "_"];
var B = ["d", "d", "d", "d", "_", "_"];
var C = ["_", "_", "_", "u", "u", "u"];
var D = ["u", "u", "u", "u", "u", "d"];
var F = ["d", "d", "d", "_", "_", "_"];
var L = ["u", "u", "u", "d", "d", "d"];
var M = ["_", "_", "u", "u", "u", "u"];
var N = ["u", "u", "u", "u", "u", "u"];
var U = ["u", "u", "f", "f", "f", "f"];


// bend right
var j = ["_", "_"];
var k = ["_", "_"];
var o = ["_", "_"];
var p = ["_", "_"];
var r = ["_", "_"];
var s = ["_", "_"];
var J = ["_", "_"];
var K = ["u", "u"];
var O = ["u", "u"];
var P = ["d", "d"];
var R = ["u", "u"];
var S = ["_", "_"];


// bend left
var e = ["_", "_"];
var g = ["_", "_"];
var h = ["_", "_"];
var i = ["_", "_"];
var q = ["_", "_"];
var t = ["_", "_"];
var E = ["u", "u"];
var G = ["u", "u"];
var H = ["d", "d"];
var I = ["_", "_"];
var Q = ["u", "u"];
var T = ["_", "_"];

var avenue_corso_paseo = [
    ["Avenue Corso Paseo"],
    [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u]
];
var firenze_milano = [
    ["Firenze-Milano"],
    [a, b, c, g, i, D, H, q, n, t, m, K, O, L, r, e, p, J, s, f, u]
];
var la_haute_montagne = [
    ["La Haute Montagne"],
    [a, b, c, f, i, m, e, t, K, G, L, H, J, s, d, o, p, R, Q, N, U]
];
var le_col_du_ballon = [
    ["Le Col du Ballon"],
    [A, n, L, H, g, c, e, q, t, r, M, B, o, i, p, j, D, F, k, S, u]
];
var ronde_van_welvegen = [
    ["Ronde van Welvelgen"],
    [a, b, c, m, g, f, t, e, q, o, n, L, P, j, k, I, D, H, r, S, u]
];
var la_classisissima = [
    ["La Classisissima"],
    [A, e, b, Q, R, N, H, P, c, g, i, k, D, F, s, L, o, j, m, t, u]
];
var classique_davril = [
    ["Classique d'Avril"],
    [A, b, J, i, L, c, G, H, t, d, f, p, k, m, n, r, q, E, o, S, u]
];
var sprint_de_montagne = [
    ["Sprint de Montagne"],
    [a, f, C, O, L, i, b, N, D, P, S, g, T, k, e, r, j, Q, H, m, u]
];
var vittel = [
    ["Vittel - La Planche des Belles Filles"],
    [a, I, H, d, T, F, l, j, s, M, N, P, B, C, O, R, K, G, Q, E, U]
];
var dole = [
    ["Dole - Stations des Rousses"],
    [a, j, f, M, E, C, T, K, s, q, R, L, P, H, i, D, B, N, O, g, u]
];
var nantua = [
    ["Nantua - Chambery"],
    [a, N, P, H, t, i, m, O, E, L, K, R, B, S, J, C, Q, D, F, g, u]
];
var pau = [
    ["Pau - Payragudes"],
    [a, t, s, m, C, J, d, i, f, N, B, E, R, K, O, L, P, H, G, Q, U]
];
var asger = [
    ["Col d'Asger"],
    [a, c, P, H, F, B, l, j, I, d, K, Q, R, s, m, t, G, E, O, N, U]
];
var entre_cotes = [
    ["L'Entre-Côtes"],
    [a, d, e, N, i, b, j, p, O, K, R, L, t, C, F, S, q, M, h, u]
];



var avaliableTracks = [
    firenze_milano,
    ronde_van_welvegen,
    la_haute_montagne,
    le_col_du_ballon,
    la_classisissima,
    classique_davril,
    sprint_de_montagne,
    vittel,
    dole,
    nantua,
    pau,
    asger,
    entre_cotes
];
var chosenTracks = [];