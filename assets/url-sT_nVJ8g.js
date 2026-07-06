function r(n){if(!n)return"";if(/^https?:\/\//.test(n))return n;const o=window.location.pathname.replace(/[^/]*$/,"");return`${window.location.origin}${o}#${n}`}export{r as f};
