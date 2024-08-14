import {ref} from "vue";
import {IRoles} from "@/enums.ts";

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
    Role: IRoles
    RoleREGION: string
    Valid: boolean
}

export const authUser = ref<IUser|null>(null)