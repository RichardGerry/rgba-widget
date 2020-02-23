(function () {
	
	let rgbaSetterElements
	let rgbaSelectorElements = []
	let rgbaSelectorElementsProp
	
	function $(selector, context){
		context = context || document
		return context.querySelector(selector)
	}
	function $$(selector, context){
		context = context || document
		try{
			return [...context.querySelectorAll(selector)]
		}
		catch{}
	}
	function onRangeInput(evt){
		setSelectorElementsToRGBA()
	}
	function setSelectorElementsToRGBA(){
		rgbaSelectorElements.forEach(elem=> elem.style[rgbaSelectorElementsProp] = getRGBAStyle())
	}
	function getRGBAStyle(){
		let colors = rgbaSetterElements.map(elem=>$("input[type='range']",elem)).map(elem=> elem.value)
		return "rgba(" + colors.join(",") + ")"
	}
	function setRGBAFormOutput(evt){
		evt.target.form.rgbaOutput.value = getRGBAStyle()
	}
	function onInputSelector(evt){
		if(evt.target.value != ".") rgbaSelectorElements = $$(evt.target.value)
	}
	function onInputSelectorProperty(evt){
		let inputProperty = evt.target.value
		rgbaSelectorElementsProp = null
		if(propertyExists(inputProperty) && propertyAcceptsRGBA(inputProperty)){
			rgbaSelectorElementsProp = inputProperty
		}
	}
	function propertyExists(property){
		return property in document.documentElement.style
	}
	function propertyAcceptsRGBA(property){
		let dummy = document.createElement("div")
		dummy.style[property] = "rgba(255,255,255,1)"
		return !!dummy.style[property]
	}
	function createRGBAWidget(){
		let parentForm = document.createElement("form")
		parentForm.id = "rgba-widget"
		document.body.appendChild(parentForm)
		createSelectorTextInputs(parentForm)
		createRGBAOutput(parentForm)
		createColorSetters(parentForm)
		createAlphaSetter(parentForm)
	}
	function createAlphaSetter(parent){
		let input = document.createElement("input")
		input.type = "range"
		input.min = "0"
		input.max = "1"
		input.step = ".01"
		input.value = "1"
		let div = document.createElement("div")
		div.className = "rgba-setter rgba-alpha"
		div.style.setProperty("--color","gray")
		div.appendChild(input)
		parent.appendChild(div)
	}
	function createColorSetters(parent){
		["red", "green", "blue"].forEach(color=>{
			let input = document.createElement("input")
			input.type = "range"
			input.min = "0"
			input.max = "255"
			input.value = "128"
			let div = document.createElement("div")
			div.className = "rgba-setter"
			div.style.setProperty("--color",color)
			div.appendChild(input)
			parent.appendChild(div)
		})
	}
	function createRGBAOutput(parent){
		let output = document.createElement("output")
		output.name = "rgbaOutput"
		output.textContent = "rgba(128,128,128,1)"
		let code = document.createElement("code")
		code.appendChild(output)
		parent.appendChild(code)
	}
	function createSelectorTextInputs(parent){
		let selectElem = document.createElement("input")
		selectElem.type = "text"
		selectElem.id = "selector-elem"
		selectElem.placeholder = "Selector"
		parent.appendChild(selectElem)
		let selectElemProp = document.createElement("input")
		selectElemProp.type = "text"
		selectElemProp.id = "selector-elem-prop"
		selectElemProp.placeholder = "Property"
		parent.appendChild(selectElemProp)
	}
	function init(){
		createRGBAWidget()
		rgbaSetterElements = $$(".rgba-setter")
		rgbaSetterElements.forEach(elem=> $("input[type='range']", elem).addEventListener("input", onRangeInput))
		$("#selector-elem").addEventListener("input",onInputSelector)
		$("#selector-elem").focus()
		$("#selector-elem-prop").addEventListener("input",onInputSelectorProperty)
		$("#rgba-widget").addEventListener("input", setRGBAFormOutput)
		$("#rgba-widget").onmousedown = function(evt){
			if(evt.target.id === "rgba-widget"){
				evt.preventDefault()
				let self = this
				var offsetX = 0, offsetY = 0, origX = 0, origY = 0
				origX = evt.clientX
				origY = evt.clientY
				document.onmousemove = function(evt){
					evt.preventDefault()
					offsetX = origX - evt.clientX
					offsetY = origY - evt.clientY
					origX = evt.clientX
					origY = evt.clientY
					self.style.left = (self.offsetLeft - offsetX) + "px"
					self.style.top = (self.offsetTop - offsetY) + "px"
				}
				document.onmouseup = function(){
					document.onmousemove = document.onmouseup = null
				}
			}
		}
	}
	document.addEventListener("DOMContentLoaded", init)
}());
