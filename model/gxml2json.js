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
	gpx["gpx:object"].FRAME = getFRAME(gxml)
	gpx["gpx:object"].GROUPHEAD = getGROUPHEAD(gxml)
	gpx["gpx:object"].CLOCK = getCLOCK(gxml)
	gpx["gpx:object"].BUTTON = getBUTTON(gxml)
	gpx["gpx:object"].MSG = getMSG(gxml)
	gpx["gpx:object"].HSCROLL = getHSCROLL(gxml)
	gpx["gpx:object"].VSCROLL = getVSCROLL(gxml)
	gpx["gpx:object"].SWITCHRK = getSWITCHRK(gxml)
	gpx["gpx:object"]._HVLine = getHVLine(gxml)
	gpx["gpx:object"]._Button = getButton(gxml)
	gpx["gpx:object"]._Text = getText(gxml)
	gpx["gpx:object"]._Rectangle = getRectangle(gxml)
	gpx["gpx:object"]._Ellipse = getEllipse(gxml)

	gpx.PageFrame = getPageFrame(gxml, gpx["gpx:object"])
	gpx.DLLVersion = getDLLVersion(gpx)

	delete gpx["gpx:object"]

	// // write out if necessary
	// gpx_json = JSON.stringify(gpx)
	// fs.writeFile('./app_data/ControlLink.json', gpx_json, function (err) {
	// 	if (err) throw err
	// 	console.log('File in JSON is saved!')
	// })
})

// module.exports
module.exports = gpx;

// convert gxml to json
function getGpxDocument(_gxml) {
	var targetTag = _gxml.match(/<gpx:document .*?>/g)[0]
	let _gpxDocument = getItem(targetTag)
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
		let item = getItem(targetTag[i])
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
	_DLLVersion.PageFrame = _gpx.PageFrame.length
	_DLLVersion.SWITCHRK = _gpx["gpx:object"].SWITCHRK.length
	_DLLVersion.VSCROLL = _gpx["gpx:object"].VSCROLL.length

	return _DLLVersion
}

function getPageFrame(_gxml, _gpxObjects) {
	var tags = ["FRAME", "GROUPHEAD", "CLOCK", "BUTTON", "MSG", "HSCROLL", "VSCROLL",
		"SWITCHRK", "_HVLine", "_Button", "_Text", "_Rectangle", "_Ellipse"]
	var gpxClone = JSON.parse(JSON.stringify(_gpxObjects))
	var _pageFrame = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="PageFrame"[\s\S]*?<gpx:object/g)
	for (let i in targetTag) {
		let item = getItem(targetTag[i])
		_pageFrame.push(item)
	}
	targetTag = _gxml.match(/object-name="PageFrame"[\s\S]*?page-title|object-name="PageFrame"[\s\S]*/g)
	let tagsCount = new Array(13).fill(0)
	for (let i in targetTag) {
		let obj = {}
		let tagsArray = []
		for (let index in tags) {
			let re = new RegExp('object-name="' + tags[index] + '"', 'g')
			tagsArray[index] = targetTag[i].match(re)
			if (tagsArray[index] == null) {
				tagsCount[index] = 0
			} else {
				tagsCount[index] = tagsArray[index].length
				obj[tags[index]] = gpxClone[tags[index]].slice(0, tagsCount[index])
				for (let count = 0; count < tagsCount[index]; count++) {
					gpxClone[tags[index]].shift()
				}
			}
		}
		_pageFrame[i]["gpx:object"] = obj
	}
	return _pageFrame
}

function getFRAME(_gxml) {
	var _FRAME = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="FRAME"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		let item = getItem(targetTag[i])

		_FRAME.push(item)
	}
	return _FRAME
}

function getGROUPHEAD(_gxml) {
	var _GROUPHEAD = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="GROUPHEAD"[\s\S]*?(<\/>){2}/g)
	for (let i in targetTag) {
		let item = getItem(targetTag[i])
		_GROUPHEAD.push(item)
	}
	return _GROUPHEAD
}

function getCLOCK(_gxml) {
	var _CLOCK = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="CLOCK"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		let item = getItem(targetTag[i])
		_CLOCK.push(item)
	}
	return _CLOCK
}

function getBUTTON(_gxml) {
	var _BUTTON = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="BUTTON"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		let item = getItem(targetTag[i])
		_BUTTON.push(item)
	}
	return _BUTTON
}

function getMSG(_gxml) {
	var _MSG = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="MSG"[\s\S]*?(<\/>){2}/g)
	var messageIndexTag = _gxml.match(/"MessageIndex"[\s\S]*?(<\/>){4}/g)
	for (let i in targetTag) {
		var item = getItem(targetTag[i])
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
		let item = getItem(targetTag[i])
		_HSCROLL.push(item)
	}
	return _HSCROLL
}

function getVSCROLL(_gxml) {
	var _VSCROLL = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="VSCROLL"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		let item = getItem(targetTag[i])
		_VSCROLL.push(item)
	}
	return _VSCROLL
}

function getSWITCHRK(_gxml) {
	var _SWITCHRK = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="SWITCHRK"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		let item = getItem(targetTag[i])
		_SWITCHRK.push(item)
	}
	return _SWITCHRK
}

function getHVLine(_gxml) {
	var _HVLine = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="_HVLine"[\s\S]*?(<\/>){4}/g)
	for (let i in targetTag) {
		let beforeArrayTag = targetTag[i].match(/<gpx:object.*?object-name="_HVLine"[\s\S]*?<Array/g)[0]
		let item = getItem(beforeArrayTag)
		let line = targetTag[i].match(/<Array[\s\S]*?(<\/>){2}/g)[0]
		let arrayName = line.match(/name=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
		let elements = line.match(/<\d.*<\/>/g)
		for (let j in elements) {
			elements[j] = getItem(elements[j])
		}
		item[arrayName] = elements
		let controlLinkTag = targetTag[i].match(/<control-link[\s\S]*/)
		if (controlLinkTag != null) {
			controlLinkTag = controlLinkTag[0].replace(/<control-link>/, '')
			item["control-link"] = getControlLink(controlLinkTag)
		}
		_HVLine.push(item)
	}
	return _HVLine
}

function getButton(_gxml) {
	var _Button = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="_Button"[\s\S]*?(<\/>){4}/g)
	for (let i in targetTag) {
		let buttonTag = targetTag[i].match(/<gpx:object.*?object-name="_Button"[\s\S]*?<control-link>/g)[0]
		let item = getItem(buttonTag)
		let controlLinkTag = targetTag[i].replace(/<gpx:object.*?object-name="_Button"[\s\S]*?<control-link>/g, '')
		controlLinkTag = controlLinkTag.match(/<[\s\S]*?(<\/>){4}/g)[0]
		item["control-link"] = getControlLink(controlLinkTag)

		_Button.push(item)
	}
	return _Button
}

function getText(_gxml) {
	var _Text = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="_Text"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		let textTag = targetTag[i].match(/(<gpx:object[\s\S]*?<control-link>|(<gpx:object[\s\S]*?<font.*?<\/>))/g)[0]
		let item = getItem(textTag)
		item["control-link"] = []
		let controlLinkTag = targetTag[i].match(/<control-link[\s\S]*/g)
		if (controlLinkTag != null) {
			controlLinkTag = controlLinkTag[0].replace(/<control-link>/, '')
			controlLinkTag = controlLinkTag.match(/<[\s\S]*?(<\/>){2}/g)

			for (let j in controlLinkTag) {
				let c_item = {}
				c_item["font"] = []
				let attributes = controlLinkTag[j].match(/([\w-\w]+=)/g)
				let value = controlLinkTag[j].match(/".*?"/g)
				for (let k in attributes) {
					let tempA = []
					let atr = attributes[k].match(/[^=]*/)[0]
					let val = value[k].match(/[^"]+/)[0]
					if (atr != 'original') {
						tempA.push(atr)
						c_item[tempA[tempA.length - 1]] = val
					} else {
						c_item["font"].push(val)
					}
				}
				c_item["link-name"] = controlLinkTag[j].match(/<[\w-\w]+/)[0].match(/[^<]+/)[0]
				item["control-link"].push(c_item)
			}
		}
		_Text.push(item)
	}
	return _Text
}

function getRectangle(_gxml) {
	var _Rectangle = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="_Rectangle"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		let RectangleTag = targetTag[i].match(/<gpx:object[\s\S]*?<control-link>|<gpx:object[\s\S]*?<\/>/g)[0]
		let item = getItem(RectangleTag)
		let controlLinkTag = targetTag[i].match(/<control-link[\s\S]*/)
		if (controlLinkTag != null) {
			controlLinkTag = controlLinkTag[0].replace(/<control-link>/, '')
			item["control-link"] = getControlLink(controlLinkTag)
		}
		_Rectangle.push(item)
	}

	return _Rectangle
}

function getEllipse(_gxml) {
	var _Ellipse = []
	var targetTag = _gxml.match(/<gpx:object.*?object-name="_Ellipse"[\s\S]*?(<\/>){3}/g)
	for (let i in targetTag) {
		let EllipseTag = targetTag[i].match(/<gpx:object[\s\S]*?<control-link>|<gpx:object[\s\S]*?<\/>/g)[0]
		let item = getItem(EllipseTag)
		let controlLinkTag = targetTag[i].match(/<control-link[\s\S]*/)
		if (controlLinkTag != null) {
			controlLinkTag = controlLinkTag[0].replace(/<control-link>/, '')
			item["control-link"] = getControlLink(controlLinkTag)
		}
		_Ellipse.push(item)
	}
	return _Ellipse
}

function getItem(_targetTag) {
	let item = {}
	let attributes = _targetTag.match(/([\w-\w]+=)/g)
	let value = _targetTag.match(/".*?"/g)
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

function getControlLink(_controlLinkTag) {
	let controlLink = []
	let item = {}
	let linkNames = _controlLinkTag.match(/<[^Array][a-zA-Z-*_*a-zA-Z]+/g)
	for (let i in linkNames) {
		let tempLinkName = linkNames[i].match(/[^<]+/)[0]
		var lines
		if (tempLinkName == 'window_switch') {
			lines = _controlLinkTag.match(/<Array[\s\S]*?(<\/>){2}/g)
			for (let j in lines) {
				let arrayName = lines[j].match(/name=".*?"/)[0].match(/".*"/)[0].match(/\w+/)[0]
				let elements = lines[j].match(/<\d.*<\/>/g)
				for (let k in elements) {
					elements[k] = elements[k].match(/>.*</)[0].match(/\w+/)[0]
				}
				item[arrayName] = elements
			}
		}
		else if (tempLinkName == 'PB-action') {
			lines = _controlLinkTag.match(/<[^Array].*?>/)[0]
			item = getItem(lines)
			item["link-name"] = tempLinkName
			lines = _controlLinkTag.match(/<Array[\s\S]*?(<\/>){2}/g)
			for (let j in lines) {
				let arrayName = lines[j].match(/name=".*?"/)[0].match(/".*"/)[0].match(/[^"]+/)[0]
				let elements = lines[j].match(/<\d.*<\/>/g)
				for (let k in elements) {
					elements[k] = elements[k].match(/>.*</)[0].match(/[^>^<]+/)[0]
				}
				item[arrayName] = elements
			}
		}
		else {
			lines = _controlLinkTag.match(/<[^Array][a-zA-Z-*_*a-zA-Z]+.*?<\/>/g)
			item = getItem(lines[i])
			item["link-name"] = tempLinkName
		}

		controlLink.push(item)
	}

	return controlLink
}