import {IUser} from "@/stores/user.ts";

export async function getAllUsers() {
    try {
        const response = await fetch('https://www.asts.kz:5554/api/AUTH/Get_USERS_PARAMS?REGION=18')
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
        console.log(result)
        const res = await result.json()
        return JSON.parse(res)
    } catch (e) {
        console.log(e)
    }
}