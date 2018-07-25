import gURL from '@/router/url'

async function update_A_Bit(_tagname, _state) {
    // API
    let URL = gURL + '/winpc32/update_A_Bit'

    // Headers
    let m_headers = new Headers()
    m_headers.append('Accept', 'application/json')
    m_headers.append('Content-Type', 'application/json')

    // Payload
    let data = {
        tagname: _tagname,
        state: _state,
    }
    let encodedData = JSON.stringify(data)
    let reqInit = {
        method: 'POST',
        headers: m_headers,
        body: encodedData
    }

    // Request
    let m_request = new Request(URL, reqInit)

    // AJAX
    let res = await fetch(m_request)

    if (res.ok) {
        let result = await res.json()
        console.log(
            `tagname: ${result.logicName} value: ${result.bitValue}`
        )
    } else {
        let text = await res.text()
        console.warn(text)
    }
}

async function update_R_Bit(_tagname, _value) {
    // API
    let URL = gURL + '/winpc32/update_R_Bit'

    // Headers
    let m_headers = new Headers()
    m_headers.append('Accept', 'application/json')
    m_headers.append('Content-Type', 'application/json')

    // Payload
    let data = {
        tagname: _tagname,
        value: _value
    }
    let encodedData = JSON.stringify(data)

    // Request
    let reqInit = {
        method: 'POST',
        headers: m_headers,
        body: encodedData
    }

    let m_request = new Request(URL, reqInit)

    // AJAX
    let res = await fetch(m_request)

    if (res.ok) {
        let result = await res.json()
        console.log(
            `tagname: ${result.logicName} value: ${result.bitValue}`
        )
    } else {
        let text = await res.text()
        console.warn(text)
    }
}

export { update_A_Bit, update_R_Bit }