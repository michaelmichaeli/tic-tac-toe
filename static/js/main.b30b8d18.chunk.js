(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{12:function(t,n,e){},14:function(t,n,e){"use strict";e.r(n);var c=e(1),r=e.n(c),i=e(7),a=e.n(i),l=(e(12),e(5)),u=e(2);function s(t){for(var n=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],e=0;e<n.length;e++){var c=Object(u.a)(n[e],3),r=c[0],i=c[1],a=c[2];if(t[r]&&t[r]===t[i]&&t[r]===t[a])return t[r]}return-1===t.findIndex((function(t){return null===t}))?"Tie":null}var o={X:-10,O:10,Tie:0};function j(t,n){var e=s(t);if(null!==e)return o[e];if(n){for(var c=-1/0,r=0;r<=8;r++)if(null===t[r]){t[r]="O";var i=j(t,!1);t[r]=null,c=Math.max(i,c)}return c}for(var a=1/0,l=0;l<=8;l++)if(null===t[l]){t[l]="X";var u=j(t,!0);t[l]=null,a=Math.min(u,a)}return a}var b=e(0),O=function(t){var n=t.value,e=t.onClick,c=n?"squares ".concat(n):"squares";return Object(b.jsx)("button",{onClick:e,className:c,children:n})},f=function(t){var n=t.squares,e=t.onClick;return Object(b.jsx)("div",{className:"board",children:n.map((function(t,n){return Object(b.jsx)(O,{value:t,onClick:function(){return e(n)}},n)}))})},d=function(){var t=Object(c.useState)([Array(9).fill(null)]),n=Object(u.a)(t,2),e=n[0],r=n[1],i=Object(c.useState)(0),a=Object(u.a)(i,2),o=a[0],O=a[1],d=Object(c.useState)(!0),h=Object(u.a)(d,2),v=h[0],x=h[1],m=Object(c.useState)(!0),k=Object(u.a)(m,2),p=k[0],C=k[1],g=s(e[o]),N=v?"X":"O",S=function(t,n){n[function(t){for(var n,e=t,c=-1/0,r=0;r<=8;r++)if(null===e[r]){e[r]="O";var i=j(e,0);e[r]=null,i>c&&(c=i,n=r)}return n}(n)]="O",r([].concat(Object(l.a)(t),[n])),O(t.length)},T=function(t){O(t),x(t%2===0)},q=function(){return e.map((function(t,n){var e=n?"Go to Move #".concat(n):"Go to Start";return Object(b.jsx)("li",{children:Object(b.jsx)("button",{onClick:function(){return T(n)},children:e})},n)})).slice(0,-1)};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("h1",{children:"React Tic Tac Toe - With Ai"}),Object(b.jsx)("div",{className:"settings",children:Object(b.jsxs)("button",{onClick:function(){C(!p),T(0)},children:["Ai is ",p?"on":"off"]})}),Object(b.jsx)("div",{className:"board-container",children:Object(b.jsx)(f,{squares:e[o],onClick:function(t){var n=e.slice(0,o+1),c=n[o],i=Object(l.a)(c);g||i[t]||(i[t]=N,r([].concat(Object(l.a)(n),[i])),O(n.length),p&&null===s(i)?S(n,i):x(!v))}})}),Object(b.jsxs)("div",{className:"info-wrapper",children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"History"}),Object(b.jsx)("ul",{children:Object(b.jsx)(q,{})})]}),Object(b.jsx)("h3",{children:g?"Winner: "+g:"Next Player: "+N})]})]})};a.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(d,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.b30b8d18.chunk.js.map