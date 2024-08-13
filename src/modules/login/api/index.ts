import {APP_ID} from "@/constants.ts";


export async function registration(userInfo: {login: string, password: string, FIO: string}) {
    try {
        // const result = await fetch('https://www.asts.kz:5554/api/MAX_AUTH/SETREG', {
        const result = await fetch('https://www.asts.kz:5554/api/AUTH/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                ...userInfo,
                COMP_AID: APP_ID
            })
        });
        const res = await result.json()
        return JSON.parse(res)
    } catch (e) {
        console.log(e)
    }
}