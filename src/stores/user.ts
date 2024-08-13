import {ref} from "vue";

export interface IUser {
    BIN: string
    Comp_AID: string
    EmUID: string
    STR_LOGIN: string
    STR_PASS: string
    FIO: string
    IIN: string
    LOGIN: string
    REG_ID: string
    Role: number
    RoleREGION: string
    Valid: boolean
}

export const authUser = ref<IUser|null>(null)