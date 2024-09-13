import {IUser} from "@/stores/user.ts";
import {message} from "ant-design-vue";
import {REG} from "@/constants.ts";

export async function getAllUsers() {
    try {
        const response = await fetch(`https://www.asts.kz:5554/api/AUTH/?op=Get_USERS_PARAMS&REGION=${REG.value}`)
        return await response.json()
    } catch (e) {
        return []
    }
}

export async function editUser(userData: IUser){
    try {
        const result = await fetch('https://www.asts.kz:5554/api/AUTH/UPDATE_USER_PARAMS?GG=""', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                ...userData,
            })
        });
        const res = await result.json()
        return JSON.parse(res)
    } catch (e) {
        console.log(e)
        message.error('Произошла ошибка при выполнении скрипта, попробуйте позже!', 5)
    }
}

export async function getUidByPhone(phone: string) {
    try {
        const response = await fetch(`https://www.asts.kz:5554/api/AUTH/Get_EmUID?PHONE=${phone}`)
        return await response.json()
    } catch (e) {
        console.log(e)
        message.error('Произошла ошибка при выполнении скрипта, попробуйте позже!', 5)
    }
}