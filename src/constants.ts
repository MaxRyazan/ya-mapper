import {ref} from "vue";

export const APP_ID: string = 'F4870000050001'
export const REG = ref('')

// todo вынести регион из авторизованного пользователя для запросов
// todo вынести BIN из авторизованного пользователя для запросов

export const USER_ROLES_MAP = new Map([
    [0, 'Наблюдатель'],
    [7, 'Администратор региона'],
    [8, 'Оператор'],
])

export const REGIONS_MAP = new Map<string, string>([])