
figma.showUI(__html__, {width:320,height:300, title: "color pallete generator"});

//listen for message
figma.ui.onmessage = msg => {
    if(msg.type === 'start'){

        const {colorValue, colorLabel, number} = msg.formDataObj;

        const parentFrame = figma.createFrame();
        parentFrame.name = colorLabel +' Colors'
        
        //add autolayout
        parentFrame.layoutMode = 'HORIZONTAL';
        //padding
        parentFrame.paddingLeft = 32;
        parentFrame.paddingRight = 32;
        parentFrame.paddingBottom = 32;
        parentFrame.paddingTop = 32;

        parentFrame.itemSpacing=32;

        parentFrame.primaryAxisSizingMode="AUTO";
        parentFrame.counterAxisSizingMode="AUTO";

        // generate color list

        for(let i = 0;i<number;i++){
            //create ellipse shape
            const colorNode = figma.createEllipse();
            colorNode.name = colorLabel+' '+(100-i*10)

            colorNode.resize(100,100);

            // convert hex to rgb and assign to ellipse
            const RGB = hexToRGB(colorValue)
            console.log(RGB)
            colorNode.fills = [ {type:'SOLID', color : {r : RGB[0]/255, g : RGB[1]/255 , b : RGB[2]/255 }}]


            colorNode.opacity = (100-i*10)/100
            parentFrame.appendChild(colorNode);
            
        }
        const selectFrame : FrameNode[] = []
        selectFrame.push(parentFrame)
        figma.currentPage.selection = selectFrame
        figma.viewport.scrollAndZoomIntoView(selectFrame)

        figma.closePlugin('Colors generated Succesfully');
    }
    else if(msg.type==='exit'){
        figma.closePlugin();
    }
}


function hexToRGB(hex: string){
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if(result != null){
        return [
            parseInt(result[1],16),
            parseInt(result[2],16),
            parseInt(result[3],16)
        ] 
    }
   else return [0,0,0]
}