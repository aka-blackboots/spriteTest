import { MeshLambertMaterial } from 'three';
import { BoxHelper } from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/css2drenderer';
import { IfcViewerAPI } from 'web-ifc-viewer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container});

async function loadIfc(url) {
    await viewer.IFC.setWasmPath("../../../");
    const model = await viewer.IFC.loadIfcUrl(url);
    viewer.shadowDropper.renderShadow(model.modelID);

    const config = {
        scene: viewer.context.scene,
        modelID: 0,
        ids: [6518],
        customID: "23"
    }
  
    const subset = viewer.IFC.loader.ifcManager.createSubset(config);
    subset.geometry.computeBoundingSphere();

    const helper = new BoxHelper(subset, 0xffff00);
    viewer.context.scene.add(helper);

    console.log(subset)

    const el = document.createElement('div')
    el.innerHTML = 'hello world'
    var obj = new CSS2DObject(el)

    obj.position.set(subset.geometry.boundingBox.min.x, subset.geometry.boundingBox.max.y, subset.geometry.boundingBox.min.z)
    subset.add(obj)
}


















loadIfc('../../../IFC/01.ifc');

window.onmousemove = () => viewer.IFC.selector.prePickIfcItem(true);

window.onclick = async () => {
    const {modelID, id} = await viewer.IFC.selector.pickIfcItem(true);
    const props = await viewer.IFC.getProperties(modelID, id, true, false);
    console.log(props);
}

window.ondblclick = () => viewer.IFC.selector.highlightIfcItem();

window.onkeydown = (event) => {
    if(event.code === 'KeyC') {
        viewer.IFC.selector.unpickIfcItems();
        viewer.IFC.selector.unHighlightIfcItems();
    }
}

document.getElementById('express_22492')
.addEventListener('click', () => {
    viewer.IFC.selector.pickIfcItemsByID(0, [22492], true);
})