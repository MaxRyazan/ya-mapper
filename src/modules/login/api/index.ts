import {APP_ID} from "@/constants.ts";
import {IUser} from "@/stores/user.ts";


export async function registration(userInfo: {
    login: string,
    password: string,
    confirmPassword: string,
    phone: string,
    fio: string,
}) {
    try {
        const result = await fetch('https://www.asts.kz:5554/api/AUTH/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                ...userInfo,
                Comp_AID: APP_ID
            })
        });
        const res = await result.json()
        return JSON.parse(res)
    } catch (e) {
        console.log(e)
    }
}

export async function authorize(userInfo: {login: string, password: string}) {
    try {
        console.log(userInfo)
        return '' as unknown as IUser
    } catch (e) {
        console.log(e)
        return null
    }
}