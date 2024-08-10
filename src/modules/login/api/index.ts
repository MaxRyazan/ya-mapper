import {APP_ID} from "@/constants.ts";

export async function registration(userInfo: {login: string, password: string, FIO: string}) {
    try {
        const result = await fetch('https://www.asts.kz:5554/api/MAX_AUTH/Register', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({...userInfo, Comp_AID: APP_ID})});
        return result.json()
    } catch (e) {
        console.log(e)
    }
}