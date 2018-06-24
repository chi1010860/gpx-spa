// Import modules
const fs = require('fs')
const filePath = './app_data/ControlLink.gxml'
var gpx = require('./gpx')

// main
fs.readFile(filePath, function (err, data) {
	if (err) throw err
	var gxml = data.toString()  // get the raw data

	// get the object of data
	gpx["gpx:document"] = getGpxDocument(gxml)
	gpx["style-sheet"]["language-table"] = getLanguageTable(gxml)
	gpx["style-sheet"]["key-text"] = getKeyText(gxml)
	gpx["style-sheet"]["ss:font"] = get_ss(gxml)
	gpx["gpx:object"].PageFrame = getPageFrame(gxml)
	gpx["gpx:object"].FRAME = getFRAME(gxml)
	gpx["gpx:object"].GROUPHEAD = getGROUPHEAD(gxml)
	gpx["gpx:object"].CLOCK = getCLOCK(gxml)
	gpx["gpx:object"].BUTTON = getBUTTON(gxml)
	gpx["gpx:object"].MSG = getMSG(gxml)
	gpx["gpx:object"].HSCROLL = getHSCROLL(gxml)
	gpx["gpx:object"].VSCROLL = getVSCROLL(gxml)
	gpx["gpx:object"].SWITCHRK = getSWITCHRK(gxml)
	// gpx["gpx:object"]._HVLine = getHVLine(gxml)
	gpx["gpx:object"]._Button = getButton(gxml)
	// gpx["gpx:object"]._Text = getText(gxml)
	// gpx["gpx:object"]._Rectangle = getRectangle(gxml)
	// gpx["gpx:object"]._Ellipse = getEllipse(gxml)


	gpx.DLLVersion = getDLLVersion(gpx)

	// debug
	// console.log(gpx.pageFrame)

	// // write out if necessary
	// gpx_json = JSON.stringify(gpx)
	// fs.writeFile('./app_data/ControlLink.json', gpx_json, function (err) {
	//     if (err) throw err
	//     console.log('File in JSON is saved!')
	// })
})

// module.exports
module.exports = gpx;

// get the content of each tag
function getGpxDocument(_gxml) {
	var _gpxDocument = {}
	var targetTag = _gxml.match(/<gpx:document .*?>/g)[0]

	_gpxDocument.version = targetTag.match(/version=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument["data-type"] = targetTag.match(/data-type=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument.directory = targetTag.match(/directory=".*?"/)[0].match(/".*"/)[0].match(/[\w:\\]+/)[0]
	_gpxDocument["authorization-level"] = targetTag.match(/authorization-level=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument["screen-saver"] = targetTag.match(/screen-saver=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument.rect = targetTag.match(/rect=".*?"/g)[0].match(/[0-9]+/g)
	for (let key in _gpxDocument.rect) {
		_gpxDocument.rect[key] = parseInt(_gpxDocument.rect[key])
	}
	_gpxDocument["window-title"] = targetTag.match(/window-title=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument["grid-size"] = targetTag.match(/grid-size=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument["app-dir"] = targetTag.match(/app-dir=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument["color-void"] = '#' + targetTag.match(/color-void=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument["color-paper"] = '#' + targetTag.match(/color-paper=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument["syste-menu"] = targetTag.match(/syste-menu=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
	_gpxDocument.language = targetTag.match(/language=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]

	return _gpxDocument
}

function getLanguageTable(_gxml) {
	var _languageTable = []
	var targetTag = _gxml.match(/<language-table[\s\S]*?(<\/>){2}/)[0]
	var list = targetTag.match(/<\d+>.*/g)
	for (let i = 0; i < list.length; i++) {
		let item = list[i].match(/>.*?</)[0]
		item = item.slice(1, item.length - 1)
		_languageTable.push(item)
	}
	return _languageTable
}

function getKeyText(_gxml) {
	var _keyText = []
	var targetTag = _gxml.match(/<key-text>[\s\S]*?(<\/>){2}/)[0]
	var list = targetTag.match(/<\d+ \w+=".*"]*><\/>/g)
	for (let i = 0; i < list.length; i++) {
		var _original = list[i].match(/original=".*?"/g)[0]
		var _zhTw = list[i].match(/zh-tw=".*?"/g) ? list[i].match(/zh-tw=".*?"/g)[0] : list[i].match(/original=".*?"/g)[0]
		_keyText[i] = {
			id: list[i].match(/\d+/g)[0],
			original: _original.slice(10, _original.lastIndexOf('"')),
			zhTw: _zhTw.slice(7, _zhTw.lastIndexOf('"'))
		}
	}
	return _keyText
}

function get_ss(_gxml) {
	var _ss = []
	var targetTag = _gxml.match(/<ss[\s\S]*?(<\/>){2}/)[0].match(/<\d+.*><\/>?/g)
	for (let i in targetTag) {
		let item = {}
		let attributes = targetTag[i].match(/[\w-\w]*=/g)
		let value = targetTag[i].match(/".*?"/g)
		for (let j in attributes) {
			attributes[j] = attributes[j].match(/[^=]*/)[0]
			value[j] = value[j].match(/[^"]+/)[0]
			item[attributes[j]] = value[j]
		}
		_ss.push(item)
	}
	return _ss
}

function getDLLVersion(_gpx) {
	_DLLVersion = {}
	_DLLVersion._Button = _gpx["gpx:object"]._Button.length
	_DLLVersion._Ellipse = _gpx["gpx:object"]._Ellipse.length
	_DLLVersion._HVLine = _gpx["gpx:object"]._HVLine.length
	_DLLVersion._Rectangle = _gpx["gpx:object"]._Rectangle.length
	_DLLVersion._Text = _gpx["gpx:object"]._Text.length
	_DLLVersion.BUTTON = _gpx["gpx:object"].BUTTON.length
	_DLLVersion.CLOCK = _gpx["gpx:object"].CLOCK.length
	_DLLVersion.FRAME = _gpx["gpx:object"].FRAME.length
	_DLLVersion.HSCROLL = _gpx["gpx:object"].HSCROLL.length
	_DLLVersion.MSG = _gpx["gpx:object"].MSG.length
	_DLLVersion.PageFrame = _gpx["gpx:object"].PageFrame.length
	_DLLVersion.SWITCHRK = _gpx["gpx:object"].SWITCHRK.length
	_DLLVersion.VSCROLL = _gpx["gpx:object"].VSCROLL.length

	return _DLLVersion
}

function getPageFrame(_gxml) {
	var _pageFrame = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="PageFrame"[\s\S]*?<gpx:object/g)
	for (let i in targetTag) {
		// Defination of item in this scope
		var item = {}

		// get rect
		var _rect = targetTag[i].match(/rect=".*?"/g)[0].match(/[0-9]+/g)
		for (let key in _rect) {
			_rect[key] = parseInt(_rect[key])
		}
		item.rect = _rect
		item["page-title"] = targetTag[i].match(/page-title=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
		item.tagname = targetTag[i].match(/tagname=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
		item.message = targetTag[i].match(/"message"[\s\S]*?<\/><\/>/)[0].match(/>.*</)[0].match(/[\w\s]+/)[0]
		item["text-color"] = '#' + targetTag[i].match(/text-color=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
		item["pen-color"] = '#' + targetTag[i].match(/pen-color=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
		item["brush-color"] = '#' + targetTag[i].match(/brush-color=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
		item["title-size"] = targetTag[i].match(/title-size=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
		item["y-grid"] = targetTag[i].match(/y-grid=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
		item["drawing-OP"] = targetTag[i].match(/drawing-OP=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]

		_pageFrame.push(item)
	}
	return _pageFrame
}

function getFRAME(_gxml) {
	var _FRAME = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="FRAME"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		var item = {}
		let attributes = targetTag[i].match(/[\w-\w]*=/g)
		let value = targetTag[i].match(/".*?"/g)
		for (let j in attributes) {
			attributes[j] = attributes[j].match(/[^=]*/)[0]
			value[j] = value[j].match(/[^"]+/)[0]
			if (attributes[j] == 'original')
				attributes[j] = 'font'
			item[attributes[j]] = value[j]
		}
		// Parse rect to number
		item.rect = item.rect.match(/[0-9]+/g)
		for (let key in item.rect) {
			item.rect[key] = parseInt(item.rect[key])
		}

		_FRAME.push(item)
	}
	return _FRAME
}

function getGROUPHEAD(_gxml) {
	var _GROUPHEAD = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="GROUPHEAD"[\s\S]*?(<\/>){2}/g)
	for (let i in targetTag) {
		var item = {}
		let attributes = targetTag[i].match(/[\w-\w]*=/g)
		let value = targetTag[i].match(/".*?"/g)
		for (let j in attributes) {
			attributes[j] = attributes[j].match(/[^=]*/)[0]
			value[j] = value[j].match(/[^"]+/)[0]
			if (attributes[j] == 'original')
				attributes[j] = 'font'
			item[attributes[j]] = value[j]
		}
		// Parse rect to number
		item.rect = item.rect.match(/[0-9]+/g)
		for (let key in item.rect) {
			item.rect[key] = parseInt(item.rect[key])
		}
		_GROUPHEAD.push(item)
	}
	return _GROUPHEAD
}

function getCLOCK(_gxml) {
	var _CLOCK = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="CLOCK"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		var item = {}
		let attributes = targetTag[i].match(/[\w-\w]*=/g)
		let value = targetTag[i].match(/".*?"/g)
		for (let j in attributes) {
			attributes[j] = attributes[j].match(/[^=]*/)[0]
			value[j] = value[j].match(/[^"]+/)[0]
			if (attributes[j] == 'original')
				attributes[j] = 'font'
			item[attributes[j]] = value[j]
		}
		// Parse rect to number
		item.rect = item.rect.match(/[0-9]+/g)
		for (let key in item.rect) {
			item.rect[key] = parseInt(item.rect[key])
		}
		_CLOCK.push(item)
	}
	return _CLOCK
}

function getBUTTON(_gxml) {
	var _BUTTON = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="BUTTON"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		var item = {}
		let attributes = targetTag[i].match(/[\w-\w]*=/g)
		let value = targetTag[i].match(/".*?"/g)
		for (let j in attributes) {
			attributes[j] = attributes[j].match(/[^=]*/)[0]
			value[j] = value[j].match(/[^"]+/)[0]
			if (attributes[j] == 'original')
				attributes[j] = 'font'
			item[attributes[j]] = value[j]
		}
		// Parse rect to number
		item.rect = item.rect.match(/[0-9]+/g)
		for (let key in item.rect) {
			item.rect[key] = parseInt(item.rect[key])
		}
		_BUTTON.push(item)
	}
	return _BUTTON
}

function getMSG(_gxml) {
	var _MSG = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="MSG"[\s\S]*?(<\/>){2}/g)
	var messageIndexTag = _gxml.match(/"MessageIndex"[\s\S]*?(<\/>){4}/g)
	for (let i in targetTag) {
		var item = {}
		let attributes = targetTag[i].match(/[\w-\w]*=/g)
		let value = targetTag[i].match(/".*?"/g)
		for (let j in attributes) {
			attributes[j] = attributes[j].match(/[^=]*/)[0]
			value[j] = value[j].match(/[^"]+/)[0]
			if (attributes[j] == 'original')
				attributes[j] = 'font'
			item[attributes[j]] = value[j]
		}
		// Parse rect to number
		item.rect = item.rect.match(/[0-9]+/g)
		for (let key in item.rect) {
			item.rect[key] = parseInt(item.rect[key])
		}

		item.MessageIndex = []
		let line = messageIndexTag[i].match(/<\d+[\s\S]*?(<\/>){2}/g)
		for (let j in line) {
			let item2 = {}
			let attributes2 = line[j].match(/[\w-\w]*=/g)
			let value2 = line[j].match(/".*?"/g)
			for (let k in value2) {
				attributes2[k] = attributes2[k].match(/[^=]*/)[0]
				value2[k] = value2[k].match(/[^"]+/)[0]
				if (attributes2[k] == 'original')
					attributes2[k] = 'font'
				item2[attributes2[k]] = value2[k]
			}
			item.MessageIndex.push(item2)
		}
		_MSG.push(item)
	}
	return _MSG
}

function getHSCROLL(_gxml) {
	var _HSCROLL = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="HSCROLL"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		var item = {}
		let attributes = targetTag[i].match(/[\w-\w]*=/g)
		let value = targetTag[i].match(/".*?"/g)
		for (let j in attributes) {
			attributes[j] = attributes[j].match(/[^=]*/)[0]
			value[j] = value[j].match(/[^"]+/)[0]
			if (attributes[j] == 'original')
				attributes[j] = 'font'
			item[attributes[j]] = value[j]
		}
		// Parse rect to number
		item.rect = item.rect.match(/[0-9]+/g)
		for (let key in item.rect) {
			item.rect[key] = parseInt(item.rect[key])
		}
		_HSCROLL.push(item)
	}
	return _HSCROLL
}

function getVSCROLL(_gxml) {
	var _VSCROLL = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="VSCROLL"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		var item = {}
		let attributes = targetTag[i].match(/[\w-\w]*=/g)
		let value = targetTag[i].match(/".*?"/g)
		for (let j in attributes) {
			attributes[j] = attributes[j].match(/[^=]*/)[0]
			value[j] = value[j].match(/[^"]+/)[0]
			if (attributes[j] == 'original')
				attributes[j] = 'font'
			item[attributes[j]] = value[j]
		}
		// Parse rect to number
		item.rect = item.rect.match(/[0-9]+/g)
		for (let key in item.rect) {
			item.rect[key] = parseInt(item.rect[key])
		}
		_VSCROLL.push(item)
	}
	return _VSCROLL
}

function getSWITCHRK(_gxml) {
	var _SWITCHRK = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="SWITCHRK"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		var item = {}
		let attributes = targetTag[i].match(/[\w-\w]*=/g)
		let value = targetTag[i].match(/".*?"/g)
		for (let j in attributes) {
			attributes[j] = attributes[j].match(/[^=]*/)[0]
			value[j] = value[j].match(/[^"]+/)[0]
			if (attributes[j] == 'original')
				attributes[j] = 'font'
			item[attributes[j]] = value[j]
		}
		// Parse rect to number
		item.rect = item.rect.match(/[0-9]+/g)
		for (let key in item.rect) {
			item.rect[key] = parseInt(item.rect[key])
		}
		_SWITCHRK.push(item)
	}
	return _SWITCHRK
}

// function getButton(_gxml) {
// 	var _button = []
// 	var targetTag = _gxml.match(/<gpx:object page-title="Button"[\s\S]*?<font original="1">(<\/>){5}\s/g)[0]
// 	var buttonTag = targetTag.match(/<gpx:object.*"_Button"[\s\S]*?(<\/>){6}/g)
// 	var msgTag = targetTag.match(/<gpx:object.*"MSG"[\s\S]*?(<\/>){4}/g)
// 	for (let i = 0; i < buttonTag.length; i++) {
// 		// Defination of item in this scope
// 		var item = {
// 			rect: [],
// 			width: 0,
// 			height: 0,
// 			penColor: "",
// 			brushColor: "",
// 			tagname: "",
// 			text: "",
// 			textColor: "",
// 			textAlign: 0,
// 			drawingOP: "",
// 			textFormat: "",
// 			messageIndex: "",
// 			style: "",
// 			controlLink: {
// 				type: "",
// 				showWindow: "",
// 				hideWindow: []
// 			}
// 		}

// 		// get rect
// 		var rectTag = buttonTag[i].match(/rect=".*?"/g)[0]
// 		var _rect = rectTag.match(/[0-9]+/g)
// 		for (let key in _rect) {
// 			_rect[key] = parseInt(_rect[key])
// 		}
// 		item.rect = _rect

// 		// get size
// 		item.width = item.rect[2] - item.rect[0]
// 		item.height = item.rect[3] - item.rect[1]

// 		// get penColor
// 		var penColorTag = buttonTag[i].match(/pen-color=".*?"/g)[0]
// 		penColorTag = penColorTag.match(/"\w+"/)[0]
// 		item.penColor = '#' + penColorTag.match(/\w+/)[0]

// 		// get brushColor
// 		var brushColorTag = buttonTag[i].match(/brush-color=".*?"/g)[0]
// 		brushColorTag = brushColorTag.match(/"\w+"/)[0]
// 		item.brushColor = '#' + brushColorTag.match(/\w+/)[0]

// 		// get mseeage
// 		var tagnameTag = msgTag[i].match(/tagname0=".*?"/)[0]
// 		tagnameTag = tagnameTag.match(/".*"/)[0]
// 		tagnameTag = tagnameTag.match(/\w+/)[0]
// 		item.tagname = tagnameTag

// 		// get text
// 		var textTag = msgTag[i].match(/text=".*?"/)[0]
// 		textTag = textTag.match(/".*"/)[0]
// 		textTag = textTag.match(/\w+/)[0]
// 		item.text = textTag

// 		// get textColor
// 		var textColorTag = msgTag[i].match(/text-color=".*?"/)[0]
// 		textColorTag = textColorTag.match(/".*"/)[0]
// 		textColorTag = '#' + textColorTag.match(/\w+/)[0]
// 		item.textColor = textColorTag

// 		// get textAlign
// 		var textAlignTag = msgTag[i].match(/text-align=".*?"/)[0]
// 		textAlignTag = textAlignTag.match(/".*"/)[0]
// 		textAlignTag = textAlignTag.match(/\w+/)[0]
// 		item.textAlign = textAlignTag

// 		// get drawingOP
// 		var drawingOPTag = msgTag[i].match(/drawing-OP=".*?"/)[0]
// 		drawingOPTag = drawingOPTag.match(/".*"/)[0]
// 		drawingOPTag = drawingOPTag.match(/\w+/)[0]
// 		item.drawingOP = drawingOPTag

// 		// get textFormat
// 		var textFormatTag = msgTag[i].match(/text-format=".*?"/)[0]
// 		textFormatTag = textFormatTag.match(/".*"/)[0]
// 		textFormatTag = textFormatTag.match(/\w+/)[0]
// 		item.textFormat = textFormatTag

// 		// get messageIndex
// 		var messageIndexTag = msgTag[i].match(/"MessageIndex"[\s\S]*?<\/><\/>/)[0]
// 		messageIndexTag = messageIndexTag.match(/message=".*"/)[0]
// 		messageIndexTag = messageIndexTag.match(/".*"/)[0]
// 		messageIndexTag = messageIndexTag.match(/\w+/)[0]
// 		item.messageIndex = messageIndexTag

// 		// get contorlLink
// 		item.controlLink.type = buttonTag[i].match(/control-link[\s\S]*?<\w+>/)[0].match(/<\w+>/)[0].match(/\w+/)[0]
// 		item.controlLink.showWindow =
// 			buttonTag[i].match(/"show_window"[\s\S]*?<\/><\/>/)[0].match(/>\w+</)[0].match(/\w+/)[0]
// 		let hideWindowTag =
// 			buttonTag[i].match(/"hide_window"[\s\S]*?<\/><\/>/)[0].match(/>\w+</g)
// 		for (let j in hideWindowTag) {
// 			item.controlLink.hideWindow[j] = hideWindowTag[j].match(/\w+/)[0]
// 		}

// 		// push to button property
// 		_button.push(item)
// 	}
// 	return _button
// }

function getButton(_gxml) {
	var _Button = []
	// var targetTag = _gxml.match(/<gpx:object.*?object-name="_Button"[\s\S]*?<control-link>/g)
	var targetTag = _gxml.match(/<gpx:object.*?object-name="_Button"[\s\S]*?(<\/>){4}/g)
	// console.log(targetTag)
	for (let i in targetTag) {
		// let item = {}
		let buttonTag = targetTag[i].match(/<gpx:object.*?object-name="_Button"[\s\S]*?<control-link>/g)[0]
		let item = getItem(buttonTag)
		let controlLinkTag = targetTag[i].replace(/<gpx:object.*?object-name="_Button"[\s\S]*?<control-link>/g, '')
		controlLinkTag = controlLinkTag.match(/<[\s\S]*?(<\/>){4}/g)[0]
		item["control-link"] = getItem(controlLinkTag)
		item["control-link"]["link-name"] = controlLinkTag.match(/<[\w-\w]+/g)[0].match(/[^<]+/g)[0]
		// console.log(controlLinkTag)
		console.log(item)
		// _Button.push(getItem(targetTag[i]))
	}
	return _Button
}

function getItem(_targetTag) {
	let item = {}
	let attributes = _targetTag.match(/([\w-\w]+=)/g)
	let value = _targetTag.match(/".*?"/g)
	// console.count('getItem:')
	// console.log(attributes)
	// console.log(value)
	for (let j in attributes) {
		attributes[j] = attributes[j].match(/[^=]*/)[0]
		if (attributes[j] == 'original')
			attributes[j] = 'font'
		value[j] = value[j].match(/[^"]+/)[0]
		item[attributes[j]] = value[j]
	}
	// Parse rect to number
	if (item.rect != undefined) {
		item.rect = item.rect.match(/[0-9]+/g)
		for (let key in item.rect) {
			item.rect[key] = parseInt(item.rect[key])
		}
	}
	return item
}