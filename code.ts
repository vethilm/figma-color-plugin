
figma.showUI(__html__, {width:320,height:300, title: "color pallete generator"});

//listen for message
figma.ui.onmessage = msg => {
    if(msg.type === 'actionStart'){
        figma.closePlugin('Colors generated Succesfully');
    }
    else if(msg.type==='exit'){
        figma.closePlugin();
    }
}
