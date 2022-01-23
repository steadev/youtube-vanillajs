export const appendCss = (path) => {
    const link = document.createElement( "link" );
    link.href = path;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    document.getElementsByTagName( "head" )[0].appendChild( link );
}