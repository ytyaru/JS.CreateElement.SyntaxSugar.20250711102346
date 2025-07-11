window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    const author = 'ytyaru';
    van.add(document.querySelector('main'), 
        van.tags.h1(van.tags.a({href:`https://github.com/${author}/JS.CreateElement.SyntaxSugar.20250711102346/`}, 'CreateElement.SyntaxSugar')),
        van.tags.p('document.createElement()の糖衣構文を作る（VanJSのvan.tagsのみでstateがなくreactive機能がない版）'),
//        van.tags.p('Create a sugar coating syntax for document.createElement() (VanJS's van.tags only, no state and no reactive function)'),
    );
    van.add(document.querySelector('footer'),  new Footer('ytyaru', '../').make());

    const a = new Assertion();
    a.t(()=>'Dom' in window);
    a.t(()=>'tags' in Dom);
    a.t(()=>{
        const el = Dom.tags.div({name:'なんか'});
        return 'DIV'===el.tagName && el.hasAttribute('name') && 'なんか'===el.getAttribute('name');
    });
    a.t(()=>{
        let count = 0;
        const el = Dom.tags.div({name:'なんか', listeners:[['click', (e)=>++count, false]]});
        console.log(el)
        return 'DIV'===el.tagName && el.hasAttribute('name') && 'なんか'===el.getAttribute('name')
            && 1===el._listeners.length
        ;
    });
    a.t(true);
    a.f(false);
    a.e(TypeError, `msg`, ()=>{throw new TypeError(`msg`)});
    a.fin();
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

