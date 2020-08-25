export default function(propObj) {
	let nodeElement = document.createElement(propObj.nodeName);
	nodeElement.textContent = propObj.textContent;
	if(propObj.class){
		nodeElement.classList = propObj.class;
	}
	if(propObj.attributeName){
		if (!propObj.attributeValue){
			propObj.attributeValue = "";
		}	
		nodeElement.setAttribute(propObj.attributeName, propObj.attributeValue);
	}
	

	return nodeElement;
  };