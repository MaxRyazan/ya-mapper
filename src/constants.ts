import {reactive, ref} from "vue";

export const APP_ID: string = 'F4870000050001'
export const REG = ref('')
export const superAdminModalOpen = ref(false)

export const centerOfRegions = reactive<any>({
    '18': [63.615375, 53.181536],
    '15': [69.15, 54.8667],
})

export const USER_ROLES_MAP = new Map([
    [0, 'Наблюдатель'],
    [7, 'Администратор региона'],
    [100, 'Суперадминистратор'],
])

export const REGIONS_MAP = new Map<string, string>([])

export const REGIONS_BINS = new Map<string, string[]>([
    ['15', ['210140006411']],
    ['18', ['10540003043']],
])