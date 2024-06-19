import {Bus} from "@/models/Bus.ts";

export async function getAllBuses(options?:{bin?: string, region?: string }): Promise<Bus[]> {
    const res: Response = await fetch('/api/all-buses', {
        method: 'POST',
        headers: new Headers({'content-type': 'text/xml', 'host': 'www.asts.kz:94'}),
        mode: 'cors',
        body:
            `<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <Get_BUSES_JSON xmlns="http://microsoft.com/webservices/">
                  <BIN>${options?.bin}</BIN>
                  <REGION>${options?.region}</REGION>
                </Get_BUSES_JSON>
              </soap:Body>
            </soap:Envelope>`
    })

    const raw:string = await res.text()
    const openArray:number = raw.indexOf('[')
    const closeArray:number = raw.indexOf(']')

    const text: string = raw.slice(openArray, closeArray + 1)
    if(text) return await JSON.parse(text)
    else return [] as Bus[]
}